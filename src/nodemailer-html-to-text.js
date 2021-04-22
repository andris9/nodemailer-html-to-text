'use strict';

const converter = require('html-to-text');

module.exports.htmlToText = function (options) {
    options = options || {};

    return function (mail, done) {
        const handler = new HTMLToText(options);
        handler.process(mail, done);
    };
};

function HTMLToText(options) {
    this._options = {};

    // create a shallow copy of the passed options
    Object.keys(options || {}).forEach(
        function (key) {
            this._options[key] = options[key];
        }.bind(this)
    );
}

HTMLToText.prototype.process = function (mail, done) {
    if (!mail || !mail.data || !mail.data.html || mail.data.text) {
        return done();
    }

    mail.resolveContent(
        mail.data,
        'html',
        function (err, html) {
            if (err) {
                return done(err);
            }
            try {
                mail.data.text = converter.htmlToText(html, this._options);
                mail.data.text = mail.data.text.replace(/(\n)\[cid:.*?\] |\[cid:.*?\]/g, '$1');
            } catch (E) {
                return done(E);
            }
            done();
        }.bind(this)
    );
};
