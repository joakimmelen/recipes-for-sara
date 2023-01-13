import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

export const load = async () => {
  const lists = async () => {
    const recipeList = await pb.collection("recipes").getFullList(50, {
      expand: "cuisine"
    });
    return { recipeList }
  } 
  return {
    lists: JSON.parse(JSON.stringify(await lists()))
  }
}