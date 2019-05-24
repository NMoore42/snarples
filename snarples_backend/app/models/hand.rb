class Hand < ApplicationRecord
  belongs_to :game
  belongs_to :player

  validates :score, presence: true
end
