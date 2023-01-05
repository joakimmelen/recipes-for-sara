import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export const load = async () => {

  const lists = async () => {

    const recipeList = await pb.collection("recipes").getFullList();
    const ingList = await pb.collection("ingredients").getFullList();
    const unitList = await pb.collection("measurement_units").getFullList()
    const qtyList = await pb.collection("measurement_qty").getFullList()
    const rcpIngList = await pb.collection("recipe_ingredients").getFullList()

    return { recipeList, ingList, unitList, qtyList, rcpIngList }

  } 
  return {
    lists: JSON.parse(JSON.stringify(await lists()))
  }
}