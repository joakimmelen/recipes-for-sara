<script lang="ts">

    const data = {
    "title": "",
    "description": "",
    "instructions1_title": "",
    "instructions1_desc": "",
    "instructions2_title": "",
    "instructions2_desc": "",
    "instructions3_title": "",
    "instructions3_desc": "",
    "instructions4_title": "",
    "instructions4_desc": "",
    "instructions1_desc1": "",
    "instructions1_desc2": "",
    "instructions1_desc3": "",
    "instructions1_desc4": "",
    "instructions1_desc5": "",
    "instructions2_desc1": "",
    "instructions2_desc2": "",
    "instructions2_desc3": "",
    "instructions2_desc4": "",
    "instructions2_desc5": "",
    "instructions3_desc1": "",
    "instructions3_desc2": "",
    "instructions3_desc3": "",
    "instructions3_desc4": "",
    "instructions3_desc5": "",
    "instructions4_desc1": "",
    "instructions4_desc2": "",
    "instructions4_desc3": "",
    "instructions4_desc4": "",
    "instructions4_desc5": ""
};

const formData = new FormData()

async function createRecipe() {

    // const record = await pb.collection('recipes').create(data);

    // console.table(data)
    
    
}

</script>

<form method="POST">
    
    <label for="title">Title</label>
    <input bind:value={data.title} type="text" name="title" id="title">
    <label for="description">Description</label>
    <textarea bind:value={data.description} name="description" id="description" rows="5" cols="33"></textarea>
    <input type="file" name="" id="">
    <button type="submit">Add recipe</button>
    <label for="instructions1_title">Instruction name 1</label>
    <input bind:value={data.instructions1_title} type="text" name="instructions1_title" id="instructions1_title">
    <textarea bind:value={data.instructions1_desc} name="instructions1_desc" id="instructions1_desc" rows="5" cols="33"></textarea>
    <textarea bind:value={data.instructions1_desc1} name="instructions1_desc1" id="instructions1_desc1" rows="1" cols="1"></textarea>
    <textarea bind:value={data.instructions1_desc2} name="instructions1_desc2" id="instructions1_desc2" rows="1" cols="1"></textarea>
    <textarea bind:value={data.instructions1_desc3} name="instructions1_desc3" id="instructions1_desc3" rows="1" cols="1"></textarea>
    <textarea bind:value={data.instructions1_desc4} name="instructions1_desc4" id="instructions1_desc4" rows="1" cols="1"></textarea>
    <textarea bind:value={data.instructions1_desc5} name="instructions1_desc5" id="instructions1_desc5" rows="1" cols="1"></textarea>

    <label for="instructions2_title">Instruction name 2</label>
    <input bind:value={data.instructions2_title} type="text" name="instructions2_title" id="instructions2_title">
    <textarea bind:value={data.instructions2_desc} name="instructions2_desc" id="instructions2_desc" rows="5" cols="33"></textarea>
    <textarea bind:value={data.instructions2_desc1} name="instructions2_desc1" id="instructions2_desc1" rows="1" cols="1"></textarea>
    <textarea bind:value={data.instructions2_desc2} name="instructions2_desc2" id="instructions2_desc2" rows="1" cols="1"></textarea>
    <textarea bind:value={data.instructions2_desc3} name="instructions2_desc3" id="instructions2_desc3" rows="1" cols="1"></textarea>
    <textarea bind:value={data.instructions2_desc4} name="instructions2_desc4" id="instructions2_desc4" rows="1" cols="1"></textarea>
    <textarea bind:value={data.instructions2_desc5} name="instructions2_desc5" id="instructions2_desc5" rows="1" cols="1"></textarea>

    <label for="instructions3_title">Instruction name 3</label>
    <input bind:value={data.instructions3_title} type="text" name="instructions3_title" id="instructions3_title">
    <textarea bind:value={data.instructions3_desc} name="instructions3_desc" id="instructions3_desc" rows="5" cols="33"></textarea>
    <textarea bind:value={data.instructions3_desc1} name="instructions3_desc1" id="instructions3_desc1" rows="1" cols="1"></textarea>
    <textarea bind:value={data.instructions3_desc2} name="instructions3_desc2" id="instructions3_desc2" rows="1" cols="1"></textarea>
    <textarea bind:value={data.instructions3_desc3} name="instructions3_desc3" id="instructions3_desc3" rows="1" cols="1"></textarea>
    <textarea bind:value={data.instructions3_desc4} name="instructions3_desc4" id="instructions3_desc4" rows="1" cols="1"></textarea>
    <textarea bind:value={data.instructions3_desc5} name="instructions3_desc5" id="instructions3_desc5" rows="1" cols="1"></textarea>

    <label for="instructions4_title">Instruction name 4</label>
    <input bind:value={data.instructions4_title} type="text" name="instructions4_title" id="instructions4_title">
    <textarea bind:value={data.instructions4_desc} name="instructions4_desc" id="instructions4_desc" rows="5" cols="33"></textarea>
    <textarea bind:value={data.instructions4_desc1} name="instructions4_desc1" id="instructions4_desc1" rows="1" cols="1"></textarea>
    <textarea bind:value={data.instructions4_desc2} name="instructions4_desc2" id="instructions4_desc2" rows="1" cols="1"></textarea>
    <textarea bind:value={data.instructions4_desc3} name="instructions4_desc3" id="instructions4_desc3" rows="1" cols="1"></textarea>
    <textarea bind:value={data.instructions4_desc4} name="instructions4_desc4" id="instructions4_desc4" rows="1" cols="1"></textarea>
    <textarea bind:value={data.instructions4_desc5} name="instructions4_desc5" id="instructions4_desc5" rows="1" cols="1"></textarea>

 
</form>


<style>

form {
    display: flex;
    flex-direction: column;
    gap: 5px;
    max-width: 50vw;
}

</style>