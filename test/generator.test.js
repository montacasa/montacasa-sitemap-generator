/* global describe it */
const {assert} = require('chai');

const main = require('../src/main');
const generator = require('../src/generator');
const reader = require('../src/reader');

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
    });
  });
});
