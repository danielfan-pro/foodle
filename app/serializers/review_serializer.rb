class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :description, :rating, :title, :photo, :created_at, :yelp_restaurant_id, :display_action_buttons, :yelp_restaurant_name, :review_likes

  def photo 
    if object.photo.blank? 
      return nil
    else 
      object.photo.url
    end
  end

  def created_at
    object.created_at.strftime("%b %d %Y")
  end

  def display_action_buttons
    if scope == object.user
      return "show"
    else 
      return "hide"
    end
  end

  def yelp_restaurant_name
    return YelpService.business(object.yelp_restaurant_id)["name"]
  end

  def review_likes
    # object.review_likes
    object.review_likes.count
  end

  # def liked_by_current_user?
  #   # need scope here for current_user
  #   # likes = object.review_likes.where(user_id: current_user.id).count
  #   return likes > 0
  # end

  belongs_to :user
end
