class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :description, :rating, :title, :photo, :created_at, :yelp_restaurant_id, :display_action_buttons

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

  belongs_to :user
end
