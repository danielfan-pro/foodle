Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users

  get '/restaurants', to: 'homes#index'
  
  namespace :api do
    namespace :v1 do
      post '/restaurants/search', to: 'restaurants#search'
    end
  end

end
