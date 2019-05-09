class User < ApplicationRecord
  has_secure_password
  
  belongs_to :household, optional: true
  has_many :items

  
  # validates :password, length: {minimum: 1}, if: -> { new_record? || !password.nil? }
  validates :name, presence: true
end
