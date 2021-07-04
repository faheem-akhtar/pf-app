const withPreact = require('next-plugin-preact');

module.exports = withPreact({
    distDir: process.env.NEXT_PUBLIC_MOBILE === 'true' ? '.mobile.next' : '.desktop.next',
});
