class Api::V1::HandsController < ApplicationController

  before_action :find_hand, only: [:update]
  def index
    @hands = Hand.all
    render json: @hands
  end

  def update
    @hand.update(hand_params)
    if @hand.save
      render json: @hand, status: :accepted
    else
      render json: { errors: @hand.errors.full_messages }, status: :unprocessible_entity
    end
  end

  private

  def hand_params
    params.permit(:title, :content)
  end

  def find_hand
    @hand = Hand.find(params[:id])
  end

end
