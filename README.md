# Nodemailer plugin to generate text content from HTML

This applies to Nodemailer v1.1+. The plugin checks if there is no `text` option specified and populates it based on the `html` value.

This plugin is meant as replacement for the `generateTextFromHTML` option that was removed from Nodemailer 1.0

## Install

Install from npm

    npm install nodemailer-html-to-text --save

## Usage

Load the `htmlToText` function

```javascript
var htmlToText = require('nodemailer-html-to-text').htmlToText;
```

Attach it as a 'compile' handler for a nodemailer transport object

```javascript
nodemailerTransport.use('compile', htmlToText(options))
```

Where

  * **options** - includes options for the [html-to-text](https://www.npmjs.org/package/html-to-text) converter

## Example

```javascript
var nodemailer = require('nodemailer');
var htmlToText = require('nodemailer-html-to-text').htmlToText;
var transporter = nodemailer.createTransport();
transporter.use('compile', htmlToText());
transporter.sendMail({
    from: 'me@example.com',
    to: 'receiver@example.com',
    html: '<b>Hello world!</b>'
});
```

## License

**MIT**