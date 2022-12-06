class Api::V1::RecipesController < ApiController

  API_KEY = ENV["SPOONACULAR_API_KEY"]

  def search
    url = "https://api.spoonacular.com/recipes/complexSearch?apiKey=#{API_KEY}&query=#{params[:item]}"

    response = Faraday.get(url)
      
    search_recipes_hash = JSON.parse(response.body)

    if !search_recipes_hash.nil?
      returned_recipe = search_recipes_hash["results"].sample(4)

      recipe_featured = returned_recipe[0]
      recipe_others = returned_recipe[1..-1]

      render json: {recipe_featured: recipe_featured, recipe_others: recipe_others}
    else
      render json: {error: "error"}, status: 404
    end
  end

  def show
    url = "https://api.spoonacular.com/recipes/#{params[:id]}/information?apiKey=#{API_KEY}"
    response = Faraday.get(url)

    recipe = JSON.parse(response.body)
    render json: {recipe: recipe}

  end

  private 
  
  def search_params
    params.require(:recipe).permit(:item)
  end

end