class Api::V1::RestaurantsController < ApiController

  def show
    search_restaurant_hash = YelpService.business(params[:id])
    reviews = Review.where(yelp_restaurant_id: params[:id])

    render json: {
      restaurant: search_restaurant_hash,
      current_user: current_user,
      reviews: ActiveModelSerializers::SerializableResource.new(reviews, each_serializer: ReviewSerializer, scope: current_user)
    }
  end

  def search
    
    search_result_hash = YelpService.search(search_params[:location], search_params[:item])
    search_result_restaurants_array = search_result_hash["businesses"]

    if !search_result_restaurants_array.nil?
      returned_restaurant = search_result_restaurants_array.sample(4)
      
      restaurant_featured = returned_restaurant[0]
      restaurant_others = returned_restaurant[1..-1]
      render json: { restaurant_featured: restaurant_featured, restaurant_others: restaurant_others }
    else
      render json: search_result_hash["error"], status: 404
    end
  end

  private

  def search_params
    params.require(:restaurant).permit(:location,:item)
  end
  
end

