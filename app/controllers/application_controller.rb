class ApplicationController < ApiController
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
 
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :profile_photo])
  end

  def after_sign_in_path_for(resource)
    session["user_return_to"] || restaurants_path
  end

end
