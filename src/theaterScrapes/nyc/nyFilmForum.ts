import { load } from "cheerio"
import { TShowing } from '../../types'
import { NYC_FILM_FORUM_LISTINGS } from '../../constants'
import { queryPage } from '../utils'

const scrapeFilmForum = async (): Promise<TShowing[]> => {
  const pageHtml = await queryPage(NYC_FILM_FORUM_LISTINGS)
  const $ = load(pageHtml)

  // this finds all listings for Film Forum. Will need to search each string
  // next would be to find the affiliated date
  $('.blue-type').each((_, element) => {
    const text = $(element).prop('innerText')
    console.log({ text })
  })

  return []
}

export default scrapeFilmForum
