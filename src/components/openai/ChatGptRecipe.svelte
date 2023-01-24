<script lang="ts">
let isLoading = false
let question: string
let responses: any

const talkWithAI = async () => {
    isLoading = true
    const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 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`
    },
    body: JSON.stringify({
        model: "text-davinci-003",
        prompt: `Du kommer att bli ombedd att ge mig ett recept från en eller flera ingredienser, eller hitta ett klassiskt recept från prompt-texten. Om det inte finns några seriösa recept med en eller alla ingredienser så kan du hitta på ett. Använd svenska som språk och europeiska/svenska måttenheter, prioritera dl framför ml. Svara med HTML-kod och inline-styling. Följande är ingredienserna och/eller prompt-texten: ${question}`,
        temperature: 0.5,
        max_tokens: 2000,
    })
});
const json = await response.json();
responses = await json.choices[0].text
isLoading = false
}

const handleClick = () => {
    talkWithAI()
}

</script>
<div class="wrapper">
    {#if isLoading}
    <div class="loading-overlay">Loading...</div>
    {/if}

    {#if !responses}
    <input placeholder="ingefära, avocado, tofu" bind:value={question} type="text">
    <button on:click={handleClick}>Skapa recept!</button>
    
    <p>Stoppa in ingredienser eller en förfrågan efter ett specifikt recept i maskinen ovanför</p>
    {:else}
    <div class="recipe">
        <div>{@html responses}</div>
    </div>
    {/if}

</div>
<style>

.wrapper {
    display: flex;
    flex-direction: column;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  z-index: 2;
}

.recipe {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 2rem 4rem;
    border: 1px solid var(--dark);
    margin: 5px;
}

h1, h2, h3 {
    font-size: 1.7rem;
    text-align: center;
}

h4, h5, h6, p {
    font-size: 1.2rem;
    text-align: center;
}

ul {
text-align: left;
}

input {
    font-size: 1.5rem;
}

button {
    padding: 15px;
}

p {
    font-style: italic;
}

</style>