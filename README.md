![Logo](admin/whatsapp-cmb.png)
# ioBroker.whatsapp-cmb

[![NPM version](http://img.shields.io/npm/v/iobroker.whatsapp-cmb.svg)](https://www.npmjs.com/package/iobroker.whatsapp-cmb)
[![Downloads](https://img.shields.io/npm/dm/iobroker.whatsapp-cmb.svg)](https://www.npmjs.com/package/iobroker.whatsapp-cmb)
[![Dependency Status](https://img.shields.io/david/bluefox/iobroker.whatsapp-cmb.svg)](https://david-dm.org/bluefox/iobroker.whatsapp-cmb)
[![Known Vulnerabilities](https://snyk.io/test/github/bluefox/ioBroker.whatsapp-cmb/badge.svg)](https://snyk.io/test/github/bluefox/ioBroker.whatsapp-cmb)

[![NPM](https://nodei.co/npm/iobroker.whatsapp-cmb.png?downloads=true)](https://nodei.co/npm/iobroker.whatsapp-cmb/)

**Tests:**: [![Travis-CI](http://img.shields.io/travis/bluefox/ioBroker.whatsapp-cmb/master.svg)](https://travis-ci.org/bluefox/ioBroker.whatsapp-cmb)

## whatsapp-cmb adapter for ioBroker
Big thanks to free [CallMeBot](https://www.callmebot.com/blog/free-api-whatsapp-messages/) service, this adapter allows you to send WhatsApp messages to yourself or other number.

**Note** : *The Free API is only for personal use!*

### Usage
There are two possibilities to send a messages:
- via `whatsapp-cmb.0.sendMessage`. Just write some text into this state and the message will be sent to default number, that was configured in settings dialog.
- via message from javascript adapter:
```
sendTo('whatsapp-cmb.0', 'send', {
    text: 'My message', 
    phone: '+491234567890' // optional, if empty the message will be sent default configured number
});
``` 

## Changelog

### 0.0.1 (2020-08-27)
* (ioBroker) initial release

## License
MIT License

Copyright (c) 2020 ioBroker <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.