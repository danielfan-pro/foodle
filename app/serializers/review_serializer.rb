class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :description, :rating, :title, :photo, :created_at

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

  belongs_to :user
end
