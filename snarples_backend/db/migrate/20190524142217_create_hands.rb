class CreateHands < ActiveRecord::Migration[5.2]
  def change
    create_table :hands do |t|
      t.integer :game_id
      t.integer :player_id
      t.integer :score
      t.timestamps
    end
  end
end
