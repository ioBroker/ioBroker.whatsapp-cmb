# Blockly block

Source of `admin/blockly.js`, the `whatsapp-cmb` block that ioBroker.javascript's Blockly editor shows
in its `sendTo` category. **`admin/blockly.js` is generated - never edit it directly.**

```bash
npm run build:blockly   # type check + bundle into admin/blockly.js (node tasks.ts)
```

`npm run build` runs it too, so a release always ships a bundle that matches this source. The bundle
stays committed, like in ioBroker.telegram.

| file | |
|---|---|
| `blockly.ts` | entry point, installs the words and the block |
| `blocks/whatsappCmb.ts` | the block and its code generator |
| `helpers.ts` | `registerGenerator()` (Blockly >= 10 `forBlock` vs. older editors) |
| `words.ts`, `i18n/*.json` | the words |
| `iobroker-blockly.d.ts` | the globals the editor provides (`window.Blockly`, `window.main`, `window.systemLang`) |

## Take the types from `blockly`, the runtime from `window`

`blockly` is a **dev** dependency - it contributes types and nothing else:

```ts
import type { Block } from 'blockly/core';

const Blockly = window.Blockly;
```

Never `import * as Blockly from 'blockly/core'` here. The editor loads this file long after it has
created its own Blockly instance, and an import would bundle a *second*, private one. The block would
register itself on that private instance and stay invisible to the editor - with no error anywhere.

## Words

`i18n/*.json` holds one file per language, keyed by word - the layout `translate-adapter` expects
(`npm run translate` also runs `translate-adapter -b src-blockly/i18n/en.json`). `words.ts` turns them
inside out into `Blockly.Words` (keyed by word, then language). A language file may be incomplete:
`Blockly.Translate` falls back to English. The help URL is a link, not a word, so `words.ts` sets it
directly.
