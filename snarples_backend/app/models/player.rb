class Player < ApplicationRecord
  has_many :hands
  has_many :games, through: :hands
end
