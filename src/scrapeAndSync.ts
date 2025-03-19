import 'dotenv/config'
import axios from "axios"
import { load } from "cheerio"
import { TMovieScrape } from './types'

const URL = process.env['TARGET_URL']

async function getTotalPages(): Promise<number> {
  const response = await axios.get(`${URL}/1`)
  const html = response.data
  const $ = load(html)

  const lastPage = parseInt($('.paginate-pages li:last-child a').text(), 10)

  return isNaN(lastPage) ? 1 : lastPage
}

async function scrapePage(pageNumber: number): Promise<TMovieScrape[]> {
  const response = await axios.get(`${URL}/${pageNumber}`)
  const html = response.data
  const $ = load(html)

  const results: TMovieScrape[] = []

  $('.film-poster').each((_, element) => {
    const slug = $(element).attr('data-film-slug')
    let displayName = $(element).find('img').attr('alt')
    if (!slug || !displayName) {
      const msg = `unable to parse page ${pageNumber}`
      throw Error(msg)
    }
    results.push({ displayName, slug })
  })

  return results
}

async function main() {
  const totalPages = await getTotalPages()
  let pageNumber = totalPages

  const allSets = []

  while (pageNumber >= 1) {
    const set = await scrapePage(pageNumber)
    allSets.push(...set)
    pageNumber -= 1
  }

  // console.log(allSets.length)
}

main()
