/* global describe it */
const {assert, expect} = require('chai');

const main = require('../src/main');
const validator = require('../src/validator');
const uniq = require('../src/uniq');
const generator = require('../src/generator');
const counter = require('../src/counter');
const calculator = require('../src/calculator');
const single = require('../src/single');
const multiple = require('../src/multiple');
const urler = require('../src/urler');
const pager = require('../src/pager');
const sitemapFormater = require('../src/sitemap-formater');
const writer = require('../src/writer');
const reader = require('../src/reader');
const domainExtractor = require('../src/domain-extractor');
const fileConfigurator = require('../src/file-configurator');
const linkReader = require('../src/link-reader');

// Mocks
const aParcialSitemap = require('./mocks/a-parcial-sitemap');
const aSitemapIndex = require('./mocks/a-sitemapindex');
const aSmallListOfLinks = require('./mocks/a-small-list-of-links');

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
          const expected =
            '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>0</loc></url><url><loc>1</loc></url><url><loc>2</loc></url><url><loc>3</loc></url></urlset>'; // eslint-disable-line max-len
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
    // link reader
    describe('link reader', () => {
      it('should be a function', () => {
        assert.typeOf(linkReader, 'function');
      });
    });

    // file configurator
    describe('file configurator', () => {
      it('should be a function', () => {
        assert.typeOf(fileConfigurator, 'function');
      });
      it("should return sitemap file's name and path", () => {
        const domain = 'https://www.example.com';
        const config = fileConfigurator({
          number: 1,
          domain,
          filepath: './test/sitemap.xml',
        });
        const {fullPath, path, name} = config;
        const expectedName = 'sitemap-1.xml';
        assert.equal(name, expectedName);
        assert.equal(fullPath, `${domain}/${expectedName}`);
        assert.equal(path, './test');
      });
    });

    // domain extractor
    describe('domain extractor', () => {
      it('should be a function', () => {
        assert.typeOf(domainExtractor, 'function');
      });
      it('should extract a domain', () => {
        const domain = domainExtractor('https://www.domain.com/xyz');
        const expected = 'https://www.domain.com';
        assert.equal(domain, expected);
      });
    });

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
    // multiple
    describe('multiple file generator', () => {
      it('should be a function', () => {
        assert.typeOf(multiple, 'function');
      });
      it('should generate multiple sitemaps', async () => {
        const filepath = './test/sitemap.xml';
        await multiple({
          urls: aSmallListOfLinks,
          count: 2,
          quantity: 3,
          filepath,
        });
        const read = await reader('./test/sitemap-0.xml');
        const expected = aParcialSitemap.replace(/(\r\n\t|\n|\r\t)/gm, '');
        assert.equal(read, expected);
      });
      it('should generate an index sitemap', async () => {
        const filepath = './test/sitemap.xml';
        await multiple({
          urls: aSmallListOfLinks,
          count: 2,
          quantity: 3,
          filepath,
        });
        const read = await reader(filepath);
        const expected = aSitemapIndex.replace(/(\r\n\t|\n|\r\t)/gm, '');
        assert.equal(read, expected);
      });
      it('should return a message for a multiple file', async () => {
        const filepath = './test/sitemap.xml';
        const sitemaps = await multiple({
          urls: aSmallListOfLinks,
          count: 3,
          quantity: 2,
          filepath,
        });
        const message =
          'DONE! 3 sitemaps generated with 6 links and an index sitemap file.';
        assert.equal(sitemaps, message);
      });
    });

    // single
    describe('single file generator', () => {
      it('should be a function', () => {
        assert.typeOf(single, 'function');
      });
      it('should generate a single file', async () => {
        const filepath = './test/sitemap.xml';
        await single({urls: [0, 1, 2, 3], count: 4, filepath});
        const read = await reader(filepath);
        const expected =
          '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>0</loc></url><url><loc>1</loc></url><url><loc>2</loc></url><url><loc>3</loc></url></urlset>'; // eslint-disable-line max-len
        assert.equal(read, expected);
      });
      it('should return a message for a single file', async () => {
        const filepath = './test/sitemap.xml';
        const sitemap = await single({urls: [0, 1, 2, 3], count: 4, filepath});
        const message = 'DONE! One single sitemap generated with 4 links.';
        assert.equal(sitemap, message);
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
      it('should calculate number of sitemaps to generate with default max', () => {
        const quantity = 200000;
        const calculate = calculator({quantity});
        assert.deepEqual(calculate, 4);
      });
      it('should round up a float result', () => {
        const max = 2;
        const quantity = 7;
        const calculate = calculator({max, quantity});
        assert.deepEqual(calculate, 4);
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
        const dummy = './test/dummy';
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
