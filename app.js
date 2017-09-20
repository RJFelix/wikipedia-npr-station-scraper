const fs = require('fs');

const scrapeStation = require('./scrape-station.js');
const scrapeStationList = require('./scrape-station-list.js');

scrapeStationList('https://en.wikipedia.org/wiki/List_of_NPR_stations')
  .then(list => Promise.all(list.map(scrapeStation)))
  .then(stationList => {
    fs.writeFile('npr.tsv', stationList.reduce((str, station) => {
      return `${str}${station.name}\t${station.city}\t${station.link}\n`
    }, ''))
  })
  .then(() => console.log('Finished scraping NPR station data.'));
