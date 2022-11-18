require "json"
require "dotenv"
require "http"
require "optparse"

Dotenv.load

class YelpService

API_HOST = "https://api.yelp.com"
SEARCH_PATH = "/v3/businesses/search"
BUSINESS_PATH = "/v3/businesses/"
SEARCH_LIMIT = 20

API_KEY = ENV["YELP_API_KEY"]

def self.search(location = 'Boston, MA', term = 'pizza')
  url = "#{API_HOST}#{SEARCH_PATH}"
  params = {
    location: location,
    term: term,
    limit: SEARCH_LIMIT
  }

  response = HTTP.auth("Bearer #{API_KEY}").get(url, params: params)
  response.parse
end

def self.business(business_id)
  url = "#{API_HOST}#{BUSINESS_PATH}#{business_id}"

  response = HTTP.auth("Bearer #{API_KEY}").get(url)
  response.parse
end

end