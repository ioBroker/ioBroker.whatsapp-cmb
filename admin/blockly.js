'use strict';

// --- SendTo whatsapp-cmb --------------------------------------------------
Blockly.Words['whatsapp-cmb']               = {'en': 'WhatsApp CMB',                'pt': 'WhatsApp CMB',                       'pl': 'WhatsApp CMB',                           'nl': 'WhatsApp CMB',                       'it': 'WhatsApp CMB',                       'es': 'WhatsApp CMB',                       'fr': 'WhatsApp CMB',                           'de': 'WhatsApp CMB',                           'ru': 'WhatsApp CMB'};
Blockly.Words['whatsapp-cmb_message']       = {'en': 'message',                     'pt': 'mensagem',                       'pl': 'wiadomość',                          'nl': 'bericht',                        'it': 'Messaggio',                      'es': 'mensaje',                        'fr': 'message',                            'de': 'Meldung',                            'ru': 'сообщение'};
Blockly.Words['whatsapp-cmb_phone']         = {'en': 'Recipient (optional)',        'pt': 'Nome do usuário (opcional)',     'pl': 'Nazwa użytkownika (opcjonalnie)',    'nl': 'Gebruikersnaam (optioneel)',     'it': 'Nome utente (facoltativo)',      'es': 'Nombre de usuario (opcional)',   'fr': 'Nom d\'utilisateur (facultatif)',    'de': 'Empfänger (optional)',               'ru': 'имя пользователя (не обяз.)'};
Blockly.Words['whatsapp-cmb_anyInstance']   = {'en': 'all instances',               'pt': 'todas as instâncias',            'pl': 'wszystkie przypadki',                'nl': 'alle instanties',                'it': 'tutte le istanze',               'es': 'todas las instancias',           'fr': 'toutes les instances',               'de': 'Alle Instanzen',                     'ru': 'На все драйвера'};
Blockly.Words['whatsapp-cmb_tooltip']       = {"en": "Send message to WhatsApp via CallMeBot API", "de": "Senden Sie eine Nachricht über die CallMeBot-API an WhatsApp", "ru": "Отправить сообщение в WhatsApp через CallMeBot API", "pt": "Enviar mensagem para WhatsApp via API CallMeBot", "nl": "Stuur bericht naar WhatsApp via CallMeBot API", "fr": "Envoyer un message à WhatsApp via l'API CallMeBot", "it": "Invia un messaggio a WhatsApp tramite CallMeBot API", "es": "Enviar mensaje a WhatsApp a través de API CallMeBot", "pl": "Wyślij wiadomość do WhatsApp przez CallMeBot API", "zh-cn": "通过CallMeBot API将消息发送到WhatsApp"};
Blockly.Words['whatsapp-cmb_log']           = {'en': 'log level',                   'pt': 'nível de log',                   'pl': 'poziom dziennika',                   'nl': 'Log niveau',                     'it': 'livello log',                    'es': 'nivel de registro',              'fr': 'niveau de journalisation',           'de': 'Loglevel',                           'ru': 'Протокол'};
Blockly.Words['whatsapp-cmb_log_none']      = {'en': 'none',                        'pt': 'Nenhum',                         'pl': 'Żaden',                              'nl': 'geen',                           'it': 'nessuna',                        'es': 'ninguna',                        'fr': 'aucun',                              'de': 'keins',                              'ru': 'нет'};
Blockly.Words['whatsapp-cmb_log_info']      = {'en': 'info',                        'pt': 'info',                           'pl': 'informacje',                         'nl': 'Info',                           'it': 'Informazioni',                   'es': 'información',                    'fr': 'Info',                               'de': 'info',                               'ru': 'инфо'};
Blockly.Words['whatsapp-cmb_log_debug']     = {'en': 'debug',                       'pt': 'depurar',                        'pl': 'odpluskwić',                         'nl': 'Debug',                          'it': 'Debug',                          'es': 'depurar',                        'fr': 'déboguer',                           'de': 'debug',                              'ru': 'debug'};
Blockly.Words['whatsapp-cmb_log_warn']      = {'en': 'warning',                     'pt': 'Atenção',                        'pl': 'ostrzeżenie',                        'nl': 'waarschuwing',                   'it': 'avvertimento',                   'es': 'advertencia',                    'fr': 'Attention',                          'de': 'warning',                            'ru': 'warning'};
Blockly.Words['whatsapp-cmb_log_error']     = {'en': 'error',                       'pt': 'erro',                           'pl': 'błąd',                               'nl': 'fout',                           'it': 'errore',                         'es': 'error',                          'fr': 'Erreur',                             'de': 'error',                              'ru': 'ошибка'};
Blockly.Words['whatsapp-cmb_help']          = {'en': 'https://github.com/ioBroker/ioBroker.whatsapp-cmb/blob/master/README.md', 'pt': 'https://github.com/ioBroker/ioBroker.whatsapp-cmb/blob/master/README.md', 'pl': 'https://github.com/ioBroker/ioBroker.whatsapp-cmb/blob/master/README.md', 'nl': 'https://github.com/ioBroker/ioBroker.whatsapp-cmb/blob/master/README.md', 'it': 'https://github.com/ioBroker/ioBroker.whatsapp-cmb/blob/master/README.md', 'es': 'https://github.com/ioBroker/ioBroker.whatsapp-cmb/blob/master/README.md', 'fr': 'https://github.com/ioBroker/ioBroker.whatsapp-cmb/blob/master/README.md', 'de': 'https://github.com/ioBroker/ioBroker.whatsapp-cmb/blob/master/README.md', 'ru': 'https://github.com/ioBroker/ioBroker.whatsapp-cmb/blob/master/README.md'};

