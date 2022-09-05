import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetchRecipeDetails } from "../../lib/spoonacular";
import Tooltip from "../../components/Tooltip";
import parse from "html-react-parser";
import { Children } from "react";

export async function getStaticProps(staticProps) {
  // Fetch recipe store data from spoonacular api
  const fetchRecipeById = await fetchRecipeDetails(staticProps.params.id);

  return {
    props: {
      recipe: fetchRecipeById ? fetchRecipeById : {},
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "749013" } }, { params: { id: "602638" } }],
    fallback: true,
  };
}

const RecipeDetails = (initialProps) => {
  const router = useRouter();
  const id = router.query.id;
  const { title, image, summary, instructions } = initialProps.recipe || [];

  if (router.isFallback) {
    return <div className="text-center text-3xl">Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center py-8 container mx-auto">
      <Link href="/recipes">
        <a className="w-full ml-8 my-2 text-4xl text-left cursor-pointer">
          ← Go Back
        </a>
      </Link>
      <h1 className="text-3xl pb-4 text-sky-800 dark:text-sky-200">{title}</h1>

      <div className="max-w-[400px] xl:max-w-[800px]">
        <Image
          src={image}
          alt={`Photo of ${title}`}
          width={500}
          height={500}
          className="object-cover rounded-md"
        />
      </div>
      <hr className="mt-2 w-full" />

      <div className="text-center text-2xl pt-4">
        <h3>
          Total time to make:{" "}
          <span className="dark:text-sky-300">
            {initialProps.recipe.preparationMinutes +
              initialProps.recipe.cookingMinutes}
          </span>
        </h3>
        <p className="text-sm">
          {" "}
          Minutes to prepare:
          <span className="dark:text-sky-300">
            {initialProps.recipe.preparationMinutes}
          </span>{" "}
        </p>
        <p className="text-sm">
          {" "}
          Minutes to cook:
          <span className="dark:text-sky-300">
            {initialProps.recipe.cookingMinutes}
          </span>{" "}
        </p>

        <p className="mt-4">Ingredients:</p>
        {initialProps.recipe.extendedIngredients.map((ingredient, idx) => (
          <Tooltip key={ingredient.id + idx} message={ingredient.original}>
            <p className="text-sm">
              {ingredient.name}: {ingredient.amount} {ingredient.unit}
              <br />
            </p>
          </Tooltip>
        ))}
      </div>

      <a
        className="mt-8 mx-2"
        href={initialProps.recipe.sourceUrl}
        target="_blank"
        rel="noreferrer"
      >
        {initialProps.recipe.sourceUrl}
      </a>

      {
        // Must detect client window to parse the html string,
        // otherwise it will throw an error
        typeof window !== "undefined" ? (
          <>
            <div className="p-4 max-w-7xl flex flex-col items-center">
              {
                //Parse the summary of the recipe
                summary && (
                  <div className="p-2">
                    <p className="text-lg p-2 text-sky-900 dark:text-sky-200">
                      Summary
                    </p>
                    <hr className="pb-1 mx-2" />

                    <div className="mx-2">
                      {Children.toArray(
                        parse(summary, {
                          // Remove href (all) attributes from <a/> tag
                          replace: (domNode) => {
                            if (domNode.attribs && domNode.name === "a") {
                              return (domNode.attribs = "");
                            }
                          },
                        })
                      )}
                    </div>
                  </div>
                )
              }
            </div>
            {instructions && (
              <div className="p-4 max-w-7xl flex flex-col items-center">
                <div className="p-2">
                  <p className="text-lg p-2 text-sky-900 dark:text-sky-200">
                    Instructions
                  </p>
                  <hr className="pb-1 mx-2" />

                  <p className="mx-2">{instructions}</p>
                </div>
              </div>
            )}
          </>
        ) : null
      }
    </div>
  );
};

export default RecipeDetails;
