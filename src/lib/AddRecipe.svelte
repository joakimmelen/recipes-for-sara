<script lang="ts">
	import { pb } from "./pocketbase";

    const data = {
    "title": "test",
    "description": "test",
    "instructions1_title": "test",
    "instructions1_desc": "test",
    "instructions2_title": "test",
    "instructions2_desc": "test",
    "instructions3_title": "test",
    "instructions3_desc": "test",
    "instructions4_title": "test",
    "instructions4_desc": "test",
    "instructions1_desc1": "test",
    "instructions1_desc2": "test",
    "instructions1_desc3": "test",
    "instructions1_desc4": "test",
    "instructions1_desc5": "test",
    "instructions2_desc1": "test",
    "instructions2_desc2": "test",
    "instructions2_desc3": "test",
    "instructions2_desc4": "test",
    "instructions2_desc5": "test",
    "instructions3_desc1": "test",
    "instructions3_desc2": "test",
    "instructions3_desc3": "test",
    "instructions3_desc4": "test",
    "instructions3_desc5": "test",
    "instructions4_desc1": "test",
    "instructions4_desc2": "test",
    "instructions4_desc3": "test",
    "instructions4_desc4": "test",
    "instructions4_desc5": "test"
};

// const formData = new FormData(data)

async function createRecipe(e: any) {

    // const record = await pb.collection('recipes').create(data);
    console.log(new FormData(e.formElem))

}

</script>

<form id="formElem" on:submit|preventDefault>

    <label for="title">Title</label>
    <input type="text" name="title" id="title">
    <label for="description">Description</label>
    <textarea name="description" id="description" rows="5" cols="33"></textarea>
    
    <label for="instructions1_title">Instruction name 1</label>
    <input type="text" name="instructions1_title" id="instructions1_title">
    <textarea name="instructions1_desc" id="instructions1_desc" rows="5" cols="33"></textarea>
    <textarea name="instructions1_desc1" id="instructions1_desc1" rows="1" cols="1"></textarea>
    <textarea name="instructions1_desc2" id="instructions1_desc2" rows="1" cols="1"></textarea>
    <textarea name="instructions1_desc3" id="instructions1_desc3" rows="1" cols="1"></textarea>
    <textarea name="instructions1_desc4" id="instructions1_desc4" rows="1" cols="1"></textarea>
    <textarea name="instructions1_desc5" id="instructions1_desc5" rows="1" cols="1"></textarea>

    <label for="instructions2_title">Instruction name 2</label>
    <input type="text" name="instructions2_title" id="instructions2_title">
    <textarea name="instructions2_desc" id="instructions2_desc" rows="5" cols="33"></textarea>
    <textarea name="instructions2_desc" id="instructions2_desc1" rows="1" cols="1"></textarea>
    <textarea name="instructions2_desc" id="instructions2_desc2" rows="1" cols="1"></textarea>
    <textarea name="instructions2_desc" id="instructions2_desc3" rows="1" cols="1"></textarea>
    <textarea name="instructions2_desc" id="instructions2_desc4" rows="1" cols="1"></textarea>
    <textarea name="instructions2_desc" id="instructions2_desc5" rows="1" cols="1"></textarea>

    <label for="instructions3_title">Instruction name 3</label>
    <input type="text" name="instructions3_title" id="instructions3_title">
    <textarea name="instructions3_desc" id="instructions3_desc" rows="5" cols="33"></textarea>
    <textarea name="instructions3_desc" id="instructions3_desc1" rows="1" cols="1"></textarea>
    <textarea name="instructions3_desc" id="instructions3_desc2" rows="1" cols="1"></textarea>
    <textarea name="instructions3_desc" id="instructions3_desc3" rows="1" cols="1"></textarea>
    <textarea name="instructions3_desc" id="instructions3_desc4" rows="1" cols="1"></textarea>
    <textarea name="instructions3_desc" id="instructions3_desc5" rows="1" cols="1"></textarea>

    <label for="instructions4_title">Instruction name 4</label>
    <input type="text" name="instructions4_title" id="instructions4_title">
    <textarea name="instructions4_desc" id="instructions4_desc" rows="5" cols="33"></textarea>
    <textarea name="instructions4_desc" id="instructions4_desc1" rows="1" cols="1"></textarea>
    <textarea name="instructions4_desc" id="instructions4_desc2" rows="1" cols="1"></textarea>
    <textarea name="instructions4_desc" id="instructions4_desc3" rows="1" cols="1"></textarea>
    <textarea name="instructions4_desc" id="instructions4_desc4" rows="1" cols="1"></textarea>
    <textarea name="instructions4_desc" id="instructions4_desc5" rows="1" cols="1"></textarea>

 
    <button on:click={createRecipe} type="submit">Add recipe</button>
</form>


<style>

form {
    display: flex;
    flex-direction: column;
    gap: 5px;
    max-width: 50vw;
}

</style>