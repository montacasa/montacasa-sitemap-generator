# Montacasa Sitemap Generator

THIS IS A WORK IN PROGRESS

Montacasa's frontend sitemap generator.

Generates a sitemap.xml from a given list of links.

It can also generate multiple sitemaps and a sitemap index file, if the number
of links exceeds the maximum per sitemap.

## Usage

- Install the package with `npm i @montacasa/sitemap-generator`.
- And run the generator script with a list of links, either a variable (array)
or a file, containing one link per line.

### With a variable

```
const generator = require('@montacasa/sitemap-generator');

const urls = ["https://www.example.com/path/1", "https://www.example.com/path/2", "https://www.example.com/path/3" ];

const filepath = './sitemap.xml'; // this is the default value
const domain = 'https://www.example.com';
const message = await generator({domain, filepath, file});
console.info(message); // 'DONE! One single sitemap generated with 3 links.'
```
