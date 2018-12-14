/* global describe it __dirname */
const {assert, expect} = require('chai');

const validator = require('../src/validator');
const uniq = require('../src/uniq');
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
const urlsGenerator = require('../src/urls-generator');
const sitemapsWriter = require('../src/sitemaps-writer');
const indexGenerator = require('../src/index-generator');
const fileLineReader = require('../src/file-line-reader');

// Mocks
const aParcialSitemap = require(`${__dirname}/mocks/a-parcial-sitemap`);
const aCompleteSitemap = require(`${__dirname}/mocks/a-complete-sitemap`);
const aSitemapIndex = require('./mocks/a-sitemapindex');
const aSmallListOfLinks = require(`${__dirname}/mocks/a-small-list-of-links`);

describe('misc', () => {
  // file line reader
  describe('file line reader', () => {
    it('should be a function', () => {
      assert.typeOf(fileLineReader, 'function');
    });
    it('should read each line and execute a function', async () => {
      const arr = [];
      const func = data => {
        arr.push(data);
      };
      const dummy = './test/mocks/dummy';
      await fileLineReader(dummy, func);
      const expected = ['0', '1', '2'];
      assert.deepEqual(arr, expected);
    });
  });

  // index generator
  describe('index generator', () => {
    it('should be a function', () => {
      assert.typeOf(indexGenerator, 'function');
    });
  });

  // sitemaps writer
  describe('sitemaps writer', () => {
    it('should be a function', () => {
      assert.typeOf(sitemapsWriter, 'function');
    });
    it('should write a sitemap', async () => {
      const list = urlsGenerator(aSmallListOfLinks);
      await sitemapsWriter({
        list,
        filepath: './test/files/sitemap-0.xml',
      });
      const read = await reader('./test/files/sitemap-0.xml');
      const result = read.replace(/(\r\n\t|\n|\r\t)/gm, '').replace(/\s/g, '');
      const xml = aCompleteSitemap;
      const expected = xml.replace(/(\r\n\t|\n|\r\t)/gm, '').replace(/\s/g, '');
      assert.equal(result, expected);
    });
  });

  // urls generator
  describe('urls generator', () => {
    it('should be a function', () => {
      assert.typeOf(urlsGenerator, 'function');
    });
    it('should generate a list of urls parsed by urler', () => {
      const urls = ['www.example.com/link/1', 'www.example.com/link/2'];
      const pages = urlsGenerator(urls)
        .replace(/(\r\n\t|\n|\r\t)/gm, '')
        .replace(/\s/g, '');
      const xml =
        '<url><loc>www.example.com/link/1</loc></url><url><loc>www.example.com/link/2</loc></url>';
      const expected = xml.replace(/(\r\n\t|\n|\r\t)/gm, '').replace(/\s/g, '');
      assert.equal(pages, expected);
    });
  });

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
        filepath: './test/files/sitemap.xml',
      });
      const {fullPath, path, name} = config;
      const expectedName = 'sitemap-1.xml';
      assert.equal(name, expectedName);
      assert.equal(fullPath, `${domain}/${expectedName}`);
      assert.equal(path, './test/files');
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
      const filepath = './test/files/file';
      const message = 'DONE';
      await writer({file, filepath, message});
      const read = await reader(filepath);
      assert.equal(read, file);
    });
    it('should resolve after writing a file file', async () => {
      const file = 'test';
      const filepath = './test/files/file';
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
      const sitemap = sitemapFormater(urls)
        .replace(/(\r\n\t|\n|\r\t)/gm, '')
        .replace(/\s/g, '');
      const xml =
        '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>link1</loc></url><url><loc>link2</loc></url></urlset>'; // eslint-disable-line max-len
      const expected = xml.replace(/(\r\n\t|\n|\r\t)/gm, '').replace(/\s/g, '');
      assert.equal(sitemap, expected);
    });
  });
  // multiple
  describe('multiple file generator', () => {
    it('should be a function', () => {
      assert.typeOf(multiple, 'function');
    });
    it('should generate multiple sitemaps', async () => {
      const filepath = './test/files/sitemap.xml';
      await multiple({
        urls: aSmallListOfLinks,
        count: 6,
        quantity: 3,
        filepath,
      });
      const read = await reader('./test/files/sitemap-0.xml');
      const result = read.replace(/(\r\n\t|\n|\r\t)/gm, '').replace(/\s/g, '');
      const expected = aParcialSitemap
        .replace(/(\r\n\t|\n|\r\t)/gm, '')
        .replace(/\s/g, '');
      assert.equal(result, expected);
    });
    it('should generate an index sitemap', async () => {
      const filepath = './test/files/sitemap.xml';
      await multiple({
        urls: aSmallListOfLinks,
        count: 6,
        quantity: 2,
        filepath,
      });
      const read = await reader(filepath);
      const expected = aSitemapIndex.replace(/(\r\n\t|\n|\r\t)/gm, '');
      assert.equal(read, expected);
    });
    it('should return a message for a multiple file', async () => {
      const filepath = './test/files/sitemap.xml';
      const sitemaps = await multiple({
        urls: aSmallListOfLinks,
        count: 6,
        quantity: 2,
        filepath,
      });
      const message =
        'DONE! 2 sitemaps generated with 6 links and an index sitemap file.';
      assert.equal(sitemaps, message);
    });
  });

  // single
  describe('single file generator', () => {
    it('should be a function', () => {
      assert.typeOf(single, 'function');
    });
    it('should generate a single file', async () => {
      const filepath = './test/files/sitemap.xml';
      await single({urls: ['0', '1', '2', '3'], count: 4, filepath});
      const read = await reader(filepath);
      const result = read.replace(/(\r\n\t|\n|\r\t)/gm, '').replace(/\s/g, '');
      const xml =
        '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>0</loc></url><url><loc>1</loc></url><url><loc>2</loc></url><url><loc>3</loc></url></urlset>'; // eslint-disable-line max-len
      const expected = xml.replace(/(\r\n\t|\n|\r\t)/gm, '').replace(/\s/g, '');
      assert.equal(result, expected);
    });
    it('should return a message for a single file', async () => {
      const filepath = './test/files/sitemap.xml';
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
      const result = '    <url><loc>link1</loc></url>\n';
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
      const result = pages.replace(/(\r\n\t|\n|\r\t)/gm, '').replace(/\s/g, '');
      const xml =
        '<?xml version="1.0" encoding="UTF-8"?>\n  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>link1</loc></url><url><loc>link2</loc></url>  </urlset>'; // eslint-disable-line max-len
      const expected = xml.replace(/(\r\n\t|\n|\r\t)/gm, '').replace(/\s/g, '');
      assert.equal(result, expected);
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
      const dummy = './test/mocks/dummy';
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
      expect(() => validator({file: 1})).to.throw(error);
    });
  });
});
