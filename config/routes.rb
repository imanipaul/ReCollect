Rails.application.routes.draw do
  resources :items
  resources :categories
  resources :users

  resources :households do
    resources :users do
      resources :items
    end
  end

  resources :categories do
    resources :items
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
