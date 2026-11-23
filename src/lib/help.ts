/**
 * The answer of `help`: what the instance answers, written for an AI agent (e.g. ioBroker.pi-agent, or the MCP
 * server with `send_to`) and for script authors. Keep it in sync with `onMessage` in main.ts.
 */

/**
 * Every command `onMessage` answers; `write: true` = it has an effect (sends a WhatsApp message); `standard` = it
 * follows the shared catalog of commands for adapter families (message.*)
 */
export const COMMANDS: { command: string; write: boolean; standard?: string }[] = [
    { command: 'help', write: false },
    { command: 'send', write: true, standard: 'message.send' },
    { command: 'getRecipients', write: false, standard: 'message.getRecipients' },
];

export const HELP = `ioBroker.whatsapp-cmb: sends WhatsApp text messages through the free CallMeBot API (personal use only). It only
sends, it receives nothing. An agent can send a text to the phone number of the settings (usually the user's own)
or to another number. send and getRecipients follow the shared catalog of message commands (message.send,
message.getRecipients).

Commands (sendTo whatsapp-cmb.0):
- send {text, phone?} or just a text: sends the text as a WhatsApp message; answer {result: "Message sent", ok:
  true, sent: 1} or {error: the answer of CallMeBot or the HTTP status}.
  text: plain text, emojis allowed. phone (or recipient): the number in international format, e.g.
  "+491234567890"; default the phone number of the settings. Without any phone number or without text nothing is
  sent, but the answer is still {result: "Message sent", ok: true, sent: 0}. Without the API key in the settings:
  {error, reason: "NOT_CONFIGURED"}. title, file, files and priority of the catalog are ignored (text only).
  CallMeBot delivers only to numbers that activated it (see the settings).
- getRecipients {}: the phone number of the settings (nothing is sent); answer {recipients: [{id, name, kind:
  "user", default: true}]}, empty without a number.
- help: this text and the list of commands {help, commands: [{command, write, standard?}]}.
Other commands are answered with {error, reason: "NOT_SUPPORTED"}.

States (whatsapp-cmb.0.*): sendMessage: writing a text with ack false sends it to the phone number of the settings.

How to talk to the user:
- Without phone the message goes to the number of the settings. Ask for the number when the user means someone
  else and did not give it; never guess one.
- Sending to other people than the user only on the user's explicit request.
- Tell the user whether it was sent; on {error} give the reason (e.g. wrong API key, too many messages).`;
