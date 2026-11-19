/**
 * The answer of `help`: what the instance answers, written for an AI agent (e.g. ioBroker.pi-agent, or the MCP
 * server with `send_to`) and for script authors. Keep it in sync with `onMessage` in main.ts.
 */

/** Every command `onMessage` answers; `write: true` = it has an effect (sends a WhatsApp message) */
export const COMMANDS: { command: string; write: boolean }[] = [
    { command: 'help', write: false },
    { command: 'send', write: true },
];

export const HELP = `ioBroker.whatsapp-cmb: sends WhatsApp text messages through the free CallMeBot API (personal use only). It only
sends, it receives nothing. An agent can send a text to the phone number of the settings (usually the user's own)
or to another number.

Commands (sendTo whatsapp-cmb.0):
- send {text, phone?} or just a text: sends the text as a WhatsApp message; answer {result: "Message sent"} or
  {error: the answer of CallMeBot or the HTTP status}.
  text: plain text, emojis allowed. phone: the number in international format, e.g. "+491234567890"; default the
  phone number of the settings. Without any phone number nothing is sent, but the answer is still
  {result: "Message sent"}. Without the API key in the settings there is no answer at all.
  CallMeBot delivers only to numbers that activated it (see the settings).
- help: this text and the list of commands {help, commands: [{command, write}]}.

States (whatsapp-cmb.0.*): sendMessage: writing a text with ack false sends it to the phone number of the settings.

How to talk to the user:
- Without phone the message goes to the number of the settings. Ask for the number when the user means someone
  else and did not give it; never guess one.
- Sending to other people than the user only on the user's explicit request.
- Tell the user whether it was sent; on {error} give the reason (e.g. wrong API key, too many messages).`;
