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
    if YelpService::API_KEY.to_s.strip.empty?
      render json: { error: "Yelp API key is missing. Set YELP_API_KEY in your environment." }, status: 503
      return
    end

    search_result_hash = YelpService.search(search_params[:location], search_params[:item])
    search_result_restaurants_array = search_result_hash["businesses"]

    if search_result_restaurants_array.present?
      returned_restaurant = search_result_restaurants_array.sample(4)
      
      restaurant_featured = returned_restaurant[0]
      restaurant_others = returned_restaurant[1..-1]
      render json: { restaurant_featured: restaurant_featured, restaurant_others: restaurant_others }
    elsif search_result_hash["error"].present?
      upstream_message =
        search_result_hash.dig("error", "description") ||
        search_result_hash.dig("error", "code") ||
        "Restaurant search is temporarily unavailable."
      render json: { error: upstream_message }, status: 502
    else
      render json: { error: "No restaurants found for that search." }, status: 404
    end
  end

  private

  def search_params
    params.require(:restaurant).permit(:location,:item)
  end
  
end
