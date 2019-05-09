class User < ApplicationRecord
  has_secure_password
  
  belongs_to :household, optional: true
  has_many :items

<<<<<<< HEAD
  has_secure_password
=======
  
>>>>>>> ac68ee5f33b1f066ddf0364bc202a427ca57591b
  # validates :password, length: {minimum: 1}, if: -> { new_record? || !password.nil? }
  validates :name, presence: true
end