Blockly.Sendto.blocks['whatsapp-cmb'] =
    '<block type="whatsapp-cmb">'
    + '     <value name="INSTANCE">'
    + '     </value>'
    + '     <value name="MESSAGE">'
    + '         <shadow type="text">'
    + '             <field name="TEXT">text</field>'
    + '         </shadow>'
    + '     </value>'
    + '     <value name="PHONE">'
    + '     </value>'
    + '     <value name="LOG">'
    + '     </value>'
    + '</block>';

Blockly.Blocks['whatsapp-cmb'] = {
    init: function() {
        var options = [[Blockly.Words['whatsapp-cmb_anyInstance'][systemLang], '']];
        if (typeof main !== 'undefined' && main.instances) {
            for (var i = 0; i < main.instances.length; i++) {
                var m = main.instances[i].match(/^system.adapter.whatsapp-cmb.(\d+)$/);
                if (m) {
                    var k = parseInt(m[1], 10);
                    options.push(['whatsapp-cmb.' + k, '.' + k]);
                }
            }
            if (options.length === 0) {
                for (var u = 0; u <= 4; u++) {
                    options.push(['whatsapp-cmb.' + u, '.' + u]);
                }
            }
        } else {
            for (var n = 0; n <= 4; n++) {
                options.push(['whatsapp-cmb.' + n, '.' + n]);
            }
        }

        this.appendDummyInput('INSTANCE')
            .appendField(Blockly.Words['whatsapp-cmb'][systemLang])
            .appendField(new Blockly.FieldDropdown(options), 'INSTANCE');

        this.appendValueInput('MESSAGE')
            .appendField(Blockly.Words['whatsapp-cmb_message'][systemLang]);

        var input = this.appendValueInput('PHONE')
            .setCheck('String')
            .appendField(Blockly.Words['whatsapp-cmb_phone'][systemLang]);

        this.appendDummyInput('LOG')
            .appendField(Blockly.Words['whatsapp-cmb_log'][systemLang])
            .appendField(new Blockly.FieldDropdown([
                [Blockly.Words['whatsapp-cmb_log_none'][systemLang],  ''],
                [Blockly.Words['whatsapp-cmb_log_info'][systemLang],  'log'],
                [Blockly.Words['whatsapp-cmb_log_debug'][systemLang], 'debug'],
                [Blockly.Words['whatsapp-cmb_log_warn'][systemLang],  'warn'],
                [Blockly.Words['whatsapp-cmb_log_error'][systemLang], 'error']
            ]), 'LOG');

        if (input.connection) input.connection._optional = true;

        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);

        this.setColour(Blockly.Sendto.HUE);
        this.setTooltip(Blockly.Words['whatsapp-cmb_tooltip'][systemLang]);
        this.setHelpUrl(Blockly.Words['whatsapp-cmb_help'][systemLang]);
    }
};

Blockly.JavaScript['whatsapp-cmb'] = function(block) {
    var dropdown_instance = block.getFieldValue('INSTANCE');
    var logLevel = block.getFieldValue('LOG');
    var value_message = Blockly.JavaScript.valueToCode(block, 'MESSAGE', Blockly.JavaScript.ORDER_ATOMIC);
    var value_phone = Blockly.JavaScript.valueToCode(block, 'PHONE', Blockly.JavaScript.ORDER_ATOMIC);

    var logText;
    if (logLevel) {
        logText = 'console.' + logLevel + '("whatsapp-cmb' + (value_phone ? '[' + value_phone + ']' : '') + ': " + ' + value_message + ');\n'
    } else {
        logText = '';
    }

    return 'sendTo("whatsapp-cmb' + dropdown_instance + '", "send", {\n    text: ' +
        value_message + (value_phone ? ',\n    ' + 'phone: ' + value_phone : '') +
        '\n});\n' +
        logText;
};
