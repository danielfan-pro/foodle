require "pry"

class Api::V1::RestaurantsController < ApiController

  def show
    search_restaurant_hash = YelpService.business(params[:id])
    render json: {restaurant: search_restaurant_hash}
  end

  def search
    # yelp search is limited to 20 results, it's a hash with key 'businesses' and value of arrays
    search_result_hash = YelpService.search(search_params[:location], search_params[:item])
    search_result_restaurants_array = search_result_hash["businesses"]
    
    # randomly choose 4 restaurants from the 20 restaurants in the search result
    
    returned_restaurant = search_result_restaurants_array.sample(4)
    
    restaurant_featured = returned_restaurant[0]
    restaurant_others = returned_restaurant[1..-1]
    
    render json: { restaurant_featured: restaurant_featured, restaurant_others: restaurant_others }
  end

  private

  def search_params
    params.require(:restaurant).permit(:location,:item)
  end

  def restaurant_params
    
  end
  
end

