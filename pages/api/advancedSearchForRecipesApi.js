import { advancedSearchForRecipes } from "../../lib/spoonacular";

const advancedSearchForRecipesApi = async (req, res) => {
  try {
    const { query, stringToSearch } = req.query;
    const recipes = await advancedSearchForRecipes(query, stringToSearch);
    res.status(200);
    res.json(recipes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

export default advancedSearchForRecipesApi;
