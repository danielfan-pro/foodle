Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  get '/restaurants', to: 'homes#index'
  get '/restaurants/:id', to: 'homes#index'
  get '/maps', to: 'homes#index'
  
  namespace :api do
    namespace :v1 do
      resources :restaurants, only: [:show]
      post '/restaurants/search', to: 'restaurants#search'
    end
  end

end
