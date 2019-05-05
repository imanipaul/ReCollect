class User < ApplicationRecord
  belongs_to :household
  has_many :items

  has_secure_password
  validates :password, length: {minimum: 4}, if: -> { new_record? || !password.nil? }
  validates :name, presence: true
end
