import Link from "next/link";
import { useSelector } from "react-redux";

import RecipeCard from "../components/RecipeCard";
import Tooltip from "../components/Tooltip";

const Recipes = () => {
  const recipes = useSelector((state) => state.recipes.recipes);

  return (
    <div className="flex flex-col justify-center items-center py-2">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
        <Link href="/">I Want Please</Link>
      </h2>

      <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-center sm:text-left text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Search For Recipes
        </h2>
        <div>
          <input
            id="recipe"
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
          />
        </div>

        <form>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <Tooltip message="The cuisine(s) of the recipes">
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="cuisine"
                >
                  Cuisine
                </label>
              </Tooltip>
              <input
                id="cuisine"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <Tooltip message="The strategy to sort recipes by">
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="sort"
                >
                  Sort
                </label>
              </Tooltip>
              <input
                id="sort"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <Tooltip message="The diet(s) of the recipes">
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="diet"
                >
                  Diet
                </label>
              </Tooltip>
              <input
                id="diet"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <Tooltip message="All found recipes must not have ingredients that could cause problems for people with one of the given tolerances">
                <label
                  className="text-gray-700 dark:text-gray-200"
                  htmlFor="intolerances"
                >
                  Intolerances
                </label>
              </Tooltip>
              <input
                id="intolerances"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button className="w-full px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Search
            </button>
          </div>
        </form>
      </section>

      <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {recipes ? (
          recipes.results.map((recipe, idx) => {
            return <RecipeCard recipe={recipe} key={idx} />;
          })
        ) : (
          <p className="text-center">No recipes found</p>
        )}
      </div>
    </div>
  );
};

export default Recipes;
