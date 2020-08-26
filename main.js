'use strict';

/*
 * Created with @iobroker/create-adapter v1.17.0
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
const utils = require('@iobroker/adapter-core');
const request = require('request');

// Load your modules here, e.g.:
// const fs = require("fs");

/**
 * The adapter instance
 * @type {ioBroker.Adapter}
 */
let adapter;


function sendMessageToWhatsApp(message, phoneNumber) {
    return new Promise((resolve, reject) =>  {
        phoneNumber = phoneNumber || adapter.config.defaultNumber;

        if (message) {
            const r = request(`https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phoneNumber)}&text=${encodeURIComponent(message)}&apikey=${adapter.config.apikey}`, (err, resp, body) => {
                !err && resp.statusCode < 400 ? resolve() : reject(err || resp.statusCode);
            })
                .on('error', err => reject(err));
        } else {
            resolve();
        }
    })
}
/**
 * Starts the adapter instance
 * @param {Partial<ioBroker.AdapterOptions>} [options]
 */
function startAdapter(options) {
    // Create the adapter and define its methods
    return adapter = utils.adapter(Object.assign({}, options, {
        name: 'whatsapp-cmb',

        // The ready callback is called when databases are connected and adapter received configuration.
        // start here!
        ready: main, // Main method defined below for readability

        // is called if a subscribed state changes
        stateChange: (id, state) => {
            if (state && !state.ack && state.val && adapter.config.defaultNumber) {
                // The state was changed
                adapter.log.debug(`Sending message ${state.val} to default number ${adapter.config.defaultNumber}`);
                sendMessageToWhatsApp(state.val)
                    .then(() => adapter.log.debug(`Successfully sent`))
                    .catch(err => adapter.log.error('Cannot send message: ' + err));
            }
        },

        // Some message was sent to adapter instance over message box. Used by email, pushover, text2speech, ...
        // requires "common.message" property to be set to true in io-package.json
        message: (obj) => {
        	if (typeof obj === 'object' && obj.message) {
        		if (obj.command === 'send') {
        			// e.g. send email or pushover or whatever
        			adapter.log.info('send command');

        			// Send response in callback if required
        			obj.callback && adapter.sendTo(obj.from, obj.command, 'Message sent', obj.callback);
        		}
        	}
        },
    }));
}

function main() {
    if (!adapter.config.apikey) {
        adapter.log.warn('APIKEY is not provided. No messages will be sent')
        return;
    }

    // in this template all states changes inside the adapters namespace are subscribed
    adapter.subscribeStates('sendMessage');
}

// @ts-ignore parent is a valid property on module
if (module.parent) {
    // Export startAdapter in compact mode
    module.exports = startAdapter;
} else {
    // otherwise start the instance directly
    startAdapter();
}