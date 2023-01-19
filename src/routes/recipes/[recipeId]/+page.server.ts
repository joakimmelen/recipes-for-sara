import { error } from "@sveltejs/kit"
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

/** @type {import('./$types').PageServerLoad} */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function load({params} : {params: any}) {
  
  const fetchRecipe = async (recipeId: string) => {

    try {
      
      const recipe = await pb.collection('recipes').getOne(`${recipeId}`, {
          $autoCancel: false,
          expand: 'cuisine, ing_group',
      });

      return recipe
      
    } catch (err) {
      console.error(err)
      throw error
    }
  }
  
  const fetchIngredients = async (recipeId: string) => {
    try {

      const ingredients = await pb.collection('recipe_ingredients').getList(1, 50, {
        $autoCancel: false,
        filter: `recipe_id = "${recipeId}"`,
        expand: 'recipe_id, ingredient_id, measurement_qty, measurement_id, ing_group'
      })

      return ingredients
      
    } catch (err) {
      console.error(err)
      throw error
    }
    
  }

  const fetchSocial = async (recipeId: string) => {
    try {
      const comments = await pb.collection("comments")
      .getList(1, 50, {
          $autoCancel: false,
          filter: `recipe = "${recipeId}"`,
          expand: 'user'
      });
      const answers = await pb.collection("answers").getList(1, 50, {
        $autoCancel: false,
        filter: `recipe = "${recipeId}"`,
        expand: 'user'
      });
      return {comments, answers}

    } catch (err) {
      console.error(err)
      throw error
    }
    
  }

  const recipe = await fetchRecipe(params.recipeId)
  const ingredients = await fetchIngredients(params.recipeId)
  const social = await fetchSocial(params.recipeId)

  return {
  recipe: JSON.stringify(recipe),
  ingredients: JSON.stringify(ingredients.items),
  social: JSON.stringify(social)
  }
 }

