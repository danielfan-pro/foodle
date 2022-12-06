class Review < ApplicationRecord
  validates :title, presence: true
  validates :rating, presence: true

  belongs_to :user

  has_many :review_likes

  mount_uploader :photo, ReviewPhotoUploader
end