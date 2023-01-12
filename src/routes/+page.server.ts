import type { PageServerLoad } from "./$types"
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export const load: PageServerLoad = async () => {

  const lists = async () => {

    const recipeList = await pb.collection("recipes").getFullList(50,{
        expand: "cuisine"
    });
    const ingList = await pb.collection("ingredients").getFullList();
    // const unitList = await pb.collection("measurement_units").getFullList()
    // const qtyList = await pb.collection("measurement_qty").getFullList()
    // const rcpIngList = await pb.collection("recipe_ingredients").getFullList()
    const cuisineList = await pb.collection("cuisine").getFullList();
    const ingGroupList = await pb.collection("ingredient_group").getFullList();
    
    return { recipeList, ingList, cuisineList, ingGroupList }

  } 
  return {
    lists: JSON.parse(JSON.stringify(await lists()))
  }
}