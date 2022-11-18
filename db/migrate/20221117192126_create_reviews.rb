class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.string :title, null: false
      t.string :description
      t.string :photo
      t.integer :rating, null: false
      t.belongs_to :user, null: false

      t.timestamps
    end
  end
end
