import 'dotenv/config'
import axios from "axios"
import { load } from "cheerio"
import { CityGroup, TMovieScrape, TShowing } from './types'
import theaterScraper from './theaterScrapes'
import { queryPage } from './theaterScrapes/utils'

const URL = process.env['TARGET_URL']

async function getTotalPages(): Promise<number> {
  const html = await queryPage(`${URL}/1`)
  const $ = load(html)

  const lastPage = parseInt($('.paginate-pages li:last-child a').text(), 10)

  return isNaN(lastPage) ? 1 : lastPage
}

async function scrapeLetterboxdWatchlist(pageNumber: number): Promise<TMovieScrape[]> {
  const response = await axios.get(`${URL}/${pageNumber}`)
  const html = response.data
  const $ = load(html)

  const results: TMovieScrape[] = []

  $('.film-poster').each((_, element) => {
    const slug = $(element).attr('data-film-slug')
    let title = $(element).find('img').attr('alt')
    if (!slug || !title) {
      const msg = `unable to parse page ${pageNumber}`
      throw Error(msg)
    }

    const movie: TMovieScrape = { title, slug }
    const possibleReleaseYear = parseInt(slug.slice(slug.length - 4), 10)
    if (!isNaN(possibleReleaseYear)) {
      movie.year = possibleReleaseYear
    }

    results.push(movie)
  })

  return results
}

async function scrapeTheaters(searchCity: CityGroup, movies: TMovieScrape[]): Promise<TShowing[]> {
  let results: TShowing[] = []
  switch (searchCity) {
    case 'nyc':
      results = await theaterScraper.nyc(movies)
      break;
    case 'bos':
      throw new Error('not yet implemented')
      break;
    default:
      throw new Error('no city selected')
      break;
  }

  return results
}

async function main() {
  const totalPages = await getTotalPages()
  let pageNumber = totalPages

  const allMovies: TMovieScrape[] = []

  while (pageNumber >= 1) {
    const set = await scrapeLetterboxdWatchlist(pageNumber)
    allMovies.push(...set)
    pageNumber -= 1
  }

  console.log(allMovies.length)
  const showings = await scrapeTheaters('nyc', allMovies)
}

main()
