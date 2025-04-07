import scrapeBos from './bos';
import scrapeNyc from './nyc';

const theaterScraper = {
  /** Searches the provided movies against theaters in New York City. */
  nyc: scrapeNyc,
  /** Searches the provided movies against theaters in Boston. */
  bos: scrapeBos,
}

export default theaterScraper
