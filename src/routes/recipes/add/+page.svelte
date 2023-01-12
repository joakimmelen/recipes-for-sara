<script lang="ts">
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');
    
const data = {
    "recipe_id": "RELATION_RECORD_ID",
    "ingredient_id": "RELATION_RECORD_ID",
    "measurement_qty": "RELATION_RECORD_ID",
    "measurement_id": "RELATION_RECORD_ID",
    "ing_group": "RELATION_RECORD_ID"
};


async function createRecipe() {
    console.log(data)
    // const record = await pb.collection('recipe_ingredients').create(data);
}

</script>

<form on:submit|preventDefault>
    

<button on:click={createRecipe}>123</button>
</form>


<style>

form {
    display: flex;
    flex-direction: column;
    gap: 5px;
    max-width: 50vw;
}

</style>