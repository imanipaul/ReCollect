class Household < ApplicationRecord
    has_many :users
    has_many :items, through: :users
end
