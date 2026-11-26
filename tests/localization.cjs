/* eslint-disable @typescript-eslint/no-require-imports -- Standalone Node test runner. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
// Run against the actual bundled content, without requiring a browser or database.
require.extensions['.ts'] = (module, file) => module._compile(ts.transpile(fs.readFileSync(file, 'utf8'), { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true }), file);
const content = require('../content/site-content.ts');
const { MY_COPY } = require('../content/myanmar.ts');
const { formatDate } = require('../lib/date-format.ts');
const { bookingDays } = require('../lib/booking-calendar.ts');
const offeredDays = bookingDays(Date.parse('2026-11-26T20:00:00Z'));
assert.equal(offeredDays[0], '2026-11-30');
assert.equal(offeredDays.length, 14);
assert.ok(offeredDays.every((date) => ![0, 6].includes(new Date(date + 'T12:00:00Z').getUTCDay())));
const { plainCopy } = require('../lib/copy-style.ts');
const { CATALOGS, translateText, translate } = require('../lib/translate.ts');
const previousMyanmar = require('../content/previous-myanmar.json');
const { languageHref } = require('../lib/locales.ts');
const { sameOrigin, validBooking, consumeRateLimit } = require('../lib/request-security.ts');
for (const lang of ['th', 'zh']) {
  for (const key of Object.keys(MY_COPY)) {
    assert.ok(CATALOGS[lang][key], `Missing ${lang}: ${key}`);
    assert.doesNotMatch(CATALOGS[lang][key], /[⟦⟧—–]/, `Invalid ${lang} copy: ${key}`);
  }
  assert.notEqual(translateText('Book a free call', lang), 'Book a free call');
  assert.notEqual(translateText('Packages for Websites', lang), 'Packages for Websites');
}
assert.equal(languageHref('/packages?cat=care#builder', 'th'), '/packages?cat=care&lang=th#builder');
assert.equal(languageHref('/admin/login', 'zh'), '/admin/login');
assert.equal(languageHref('/contact?lang=zh', 'en'), '/contact');
assert.equal(languageHref('//external.example', 'th'), '//external.example');
assert.equal(sameOrigin('https://evil.example', 'https://ctcmyanmar.com/api/admin/content'), false);
assert.equal(sameOrigin('https://ctcmyanmar.com', 'https://ctcmyanmar.com/api/admin/content'), true);
assert.equal(sameOrigin(null, 'https://ctcmyanmar.com'), false);
assert.equal(sameOrigin('http://127.0.0.1:3017', 'http://localhost:3017/api/admin/content', '127.0.0.1:3017'), true);
const now = Date.parse('2026-11-24T00:00:00Z');
assert.equal(validBooking('2026-11-25', '10:00', now), true);
assert.equal(validBooking('2026-11-28', '10:00', now), false);
assert.equal(validBooking('2026-11-25', '03:00', now), false);
assert.equal(validBooking('2026-11-23', '10:00', now), false);
assert.equal(validBooking('2027-02-30', '10:00', now), false);
for (let i=0; i<5; i++) assert.equal(consumeRateLimit('test', now), true);
assert.equal(consumeRateLimit('test', now), false);
assert.equal(consumeRateLimit('test', now + 600001), true);
assert.equal(plainCopy('Step 1 - Choose'), 'Step 1: Choose');
assert.equal(plainCopy('Your website — built for you'), 'Your website: built for you');
assert.equal(plainCopy('E-commerce and role-based access'), 'E-commerce and role-based access');
assert.equal(plainCopy('https://ctc-myanmar.vercel.app'), 'https://ctc-myanmar.vercel.app');
const retained = new Set(['6', '58', '100%', 'QuickBooks', 'Zoho Books', 'Odoo']);
let fields = 0;
function inspect(value, location = 'content') {
  if (!value || typeof value !== 'object') return;
  if (typeof value.en === 'string') {
    if (value.en && !retained.has(value.en)) {
      assert.ok(value.my && value.my.trim(), `Missing Burmese copy: ${location}: ${value.en}`);
      assert.ok(Object.hasOwn(MY_COPY, value.en), `Copy must be explicitly written, including retained English terms: ${value.en}`);
      fields++;
    }
    return;
  }
  for (const [key, item] of Object.entries(value)) inspect(item, `${location}.${key}`);
}
inspect(content);
assert.equal(translateText('Services', 'my'), 'Services');
assert.equal(translateText('Packages', 'my'), 'Packages');
assert.equal(translateText('Add-ons for Websites', 'my'), 'Websites အတွက် Add-ons');
assert.equal(translateText('Browse all 58 services', 'my'), 'Services 58 ခုလုံး ကြည့်ရန်');
assert.equal(translateText('Your road map for Websites', 'my'), 'Websites အတွက် Project အဆင့်ဆင့်');
assert.equal(translateText('Website maintenance', 'my'), 'Website Maintenance');
assert.match(translateText('The right system for how your team really works.', 'my'), /System/);
assert.equal(translate({ en: 'Services', my: 'ဝန်ဆောင်မှုများ' }, 'my'), 'Services');
assert.equal(translate({ en: 'Website maintenance', my: previousMyanmar['Website maintenance'] }, 'my'), 'Website Maintenance');
assert.equal(translate({ en: 'Services', my: 'မိမိရေးထားသော အကြောင်းအရာ' }, 'my'), 'မိမိရေးထားသော အကြောင်းအရာ');
assert.equal(content.services.reduce((total, s) => total + s.offerings.length, 0), 58);
assert.ok(fields > 800, `Expected complete long-form copy, found ${fields} fields`);
for (const message of ['Sending...', 'Booking...', 'Saving...', 'Message sent. We reply within 2 working days.', 'That time was just taken. Pick another slot.', 'We could not send this right now. Please email info@ctcmyanmar.com and we will help.']) {
  assert.match(MY_COPY[message], /[\u1000-\u109f]/, `Missing form feedback: ${message}`);
}
assert.match(formatDate('2026-11-23T00:00:00+06:30', 'my', { weekday: 'short', day: 'numeric', month: 'short' }), /^တနင်္လာ,? ၂၃ နိုဝင်ဘာ$/);
assert.equal(formatDate('2026-11-22T20:00:00Z', 'my', { day: 'numeric' }), '၂၃');
assert.match(formatDate('2026-11-23T00:00:00+06:30', 'en', { weekday: 'short', day: 'numeric', month: 'short' }), /^Mon,? 23 Nov$/);
console.log(`Verified ${fields} content fields across Burmese, Thai and Chinese; all 58 services; language URLs; form feedback; dates; origin validation; and submission throttling.`);
