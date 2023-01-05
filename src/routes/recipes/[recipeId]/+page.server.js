import { error } from "@sveltejs/kit"
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');


export const load = async () => {
 
  // const getRecipe = async () => {
    try {
      const recipe = await pb.collection("recipes").getFullList();
      return {
        recipe: recipe.map((recip) => recip.export())
      }
    } catch (err) {
      console.error(err)
      throw error
    }
  
  
 }