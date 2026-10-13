// GENERATED FILE - do not edit.
// Source: src-blockly/blockly.ts - rebuild with `npm run build:blockly`.
"use strict";
(() => {
  // src-blockly/helpers.ts
  var Blockly = window.Blockly;
  function registerGenerator(type, generator) {
    if (Blockly.JavaScript.forBlock) {
      Blockly.JavaScript.forBlock[type] = generator;
    } else {
      Blockly.JavaScript[type] = generator;
    }
  }

  // src-blockly/blocks/whatsappCmb.ts
  var Blockly2 = window.Blockly;
  function instanceOptions() {
    const options = [[Blockly2.Translate("whatsapp-cmb_anyInstance"), ""]];
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
    if (options.length === 1) {
      for (let n = 0; n <= 4; n++) {
        options.push([`whatsapp-cmb.${n}`, `.${n}`]);
      }
    }
    return options;
  }
  function installWhatsappCmb() {
    Blockly2.Sendto.blocks["whatsapp-cmb"] = `<block type="whatsapp-cmb">
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
    Blockly2.Blocks["whatsapp-cmb"] = {
      init: function() {
        this.appendDummyInput("INSTANCE").appendField(Blockly2.Translate("whatsapp-cmb")).appendField(new Blockly2.FieldDropdown(instanceOptions()), "INSTANCE");
        this.appendValueInput("MESSAGE").appendField(Blockly2.Translate("whatsapp-cmb_message"));
        const input = this.appendValueInput("PHONE").setCheck("String").appendField(Blockly2.Translate("whatsapp-cmb_phone"));
        this.appendDummyInput("LOG").appendField(Blockly2.Translate("whatsapp-cmb_log")).appendField(
          new Blockly2.FieldDropdown([
            [Blockly2.Translate("whatsapp-cmb_log_none"), ""],
            [Blockly2.Translate("whatsapp-cmb_log_info"), "log"],
            [Blockly2.Translate("whatsapp-cmb_log_debug"), "debug"],
            [Blockly2.Translate("whatsapp-cmb_log_warn"), "warn"],
            [Blockly2.Translate("whatsapp-cmb_log_error"), "error"]
          ]),
          "LOG"
        );
        if (input.connection) {
          input.connection._optional = true;
        }
        this.setInputsInline(false);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour(Blockly2.Sendto.HUE);
        this.setTooltip(Blockly2.Translate("whatsapp-cmb_tooltip"));
        this.setHelpUrl(Blockly2.Translate("whatsapp-cmb_help"));
      }
    };
    registerGenerator("whatsapp-cmb", (block) => {
      const instance = block.getFieldValue("INSTANCE");
      const logLevel = block.getFieldValue("LOG");
      const message = Blockly2.JavaScript.valueToCode(block, "MESSAGE", Blockly2.JavaScript.ORDER_ATOMIC);
      const phone = Blockly2.JavaScript.valueToCode(block, "PHONE", Blockly2.JavaScript.ORDER_ATOMIC);
      let logText = "";
      if (logLevel) {
        const withPhone = phone ? `[" + ${phone} + "]` : "";
        logText = `console.${logLevel}("whatsapp-cmb${withPhone}: "${message ? ` + ${message}` : ""});
`;
      }
      const props = [];
      if (message) {
        props.push(`    text: ${message}`);
      }
      if (phone) {
        props.push(`    phone: ${phone}`);
      }
      return `sendTo("whatsapp-cmb${instance}", "send", {
${props.join(",\n")}
});
${logText}`;
    });
  }

  // src-blockly/i18n/de.json
  var de_default = {
    "whatsapp-cmb": "WhatsApp CMB",
    "whatsapp-cmb_message": "Meldung",
    "whatsapp-cmb_phone": "Empfänger (optional)",
    "whatsapp-cmb_anyInstance": "Alle Instanzen",
    "whatsapp-cmb_tooltip": "Senden Sie eine Nachricht über die CallMeBot-API an WhatsApp",
    "whatsapp-cmb_log": "Loglevel",
    "whatsapp-cmb_log_none": "keins",
    "whatsapp-cmb_log_info": "info",
    "whatsapp-cmb_log_debug": "debug",
    "whatsapp-cmb_log_warn": "warning",
    "whatsapp-cmb_log_error": "error"
  };

  // src-blockly/i18n/en.json
  var en_default = {
    "whatsapp-cmb": "WhatsApp CMB",
    "whatsapp-cmb_message": "message",
    "whatsapp-cmb_phone": "Recipient (optional)",
    "whatsapp-cmb_anyInstance": "all instances",
    "whatsapp-cmb_tooltip": "Send message to WhatsApp via CallMeBot API",
    "whatsapp-cmb_log": "log level",
    "whatsapp-cmb_log_none": "none",
    "whatsapp-cmb_log_info": "info",
    "whatsapp-cmb_log_debug": "debug",
    "whatsapp-cmb_log_warn": "warning",
    "whatsapp-cmb_log_error": "error"
  };

  // src-blockly/i18n/es.json
  var es_default = {
    "whatsapp-cmb": "WhatsApp CMB",
    "whatsapp-cmb_message": "mensaje",
    "whatsapp-cmb_phone": "Nombre de usuario (opcional)",
    "whatsapp-cmb_anyInstance": "todas las instancias",
    "whatsapp-cmb_tooltip": "Enviar mensaje a WhatsApp a través de API CallMeBot",
    "whatsapp-cmb_log": "nivel de registro",
    "whatsapp-cmb_log_none": "ninguna",
    "whatsapp-cmb_log_info": "información",
    "whatsapp-cmb_log_debug": "depurar",
    "whatsapp-cmb_log_warn": "advertencia",
    "whatsapp-cmb_log_error": "error"
  };

  // src-blockly/i18n/fr.json
  var fr_default = {
    "whatsapp-cmb": "WhatsApp CMB",
    "whatsapp-cmb_message": "message",
    "whatsapp-cmb_phone": "Nom d'utilisateur (facultatif)",
    "whatsapp-cmb_anyInstance": "toutes les instances",
    "whatsapp-cmb_tooltip": "Envoyer un message à WhatsApp via l'API CallMeBot",
    "whatsapp-cmb_log": "niveau de journalisation",
    "whatsapp-cmb_log_none": "aucun",
    "whatsapp-cmb_log_info": "Info",
    "whatsapp-cmb_log_debug": "déboguer",
    "whatsapp-cmb_log_warn": "Attention",
    "whatsapp-cmb_log_error": "Erreur"
  };

  // src-blockly/i18n/it.json
  var it_default = {
    "whatsapp-cmb": "WhatsApp CMB",
    "whatsapp-cmb_message": "Messaggio",
    "whatsapp-cmb_phone": "Nome utente (facoltativo)",
    "whatsapp-cmb_anyInstance": "tutte le istanze",
    "whatsapp-cmb_tooltip": "Invia un messaggio a WhatsApp tramite CallMeBot API",
    "whatsapp-cmb_log": "livello log",
    "whatsapp-cmb_log_none": "nessuna",
    "whatsapp-cmb_log_info": "Informazioni",
    "whatsapp-cmb_log_debug": "Debug",
    "whatsapp-cmb_log_warn": "avvertimento",
    "whatsapp-cmb_log_error": "errore"
  };

  // src-blockly/i18n/nl.json
  var nl_default = {
    "whatsapp-cmb": "WhatsApp CMB",
    "whatsapp-cmb_message": "bericht",
    "whatsapp-cmb_phone": "Gebruikersnaam (optioneel)",
    "whatsapp-cmb_anyInstance": "alle instanties",
    "whatsapp-cmb_tooltip": "Stuur bericht naar WhatsApp via CallMeBot API",
    "whatsapp-cmb_log": "Log niveau",
    "whatsapp-cmb_log_none": "geen",
    "whatsapp-cmb_log_info": "Info",
    "whatsapp-cmb_log_debug": "Debug",
    "whatsapp-cmb_log_warn": "waarschuwing",
    "whatsapp-cmb_log_error": "fout"
  };

  // src-blockly/i18n/pl.json
  var pl_default = {
    "whatsapp-cmb": "WhatsApp CMB",
    "whatsapp-cmb_message": "wiadomość",
    "whatsapp-cmb_phone": "Nazwa użytkownika (opcjonalnie)",
    "whatsapp-cmb_anyInstance": "wszystkie przypadki",
    "whatsapp-cmb_tooltip": "Wyślij wiadomość do WhatsApp przez CallMeBot API",
    "whatsapp-cmb_log": "poziom dziennika",
    "whatsapp-cmb_log_none": "Żaden",
    "whatsapp-cmb_log_info": "informacje",
    "whatsapp-cmb_log_debug": "odpluskwić",
    "whatsapp-cmb_log_warn": "ostrzeżenie",
    "whatsapp-cmb_log_error": "błąd"
  };

  // src-blockly/i18n/pt.json
  var pt_default = {
    "whatsapp-cmb": "WhatsApp CMB",
    "whatsapp-cmb_message": "mensagem",
    "whatsapp-cmb_phone": "Nome do usuário (opcional)",
    "whatsapp-cmb_anyInstance": "todas as instâncias",
    "whatsapp-cmb_tooltip": "Enviar mensagem para WhatsApp via API CallMeBot",
    "whatsapp-cmb_log": "nível de log",
    "whatsapp-cmb_log_none": "Nenhum",
    "whatsapp-cmb_log_info": "info",
    "whatsapp-cmb_log_debug": "depurar",
    "whatsapp-cmb_log_warn": "Atenção",
    "whatsapp-cmb_log_error": "erro"
  };

  // src-blockly/i18n/ru.json
  var ru_default = {
    "whatsapp-cmb": "WhatsApp CMB",
    "whatsapp-cmb_message": "сообщение",
    "whatsapp-cmb_phone": "имя пользователя (не обяз.)",
    "whatsapp-cmb_anyInstance": "На все драйвера",
    "whatsapp-cmb_tooltip": "Отправить сообщение в WhatsApp через CallMeBot API",
    "whatsapp-cmb_log": "Протокол",
    "whatsapp-cmb_log_none": "нет",
    "whatsapp-cmb_log_info": "инфо",
    "whatsapp-cmb_log_debug": "debug",
    "whatsapp-cmb_log_warn": "warning",
    "whatsapp-cmb_log_error": "ошибка"
  };

  // src-blockly/i18n/uk.json
  var uk_default = {};

  // src-blockly/i18n/zh-cn.json
  var zh_cn_default = {
    "whatsapp-cmb_tooltip": "通过CallMeBot API将消息发送到WhatsApp"
  };

  // src-blockly/words.ts
  var Blockly3 = window.Blockly;
  var LANGUAGES = {
    de: de_default,
    en: en_default,
    es: es_default,
    fr: fr_default,
    it: it_default,
    nl: nl_default,
    pl: pl_default,
    pt: pt_default,
    ru: ru_default,
    uk: uk_default,
    "zh-cn": zh_cn_default
  };
  var README = "https://github.com/ioBroker/ioBroker.whatsapp-cmb/blob/master/README.md";
  function installWords() {
    Blockly3.Translate || (Blockly3.Translate = function(word, lang) {
      lang || (lang = window.systemLang);
      const entry = Blockly3.Words?.[word];
      return entry ? entry[lang || "en"] || entry.en : word;
    });
    const words = {};
    for (const [lang, texts] of Object.entries(LANGUAGES)) {
      for (const [word, text] of Object.entries(texts)) {
        if (text) {
          (words[word] || (words[word] = {}))[lang] = text;
        }
      }
    }
    Object.assign(Blockly3.Words, words);
    Blockly3.Words["whatsapp-cmb_help"] = { en: README };
  }

  // src-blockly/blockly.ts
  installWords();
  installWhatsappCmb();
})();
