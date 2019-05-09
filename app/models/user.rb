class User < ApplicationRecord
  belongs_to :household, optional: true
  has_many :items

  has_secure_password
  # validates :password, length: {minimum: 1}, if: -> { new_record? || !password.nil? }
  validates :name, presence: true
end
