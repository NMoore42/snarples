class CreatePlayers < ActiveRecord::Migration[5.2]
  def change
    create_table :players do |t|
      t.string :name
      t.integer :games_played
      t.integer :games_won
      t.timestamps
    end
  end
end
