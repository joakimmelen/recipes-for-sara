import { error } from "@sveltejs/kit"
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const load = async () => {
 
  const fetchData = async () => {

    try {
      
      const recipe = await pb.collection('recipes').getOne("6h7jf2q7h84wn7y", {
          expand: 'relField1,relField2.subRelField',
      });
      return recipe
      
    } catch (err) {
      console.error(err)
      throw error
    }
  }
  return {
   recipe: JSON.stringify(await fetchData())
  }
 }