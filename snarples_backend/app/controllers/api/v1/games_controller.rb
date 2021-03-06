class Api::V1::GamesController < ApplicationController
  before_action :find_game, only: [:update]

  def index
    @games = Game.all
    render json: @games
  end

  def create
    @game = Game.new(game_params)
    if @game.save
      render json: @game, status: :accepted
    else
      render json: { errors: @game.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def game_params
    params.permit(:completed, :winner)
  end

  def find_game
    @game = Game.find(params[:id])
  end

end
