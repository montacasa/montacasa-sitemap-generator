/* global describe it */
const {assert} = require('chai');

const main = require('../src/main');
const generator = require('../src/generator');
const reader = require('../src/reader');

// Mocks
const aParcialSitemap = require('./mocks/a-parcial-sitemap');
const aSmallListOfLinks = require('./mocks/a-small-list-of-links');
const aCompleteSitemap = require('./mocks/a-complete-sitemap');
const aBiggerSitemapindex = require('./mocks/a-bigger-sitemapindex');

describe('Sitemap Generator', () => {
  // main
  describe('main', () => {
    it('should be a function', () => {
      assert.typeOf(main, 'function');
    });
    it('should pass with valid options', () => {
      const validate = main({urls: ['string']});
      assert.isOk(validate);
    });
  });

  // generator
  describe('generator', () => {
    it('should be an object', () => {
      assert.typeOf(generator, 'object');
    });

    // prepare variables
    const {file, list} = generator;

    // file
    describe('file', () => {
      it('should be a function', () => {
        assert.typeOf(file, 'function');
      });
      describe('single file', () => {
        it('should generate a single file', async () => {
          const filepath = './test/files/sitemap.xml';
          await file({filepath, file: './test/mocks/some-links-file'});
          const read = await reader(filepath);
          const expected = aCompleteSitemap.replace(/(\r\n\t|\n|\r\t)/gm, '');
          assert.equal(read, expected);
        });
        it('should return a message for a single file', async () => {
          const filepath = './test/files/sitemap.xml';
          const test = await list({urls: [0, 1, 2, 3], filepath});
          const message = 'DONE! One single sitemap generated with 4 links.';
          assert.equal(test, message);
        });
      });
      describe('multiple files', () => {
        it('should generate a sitemap index', async () => {
          const filepath = './test/files/sitemap.xml';
          await file({
            filepath,
            file: './test/mocks/a-half-million-links-file',
          });
          const read = await reader(filepath);
          const expected = aBiggerSitemapindex.replace(
            /(\r\n\t|\n|\r\t)/gm,
            '',
          );
          assert.equal(read, expected);
        });
        it('should return a message for a single file', async () => {
          const filepath = './test/files/sitemap.xml';
          const test = await list({urls: [0, 1, 2, 3], filepath});
          const message = 'DONE! One single sitemap generated with 4 links.';
          assert.equal(test, message);
        });
      });
    });

    // list
    describe('list', () => {
      it('should be a function', () => {
        assert.typeOf(list, 'function');
      });
      describe('single file', () => {
        it('should generate a single file', async () => {
          const filepath = './test/files/sitemap.xml';
          await list({urls: [0, 1, 2, 3], filepath});
          const read = await reader(filepath);
          const expected =
            '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>0</loc></url><url><loc>1</loc></url><url><loc>2</loc></url><url><loc>3</loc></url></urlset>'; // eslint-disable-line max-len
          assert.equal(read, expected);
        });
        it('should return a message for a single file', async () => {
          const filepath = './test/files/sitemap.xml';
          const test = await list({urls: [0, 1, 2, 3], filepath});
          const message = 'DONE! One single sitemap generated with 4 links.';
          assert.equal(test, message);
        });
      });
      describe('multiple files', () => {
        it('should generate multiple sitemaps', async () => {
          const filepath = './test/files/sitemap.xml';
          await list({
            urls: aSmallListOfLinks,
            filepath,
            max: 2,
          });
          const read = await reader('./test/files/sitemap-0.xml');
          const expected = aParcialSitemap.replace(/(\r\n\t|\n|\r\t)/gm, '');
          assert.equal(read, expected);
        });
        it('should return a message for a multiple file', async () => {
          const filepath = './test/files/sitemap.xml';
          const sitemaps = await list({
            urls: aSmallListOfLinks,
            max: 2,
            filepath,
          });
          const message =
            'DONE! 3 sitemaps generated with 6 links and an index sitemap file.';
          assert.equal(sitemaps, message);
        });
      });
    });
  });
});
