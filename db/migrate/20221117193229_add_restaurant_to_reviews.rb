class AddRestaurantToReviews < ActiveRecord::Migration[5.2]
  def change
    add_column :reviews, :yelp_restaurant_id, :string
    add_index :reviews, :yelp_restaurant_id
  end
end
