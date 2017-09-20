const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const log = it => {
  console.log(it);
  return it;
}



function scrapeStation(url) {
  let doc;
  let name;
  return JSDOM.fromURL(url)
    .then(jsd => jsd.window.document)
    .then(document => doc = document)
    .then(document => document.querySelector('.fn.org'))
    .then(caption => {
      name = caption.textContent;
      return doc;
    })
    .then(document => document.querySelectorAll('.infobox tr'))
    .then(rowNodes => Array.from(rowNodes))
    .then(rows => ({
      name,
      link: rows.filter(row => row.textContent.includes('Website'))[0].querySelector('a').href,
      city: rows.filter(row => row.textContent.includes('City'))[0].querySelector('td').textContent,
    }))
    .catch(() => ({
      name,
      link: 'error',
      city: 'error',
    }));
}

module.exports = scrapeStation;
