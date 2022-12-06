class UserSerializer < ActiveModel::Serializer
  attributes :id, :profile_photo, :email, :username

  has_many :reviews
end