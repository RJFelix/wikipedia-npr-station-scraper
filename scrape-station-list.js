const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const log = it => {
  console.log(it);
  return it;
}

function scrapeStationList(url) {
  return JSDOM.fromURL(url)
    .then(jsd => jsd.window.document)
    .then(document => document.querySelectorAll('.wikitable'))
    .then(tables => {
      const out = new Array(tables.length);
      for(let i = 0; i < tables.length; i++) {
        out[i] = tables[i].querySelectorAll('tr td:nth-of-type(2) a');
      }
      return out.reduce((arr, elem) => arr.concat(Array.from(elem)), []);
    })
    .then(anchors => anchors.map(a => a.href));
}

module.exports = scrapeStationList;
