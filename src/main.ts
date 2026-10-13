import * as utils from '@iobroker/adapter-core';
import axios from 'axios';

/** Payload of the `send` command. A plain string is accepted as well and treated as `text` */
interface SendMessagePayload {
    text?: string;
    phone?: string;
}

class WhatsappCmbAdapter extends utils.Adapter {
    public constructor(options: Partial<utils.AdapterOptions> = {}) {
        super({ ...options, name: 'whatsapp-cmb' });

        this.on('ready', () => this.onReady());
        this.on('stateChange', (id, state) => this.onStateChange(id, state));
        this.on('message', obj => this.onMessage(obj));
    }

    private onReady(): void {
        if (!this.config.apikey) {
            this.log.warn('APIKEY is not provided. No messages will be sent');
            return;
        }

        void this.subscribeStatesAsync('sendMessage');
    }

    private onStateChange(_id: string, state: ioBroker.State | null | undefined): void {
        if (state && !state.ack && state.val && this.config.apikey) {
            if (this.config.defaultPhone) {
                this.log.debug(`Sending message "${state.val}" to default number "${this.config.defaultPhone}"`);
                this.sendMessageToWhatsApp(String(state.val))
                    .then(() => this.log.debug(`Successfully sent`))
                    .catch(err => this.log.error(`Cannot send message: ${err}`));
            } else {
                this.log.error('Please set the default phone number.');
            }
        }
    }

    private onMessage(obj: ioBroker.Message): void {
        if (typeof obj === 'object' && obj.message && this.config.apikey) {
            if (obj.command === 'send') {
                const message: SendMessagePayload =
                    typeof obj.message !== 'object' ? { text: obj.message } : (obj.message as SendMessagePayload);
                message.phone ||= this.config.defaultPhone;

                if (!message.phone) {
                    this.log.warn('Default phone number is not provided!');
                    // Legacy: reports success although nothing was sent. Kept to not break existing scripts.
                    if (obj.callback) {
                        this.sendTo(obj.from, obj.command, { result: 'Message sent' }, obj.callback);
                    }
                    return;
                }

                this.log.info(`Send ${message.text} to ${message.phone}`);

                this.sendMessageToWhatsApp(message.text, message.phone)
                    .then(() => {
                        if (obj.callback) {
                            this.sendTo(obj.from, obj.command, { result: 'Message sent' }, obj.callback);
                        }
                    })
                    .catch(err => {
                        this.log.error(`Cannot send message: ${err}`);
                        if (obj.callback) {
                            this.sendTo(obj.from, obj.command, { error: err }, obj.callback);
                        }
                    });
            }
        }
    }

    /**
     * Sends the message via the CallMeBot API.
     * Rejects with the transport error, the response body (if it contains "ERROR") or the HTTP status code.
     */
    private async sendMessageToWhatsApp(message: string | undefined, phoneNumber?: string): Promise<void> {
        if (!message) {
            return;
        }
        phoneNumber ||= this.config.defaultPhone;

        message = encodeURIComponent(message);
        // Detect Emojies after encoding, and reverse encoding for them again.
        // This only matches emojis that were written already URL-encoded (e.g. `%F0%9F%98%80`) into the text.
        // Details https://www.callmebot.com/uncategorized/list-of-urlencoded-unicode-emoticons-emojis/
        const emojies = message.match(/%25F0%259F%25[0-9A-Fa-f]{2}%25[0-9A-Fa-f]{2}/g);
        emojies?.forEach(em => (message = message!.replace(em, decodeURIComponent(em))));

        const url = `https://api.callmebot.com/whatsapp.php?phone=${phoneNumber}&text=${message}&apikey=${this.config.apikey}&source=iobroker`;
        this.log.debug(`Call ${url}`);

        // Like `request` before: every status is delivered and evaluated here; the body stays a raw string
        const response = await axios.get<string>(url, { responseType: 'text', validateStatus: () => true });
        const body = response.data;
        this.log.debug(body);
        // 201 - wrong parameters
        // 202 - your number is banned
        // 203 - APikey is incorrect
        // 209 - phone number is permanent banned
        // 204 - Too many messages sent (API overflow for the phone number)
        // 205 - Unknown error.
        // 207 - Service is down
        // 208 - Your number is in Pause.
        // 209 - Quota exceeded
        // 210 - Messaged queued to be sent later
        if (response.status !== 200 || body?.includes('ERROR')) {
            // eslint-disable-next-line @typescript-eslint/only-throw-error
            throw body || response.status;
        }
    }
}

if (require.main !== module) {
    // Export the constructor in compact mode
    module.exports = (options: Partial<utils.AdapterOptions> | undefined) => new WhatsappCmbAdapter(options);
} else {
    // otherwise start the instance directly
    (() => new WhatsappCmbAdapter())();
}
