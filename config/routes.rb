Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  get '/restaurants', to: 'homes#index'
  get '/restaurants/:id/reviews/new', to: 'homes#index'
  get '/restaurants/:id', to: 'homes#index'
  get '/u/:username', to: 'homes#index'
  get '/recipes', to: 'homes#index'
  get '/recipes/:id', to: 'homes#index'
  
  namespace :api do
    namespace :v1 do
      resources :users, only: [:show]
      resources :restaurants, only: [:show] do
        resources :reviews, only: [:create]
      end
      post '/restaurants/search', to: 'restaurants#search'
      post '/recipes/search', to: 'recipes#search'
      resources :reviews, only: [:update, :destroy] do
        resources :review_likes, only: [:create]
      end
      resources :recipes, only: [:show]
    end
  end

end

# Future work for liked restaurant
# POST api/v1/reviews/1/review_likes
# params - review id
# controller - current_user