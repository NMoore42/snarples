class Api::V1::PlayersController < ApplicationController
  before_action :find_player, only: [:update]

  def index
    @players = Player.all
    render json: @players
  end

  def create
    @player = Player.new(player_params)
    if @player.save
      render json: @player, status: :accepted
    else
      render json: { errors: @player.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def player_params
    params.permit(:name, :games_won, :games_played)
  end

  def find_player
    @player = Player.find(params[:id])
  end

end
