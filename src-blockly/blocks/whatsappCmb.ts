/**
 * `whatsapp-cmb` - send a message via CallMeBot.
 */
import type { Block } from 'blockly/core';

import { registerGenerator } from '../helpers';

const Blockly = window.Blockly;

/**
 * The instance dropdown: every `whatsapp-cmb.x` the admin knows about, or `whatsapp-cmb.0` .. `whatsapp-cmb.4`
 * while the editor has not reported any whatsapp-cmb instance (yet).
 */
function instanceOptions(): [string, string][] {
    const options: [string, string][] = [[Blockly.Translate('whatsapp-cmb_anyInstance'), '']];

    const instances = window.main?.instances;
    if (instances) {
        for (let i = 0; i < instances.length; i++) {
            const m = instances[i].match(/^system\.adapter\.whatsapp-cmb\.(\d+)$/);
            if (m) {
                const n = parseInt(m[1], 10);
                options.push([`whatsapp-cmb.${n}`, `.${n}`]);
            }
        }
    }

    // Nothing but "all instances" so far. The original only filled in the defaults when the editor had
    // no instance list at all, so a list without whatsapp-cmb left the dropdown with that single entry.
    if (options.length === 1) {
        for (let n = 0; n <= 4; n++) {
            options.push([`whatsapp-cmb.${n}`, `.${n}`]);
        }
    }

    return options;
}

export function installWhatsappCmb(): void {
    Blockly.Sendto.blocks['whatsapp-cmb'] = `<block type="whatsapp-cmb">
  <value name="INSTANCE">
  </value>
  <value name="MESSAGE">
    <shadow type="text">
      <field name="TEXT">text</field>
    </shadow>
  </value>
  <value name="PHONE">
  </value>
  <value name="LOG">
  </value>
</block>`;

    Blockly.Blocks['whatsapp-cmb'] = {
        init: function (this: Block): void {
            this.appendDummyInput('INSTANCE')
                .appendField(Blockly.Translate('whatsapp-cmb'))
                .appendField(new Blockly.FieldDropdown(instanceOptions()), 'INSTANCE');

            this.appendValueInput('MESSAGE').appendField(Blockly.Translate('whatsapp-cmb_message'));

            const input = this.appendValueInput('PHONE')
                .setCheck('String')
                .appendField(Blockly.Translate('whatsapp-cmb_phone'));

            this.appendDummyInput('LOG')
                .appendField(Blockly.Translate('whatsapp-cmb_log'))
                .appendField(
                    new Blockly.FieldDropdown([
                        [Blockly.Translate('whatsapp-cmb_log_none'), ''],
                        [Blockly.Translate('whatsapp-cmb_log_info'), 'log'],
                        [Blockly.Translate('whatsapp-cmb_log_debug'), 'debug'],
                        [Blockly.Translate('whatsapp-cmb_log_warn'), 'warn'],
                        [Blockly.Translate('whatsapp-cmb_log_error'), 'error'],
                    ]),
                    'LOG',
                );

            if (input.connection) {
                // Blockly has no public API for an optional input
                (input.connection as unknown as { _optional: boolean })._optional = true;
            }

            this.setInputsInline(false);
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);

            this.setColour(Blockly.Sendto.HUE);
            this.setTooltip(Blockly.Translate('whatsapp-cmb_tooltip'));
            this.setHelpUrl(Blockly.Translate('whatsapp-cmb_help'));
        },
    };

    registerGenerator('whatsapp-cmb', (block: Block): string => {
        const instance = block.getFieldValue('INSTANCE');
        const logLevel = block.getFieldValue('LOG');
        const message = Blockly.JavaScript.valueToCode(block, 'MESSAGE', Blockly.JavaScript.ORDER_ATOMIC);
        const phone = Blockly.JavaScript.valueToCode(block, 'PHONE', Blockly.JavaScript.ORDER_ATOMIC);

        // `valueToCode` yields an empty string for an unconnected input. Emitting `text: ` or `"…" + )`
        // would be a syntax error that takes the user's whole script down, so empty parts are left out.
        let logText = '';
        if (logLevel) {
            // The phone is code (a literal or a variable), so it is concatenated - not pasted into the string
            const withPhone = phone ? `[" + ${phone} + "]` : '';
            logText = `console.${logLevel}("whatsapp-cmb${withPhone}: "${message ? ` + ${message}` : ''});\n`;
        }

        const props: string[] = [];
        if (message) {
            props.push(`    text: ${message}`);
        }
        if (phone) {
            props.push(`    phone: ${phone}`);
        }

        return `sendTo("whatsapp-cmb${instance}", "send", {\n${props.join(',\n')}\n});\n${logText}`;
    });
}
