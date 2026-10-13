/**
 * The ioBroker.whatsapp-cmb block for the Blockly editor of ioBroker.javascript.
 *
 * This is the source of `admin/blockly.js`, which is a generated bundle - do not edit that file,
 * run `npm run build:blockly` instead.
 *
 * The editor loads the bundle as a classic script *after* Blockly itself is up, so the runtime is
 * taken from `window.Blockly` and the `blockly` package contributes types only.
 */
import { installWhatsappCmb } from './blocks/whatsappCmb';
import { installWords } from './words';

// The words have to be in place before the block asks for its labels
installWords();

installWhatsappCmb();
