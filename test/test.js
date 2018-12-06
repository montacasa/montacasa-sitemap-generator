/* global describe it */
const fs = require('fs');
const {assert, expect} = require('chai');

const main = require('../src/main');
const validator = require('../src/validator');
const uniq = require('../src/uniq');
const generator = require('../src/generator');
const counter = require('../src/counter');
const calculator = require('../src/calculator');
const single = require('../src/single');
const urler = require('../src/urler');
const pager = require('../src/pager');
const sitemapFormater = require('../src/sitemap-formater');
const writer = require('../src/writer');
const reader = require('../src/reader');

const dummy = './test/dummy';

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
          const filepath = './test/sitemap.xml';
          await list({urls: [0, 1, 2, 3], filepath});
          const read = await reader(filepath);
          const expected = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>0</loc></url><url><loc>1</loc></url><url><loc>2</loc></url><url><loc>3</loc></url></urlset>'; // eslint-disable-line max-len
          assert.equal(read, expected);
        });
        it('should return a message for a single file', async () => {
          const filepath = './test/sitemap.xml';
          const test = await list({urls: [0, 1, 2, 3], filepath});
          const message = 'DONE! One single sitemap generated with 4 links.';
          assert.equal(test, message);
        });
      });
    });
  });

  describe('misc', () => {
    // reader
    describe('file reader', () => {
      it('should be a function', () => {
        assert.typeOf(reader, 'function');
      });
    });
    // writer
    describe('file writer', () => {
      it('should be a function', () => {
        assert.typeOf(writer, 'function');
      });
      it('should write a file', async () => {
        const file = 'this is a file';
        const filepath = './test/file';
        const message = 'DONE';
        await writer({file, filepath, message});
        const read = await reader(filepath);
        assert.equal(read, file);
      });
      it('should resolve after writing a file file', async () => {
        const file = 'test';
        const filepath = './test/file';
        const message = 'DONE';
        const write = await writer({file, filepath, message});
        assert.equal(write, 'DONE');
      });
    });

    // sitemap formater
    describe('sitemap formater', () => {
      it('should be a function', () => {
        assert.typeOf(sitemapFormater, 'function');
      });
      it('should format a sitemap', () => {
        const urls = ['link1', 'link2'];
        const sitemap = sitemapFormater(urls);
        const expected =
          '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>link1</loc></url><url><loc>link2</loc></url></urlset>'; // eslint-disable-line max-len
        assert.equal(sitemap, expected);
      });
    });

    // single
    describe('single file generator', () => {
      it('should be a function', () => {
        assert.typeOf(single, 'function');
      });
    });

    // urler
    describe('url generator', () => {
      it('should be a function', () => {
        assert.typeOf(urler, 'function');
      });
      it('should generate a sitemap loc url', () => {
        const url = urler('link1');
        const result = '<url><loc>link1</loc></url>';
        assert.equal(url, result);
      });
      // it('should generate a list of sitemap pages', () => {
      //   const pages = pager(['link1', 'link2']);
      //   const result =
      //     '<url><loc>link1</loc></url> <url><loc>link2</loc></url> ';
      //   assert.equal(pages, result);
      // });
    });

    // pager
    describe('pages generator', () => {
      it('should be a function', () => {
        assert.typeOf(urler, 'function');
      });
      it('should generate a single list of sitemap pages', () => {
        const pages = pager([
          '<url><loc>link1</loc></url>',
          '<url><loc>link2</loc></url>',
        ]);
        const result =
          '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>link1</loc></url><url><loc>link2</loc></url></urlset>'; // eslint-disable-line max-len
        assert.equal(pages, result);
      });
    });

    // calculator
    describe('calculator', () => {
      it('should be a function', () => {
        assert.typeOf(calculator, 'function');
      });
      it('should calculate number of sitemaps to generate', () => {
        const max = 3;
        const quantity = 9;
        const calculate = calculator({max, quantity});
        assert.deepEqual(calculate, 3);
      });
    });

    // counter
    describe('counter', () => {
      it('should be a function', () => {
        assert.typeOf(counter, 'function');
      });
      it('should count the number of items on a list', () => {
        const list = counter([1, 2, 3]);
        assert.deepEqual(list, 3);
      });
      it('should count the number of items on a file', async () => {
        const result = await counter(dummy);
        assert.equal(result, 3);
      });
    });

    // uniq
    describe('uniq', () => {
      it('should be a function', () => {
        assert.typeOf(uniq, 'function');
      });
      it('should remove duplicates', () => {
        const list = uniq([1, 1, 2, 3]);
        assert.deepEqual(list, [1, 2, 3]);
      });
    });

    // validator
    describe('validator', () => {
      it('should be a function', () => {
        assert.typeOf(validator, 'function');
      });
      it('should validate missing list of urls', () => {
        const error = 'You must provide a list of urls!';
        expect(() => validator({})).to.throw(error);
      });
      it('should validate present list of urls', () => {
        const validate = validator({urls: ['string']});
        assert.isTrue(validate);
      });
      it('should validate if urls variable is an array', () => {
        const error = 'Urls list variable should be an array!';
        expect(() => validator({urls: 'string'})).to.throw(error);
      });
      it('should validate if file variable is a string', () => {
        const error = 'File variable should be a string!';
        expect(() => validator({file: 'string'})).to.throw(error);
      });
    });
  });
});
