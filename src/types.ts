export type TMovieScrape = {
  slug: string
  title: string
  year?: number
}

export interface TShowing extends Omit<TMovieScrape, 'slug'> {
  firstShowingDate: string
}

export type CityGroup = 'nyc' | 'bos'
