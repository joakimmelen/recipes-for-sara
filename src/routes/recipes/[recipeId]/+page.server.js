import { error } from "@sveltejs/kit"
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');


export const load = () => {
 
  const getRecipe = async () => {
    try {
      const recipe = await pb.collection("recipes").getFullList();
      return recipe
    } catch (err) {
      console.error(err)
      throw error
    }
  }
 
  return {
    recipe: JSON.stringify(getRecipe())
  }
 }