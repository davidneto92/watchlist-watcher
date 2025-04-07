import type { TMovieScrape, TShowing } from '../../types'
import scrapeFilmForum from './nyFilmForum'

const scrapeNyc = async (movies: TMovieScrape[]): Promise<TShowing[]> => {
  // import each theater
  const results: TShowing[] = []

  results.push(...await scrapeFilmForum())

  return results
}

export default scrapeNyc
