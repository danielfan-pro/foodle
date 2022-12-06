class Api::V1::UsersController < ApiController

  def show
    user = User.find_by(username: params[:id])
    render json: user, serializer: UserSerializer
  end

end