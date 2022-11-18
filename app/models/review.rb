class Review < ApplicationRecord
  validates :title, presence: true
  validates :rating, presence: true

  belongs_to :user

  mount_uploader :photo, ReviewPhotoUploader
end