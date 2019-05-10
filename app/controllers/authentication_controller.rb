# require('jwt')

class AuthenticationController < ApplicationController

  # POST /auth/login
  def login
    @user = User.find_by_name(params[:name])
    if @user.authenticate(params[:password]) #authenticate method provided by Bcrypt and 'has_secure_password'
      token = JsonWebToken.encode(user_id: @user.id, name: @user.name)
      render json: { token: token }, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end

  private

  def login_params
    params.permit(:name, :password)
  end

end
