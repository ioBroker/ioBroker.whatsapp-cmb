import type { Block } from 'blockly/core';

const Blockly = window.Blockly;

/**
 * Registers a generator. Blockly >= 10 looks it up in `forBlock`; registering on the plain slot is
 * not enough, because the editor migrates that slot to `forBlock` before it loads any adapter's
 * `blockly.js`, so an adapter registering the old way is never migrated.
 *
 * @param type block type
 * @param generator turns a block of that type into JavaScript
 */
export function registerGenerator(type: string, generator: (block: Block) => string): void {
    if (Blockly.JavaScript.forBlock) {
        Blockly.JavaScript.forBlock[type] = generator;
    } else {
        Blockly.JavaScript[type] = generator;
    }
}
