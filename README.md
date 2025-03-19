# watchlist-watcher
Collection of scripts to scrape my Letterboxd watchlist, and then find showings for those movies near me.

## MVP

Scrape my watchlist and find listings for oldest 10 movies.

- scrape `https://letterboxd.com/[user]/watchlist/` to get list of movies
  - will need to handle all pages formatted as `[url]/page/2/`
  - should start on last page so the first entries are the oldest db entries
- dump all results into a DB (on first use)
- sync db with scraped list
- search 10 oldest movies against theaters in NYC

## Deployment

This tool can be hosted in AWS. It will feature two `node 22.x` Lambda functions, and the db can be stored in AWS Dynamo.

```shell
src/
  scrapeAndSync # query Letterboxd, parse the HTML, and update Dynamo
  searchMovies # query dynamo db to get specific items, then search
```

## Limitations

- querying +200 movies against multiple theaters gets real big real fast
- may be able to hook into an existing API to query showtimes? Unlikely such APIs are public
- could try hooking into the IMDB API to only query the top rated movies?
  - this would at least be useful for storing some metadata such as ratings
