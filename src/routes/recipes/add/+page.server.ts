import type { PageServerLoad } from "./$types"
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export const load: PageServerLoad = async () => {

  const lists = async () => {
    const recipeIngredients = await pb.collection('recipe_ingredients').getList(1, 50, {
      expand: 'recipe_id, ingredient_id, measurement_qty, measurement_id, ing_group'
    })
    const ingredients = await pb.collection("ingredients").getFullList();
    const measurementUnits = await pb.collection("measurement_units").getFullList();
    const measurementQty = await pb.collection("measurement_qty").getFullList();
    const recipes = await pb.collection("recipes").getFullList();
    const ingredientGroups = await pb.collection("ingredient_group").getFullList();
  
    return { recipeIngredients, ingredients, measurementUnits, measurementQty, recipes, ingredientGroups }
  } 
  return {
    lists: JSON.parse(JSON.stringify(await lists()))
  }
}