class CreateReviewLikes < ActiveRecord::Migration[5.2]
  def change
    create_table :review_likes do |t|
      t.belongs_to :user, null: false
      t.belongs_to :review, null: false

      t.timestamps
    end
  end
end