class User < ApplicationRecord
  belongs_to :household
  has_many :items
end
