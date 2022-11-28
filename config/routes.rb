Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  get '/restaurants', to: 'homes#index'
  get '/restaurants/:id/reviews/new', to: 'homes#index'
  get '/restaurants/:id', to: 'homes#index'
  get '/u/:username', to: 'homes#index'
  
  namespace :api do
    namespace :v1 do
      resources :users, only: [:show]
      resources :restaurants, only: [:show] do
        resources :reviews, only: [:create]
      end
      post '/restaurants/search', to: 'restaurants#search'
      resources :reviews, only: [:update, :destroy]
    end
  end

end
