# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user_admin = User.create(
  email: "admin@email.com",
  password: ENV["ADMIN_PASSWORD"],
  username: "admin",
  role: "admin"
)

user_1 = User.create(
  email: "user1@email.com",
  password: ENV["USER1_PASSWORD"],
  username: "User1",
  role: "member"
)

user_2 = User.create(
  email: "user2@email.com",
  password: ENV["USER2_PASSWORD"],
  username: "User2",
  role: "member"
)

review_1 = Review.find_or_create_by(
  title: "Biang Biang Noodle",
  description: "Delicious Spicy Noodle",
  rating: 5,
  user_id: 1,
  yelp_restaurant_id: "Khek1DXE1b9jPRSQkKLdhQ"
)

review_2 = Review.find_or_create_by(
  title: "Pork Stew Rougamo",
  description: "Taste so good!",
  rating: 5,
  user_id: 2,
  yelp_restaurant_id: "Khek1DXE1b9jPRSQkKLdhQ"
)
