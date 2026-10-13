'use strict';

const path = require('node:path');
const { tests } = require('@iobroker/testing');

// Run integration tests - See https://github.com/ioBroker/testing for a detailed explanation and further options.
// No sendTo() test: without an API key the adapter does not answer messages at all.
tests.integration(path.join(__dirname, '..'));
