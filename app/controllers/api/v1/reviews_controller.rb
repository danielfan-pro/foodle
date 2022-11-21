class Api::V1::ReviewsController < ApiController
  before_action :authenticate_user, only: [:create]
  skip_before_action :verify_authenticity_token

  def create
  review = Review.new(review_params)
  review.user = current_user

    if review.save
      render json: review
    else
      render json: {errors: review.errors.full_messages.to_sentence}
    end

  end

  private
  def review_params
    params.permit(:title, :description, :rating, :photo, :yelp_restaurant_id)
  end

end