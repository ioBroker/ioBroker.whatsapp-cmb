# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`iobroker.whatsapp-cmb` is an ioBroker adapter that sends WhatsApp messages through the free [CallMeBot](https://www.callmebot.com/blog/free-api-whatsapp-messages/) HTTP API (`https://api.callmebot.com/whatsapp.php`). It only sends; nothing is received.

TypeScript (CommonJS output). Sources live in `src/`, the published/runnable code is the compiled `build/` (`package.json` `main` is `build/main.js`). `build/` is gitignored — always run the build before starting the adapter or the integration tests.

## Commands

```bash
npm run build                             # tsc -p tsconfig.build.json  -> build/
npm run watch                             # same in watch mode
npm run check                             # type check only (tsconfig.json, noEmit)
npm run lint                              # eslint (@iobroker/eslint-config, flat config)
npx eslint -c eslint.config.mjs --fix src # autofix + prettier formatting

npm run test:package                      # validates package.json / io-package.json / admin JSON (fast)
npm run test:integration                  # starts a real js-controller + adapter instance
npm run translate                         # translate-adapter, en.json is the reference
npm run release-patch                     # @alcalzone/release-script, moves README changelog into io-package news
```

There is deliberately **no `prepare` script** — `npm ci`/`npm install` does not build. Because `build/` is neither committed nor built on install, `common.nogit` is `true` in `io-package.json`: the adapter can only be installed from npm, not from GitHub. The integration test requires that **no** js-controller is running on the machine, otherwise it aborts with "JS-Controller is already running!".

## Architecture

| Path | Content |
| --- | --- |
| `src/main.ts` | the whole adapter: one `WhatsappCmbAdapter extends utils.Adapter` class |
| `src/lib/adapter-config.d.ts` | augments `ioBroker.AdapterConfig` (`apikey`, `defaultPhone`) |
| `admin/jsonConfig.json` | the configuration dialog (two text fields + static instructions) |
| `admin/i18n/<lang>.json` | flat translations, keys are the English labels of `jsonConfig.json` |
| `admin/blockly.js` | Blockly "send to WhatsApp" block (`common.blockly: true`), has its own inline translations |

`src/lib/adapter-config.d.ts` is hand-maintained and must be kept in sync with `native` in `io-package.json` **and** with `admin/jsonConfig.json` — nothing generates it.

### Two ways to send

- **State** `whatsapp-cmb.<n>.sendMessage` (instance object from `io-package.json`): a non-ack write with a truthy value sends `String(val)` to `defaultPhone`. Only subscribed when an `apikey` is configured.
- **Message** `sendTo('whatsapp-cmb.0', 'send', { text, phone? })` or `sendTo(..., 'send', 'text')`. Answers `{ result: 'Message sent' }` or `{ error }`. Messages are ignored completely (no answer) if `apikey` is empty — that is why the integration test has no `sendTo` test.

### Intentional legacy behavior (do not "fix" silently)

- Missing phone number in `send` → warns and still answers `{ result: 'Message sent' }`.
- The emoji handling in `sendMessageToWhatsApp` only reverts double encoding of emojis the user typed already URL-encoded (`%F0%9F...`); real emoji characters are sent normally encoded.
- A send fails if the HTTP status is not 200 **or** the body contains `ERROR`. The rejection value is the body string or the status code (not an `Error`), and it is passed through as `error` in the `sendTo` answer. axios is called with `validateStatus: () => true` and `responseType: 'text'` to mirror the old `request` behavior.
- `apikey` is stored as string (the old HTML admin saved it as text even though the input was numeric); `jsonConfig` uses a `text` field for that reason.

## Conventions

- Timers: none at the moment; if needed use `this.setTimeout`/`this.setInterval` from adapter-core.
- Changelog entries go under `### **WORK IN PROGRESS**` in `README.md`; `common.news` is maintained by the release script.
- CI (`.github/workflows/test-and-release.yml`) uses `ioBroker/testing-action-check@v2`, `-adapter@v1`, `-deploy@v1` with `build: true`.
