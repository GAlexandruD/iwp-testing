import Image from "next/image";
import Link from "next/link";

const RecipeCard = ({ recipe }) => {
  console.log({ recipe });
  return (
    <Link href={`/recipe/${recipe.id}`}>
      <div
        className="rounded-md flex flex-col justify-between bg-gray-200 dark:bg-gray-700
      p-2 m-2 w-80 h-80 cursor-pointer dark:text-gray-200 hover:scale-105 transition-all duration-300 overflow-hidden"
      >
        <h1 className="mt-1 text-center">{recipe.title}</h1>
        <div className="w-full h-64 overflow-hidden">
          <Image
            priority
            alt="food picture"
            src={recipe.image}
            layout="responsive"
            width={300}
            height={300}
            className="object-cover rounded-md"
          />
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
