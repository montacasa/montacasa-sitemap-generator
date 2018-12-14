# Sitemap Generator

Generates a **sitemap.xml** from a given list of links.

It can also generate multiple sitemaps and a sitemap index file, if the number
of links exceeds the maximum per sitemap.

## Usage

- Install the package with `npm i @montacasa/sitemap-generator`.
- And run it with a list of links - either a variable of type array or a file
containing one link per line.

### Example with a variable

```
  const generator = require('@montacasa/sitemap-generator');

  // Define the sitemap urls
  const urls = [
    "https://www.example.com/path/1",
    "https://www.example.com/path/2",
    "https://www.example.com/path/3"
  ];

  // ..and some other options
  const filepath = './src/sitemap.xml';
  const domain = 'https://www.example.com';

  // Create an async function
  const sitemap = async() => {
    const message = await generator({domain, filepath, urls});
    console.info(message);
  }

  // Generate!
  sitemap(); // 'DONE! One single sitemap generated with 3 links.'
```

## Options

### urls

  An array of links. Optional.

  E.g.:

  ```js
    [
      "https://www.example.com/path/1",
      "https://www.example.com/path/2",
      "https://www.example.com/path/3",
      // ...
    ]
  ```

### file

  A file path for a list of links. Optional.

  E.g.: `./urls` containing:

  ```
  "https://www.example.com/path/1"
  "https://www.example.com/path/2"
  "https://www.example.com/path/3"
  ...
  ```

### max

  The maximum number of links per sitemap. Optional, default is 50.000
  according to [sitemaps.org FAQ](https://www.sitemaps.org/faq.html#faq_sitemap_size).

### filepath

  The path to which the generator should write the sitemap(s). Optional,
  default is `./sitemap.xml`.

### domain

  Optional. If not provided, the domain is extracted from the first link in
  the links list (either the file or array).

  The `domain` is to be used in the sitemap index file. E.g.:

  ```
  <?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
      <loc>https://www.example.br/sitemap-0.xml</loc>
    </sitemap>
    <sitemap>
      <loc>https://www.example.br/sitemap-1.xml</loc>
    </sitemap>
    <sitemap>
      <loc>https://www.example.br/sitemap-2.xml</loc>
    </sitemap>
  </sitemapindex>
  ```

---

### List of links

#### Both `urls` and `file` are optional, but you must provide either one or another!

If both `urls` and `file` are provided, `file` will prevail over `urls`.

### Multiple sitemaps

If the number of links in `urls` or `file` is higher then `max`, the sitemap will be split in
as many sitemaps as needed at the same dir, and a sitemap index will be created at
`filepath`.

In that case, supposing you are using default values, **sitemap.xml** would be the sitemap index and the sitemaps would
be named **sitemap-0.xml**,  **sitemap-1.xml** and so on, with maximum 50k links each. (See example above.)
