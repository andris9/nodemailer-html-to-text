'use strict';

var chai = require('chai');
var htmlToText = require('../src/nodemailer-html-to-text').htmlToText;

var expect = chai.expect;
chai.config.includeStack = true;

describe('nodemailer-html-to-text tests', function() {

    it('should set text from html string', function(done) {
        var plugin = htmlToText();
        var mail = {
            data: {
                html: '<p>Tere, tere</p><p>vana kere!</p>'
            },
            resolveContent: function(obj, key, cb) {
                cb(null, obj[key]);
            }
        };
        plugin(mail, function(err) {
            expect(err).to.not.exist;
            expect(mail.data.text).to.equal(
                'Tere, tere\n\nvana kere!'
            );
            done();
        });
    });

    it('should remove the inlined picture reference including the empty space behind a line break', function(done) {
        var plugin = htmlToText();
        var mail = {
            data: {
                html: '<p>Tere, tere</p><p><img src="cid:nodemailerLogo"/>vana kere!</p>'
            },
            resolveContent: function(obj, key, cb) {
                cb(null, obj[key]);
            }
        };
        plugin(mail, function(err) {
            expect(err).to.not.exist;
            expect(mail.data.text).to.equal(
                'Tere, tere\n\nvana kere!'
            );
            done();
        });
    });

    it('should remove the inlined picture reference and keep the empty space without line break', function(done) {
        var plugin = htmlToText();
        var mail = {
            data: {
                html: '<p>Tere,<img src="cid:nodemailerLogo"/> tere</p><p>vana kere!</p>'
            },
            resolveContent: function(obj, key, cb) {
                cb(null, obj[key]);
            }
        };
        plugin(mail, function(err) {
            expect(err).to.not.exist;
            expect(mail.data.text).to.equal(
                'Tere, tere\n\nvana kere!'
            );
            done();
        });
    });

    it('should set text from html buffer', function(done) {
        var plugin = htmlToText();
        var mail = {
            data: {
                html: new Buffer('<p>Tere, tere</p><p>vana kere!</p>')
            },
            resolveContent: function(obj, key, cb) {
                cb(null, obj[key]);
            }
        };
        plugin(mail, function(err) {
            expect(err).to.not.exist;
            expect(mail.data).to.deep.equal({
                html: new Buffer('<p>Tere, tere</p><p>vana kere!</p>'),
                text: 'Tere, tere\n\nvana kere!'
            });
            done();
        });
    });

    it('should return an error', function(done) {
        var plugin = htmlToText();
        var mail = {
            data: {
                html: 'test'
            },
            resolveContent: function(obj, key, cb) {
                cb(new Error('fail'));
            }
        };
        plugin(mail, function(err) {
            expect(err).to.exist;
            done();
        });
    });
});