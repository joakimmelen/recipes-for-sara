<script lang="ts">
  // Import necessary modules
  import { createSearchStore, searchHandler } from "$lib/stores/search";
  import { onDestroy, onMount } from "svelte";
  import type { PageData } from "./$types"

  // Declare data variable and placeholder variable
  export let data: PageData;
  let placeholder: string;

  // Define array of placeholder text options
  let placeholders = [
    "Krämig spenat och basilikapasta",
    "Korv med räksallad",
    "Smashburgare",
    "Indisk...",
    "Majonnäs för hand",
    "Mynta- och korianderchutney",
    "Pasta...",
    "Festligt..."
  ];

  // On component mount, set a random placeholder text
  onMount(() => {
    placeholder = placeholders[Math.floor(Math.random()*placeholders.length)];
  });


// Map recipeList to searchRecipes and add searchTerms property
const searchRecipes = data.lists.recipeList.map((recipe: any) => {
    // Create an array of search terms
    const searchTerms = [
        recipe.title, 
        recipe.description, 
        recipe.instructions1_title, 
        recipe.instructions1_desc, 
        recipe.instructions2_title, 
        recipe.instructions2_desc, 
        recipe.instructions3_title, 
        recipe.instructions3_desc, 
        recipe.instructions4_title, 
        recipe.instructions4_desc, 
        recipe.instructions5_title, 
        recipe.instructions5_desc, 
        ...recipe.expand.cuisine.map((cuz: any) => cuz.tag)
    ].join(', ');
    return {...recipe, searchTerms};
});

// Create search store and subscribe to it
const searchStore = createSearchStore(searchRecipes);
const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

// Unsubscribe on component destruction
onDestroy(() => {
  unsubscribe();
  });
</script>

<svelte:head>
	<title>Recept för Sara - En passionerad samling av recept</title>
</svelte:head>

<div class="grid-container">
  <header class="header">
    <form class="header__search-form" on:submit|preventDefault>
      <h2 class="search-form__h2">Hitta ditt drömrecept här</h2>
      <input class="header__search-form__input" type="search" placeholder={placeholder} bind:value={$searchStore.search}>
    </form>
  </header>
  
<div class="main__container">
  <main class="main">
    {#each $searchStore.filtered as recipe}
    <a href={`/recipes/${recipe.id}`}>
    <div class="recipe">
      <img class="recipe__img" src={`http://127.0.0.1:8090/api/files/recipes/${recipe.id}/${recipe.picture}?thumb=500x500`} alt={recipe.title}>
      <h1 class="recipe__title">{recipe.title} </h1>
      {#if recipe.rating}
      <div class="recipe__rating">
        <img class="recipe__rating__img" src="favicon.ico" alt="Avocado icon" width="20px" height="20px" style={`opacity: ${recipe.rating >= 1 ? (recipe.rating < 1.5 ? 0.5 : 1) : 0.1}`}/>
        <img class="recipe__rating__img" src="favicon.ico" alt="Avocado icon" width="20px" height="20px" style={`opacity: ${recipe.rating >= 2 ? (recipe.rating < 2.5 ? 0.5 : 1) : 0.1}`}/>
        <img class="recipe__rating__img" src="favicon.ico" alt="Avocado icon" width="20px" height="20px" style={`opacity: ${recipe.rating >= 3 ? (recipe.rating < 3.5 ? 0.5 : 1) : 0.1}`}/>
        <img class="recipe__rating__img" src="favicon.ico" alt="Avocado icon" width="20px" height="20px" style={`opacity: ${recipe.rating >= 4 ? (recipe.rating < 4.5 ? 0.5 : 1) : 0.1}`}/>
        <img class="recipe__rating__img" src="favicon.ico" alt="Avocado icon" width="20px" height="20px" style={`opacity: ${recipe.rating >= 5 ? 1 : 0.1}`}/>
      </div>
    {/if}    
    </div>
    </a>
    {/each}
  </main>
</div>
  
  <footer class="footer">
   <a href="/recipes"><button class="footer__button">recipes</button></a>
  </footer>
  
</div>

<style>
  /* Global styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
  }
  /* Visited styles */
  *:visited {
    color: inherit;
  }
  /* Grid container styles */
  .grid-container {
    display: grid;
    background-color: var(--tertiary);
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas: 
      "header"
      "main"
      "footer";
    min-height: 100vh;  
    position: relative;
  }
  /* Header styles */
  .header {
    color: var(--secondary);
    font-size: calc(2rem + (1.1vw - 6px));
    grid-area: header;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('/images/anne-nygard-qVPNNR1eazU-unsplash.jpg') no-repeat center 50%/cover;
    height: 30vh;
    padding: 20px;
    text-align: center;
    justify-content: center;
    width: 100vw;
  }

  .search-form__h2 {
    color: var(--tertiary);
  }

  .header__search-form input[type="search"] {
    width: 70%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 2px solid var(--secondary);
    border-radius: 30px;
    font-size: 13px;
    outline: none;
  }

  .header__search-form input[type="search"]:hover {
    box-shadow: 0 0 8px 0 var(--secondary);
  }

  .header__search-form input[type="search"]:focus {
    border: 2px solid var(--secondary);
    box-shadow: 0 0 8px 0 var(--secondary);
  }

  /* Main content styles */
  .main__container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main {
      grid-area: main;
      padding: 20px;
      display: grid;
      margin-bottom: 50px;
  }

  /* Recipe styles */
  .recipe {
      grid-column: 1/3;
      background-color: #fff;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
      margin: 20px;
      max-width: 400px;
      transition: transform 0.2s ease-in-out;
  }

  .recipe:hover {
      transform: translate(0, -20px);
      box-shadow: 0 10px 24px 0px rgba(0,0,0,0.02), 0 8px 20px -2px rgba(0,0,0,0.06), 0 6px 10px -6px rgba(0,0,0,0.10);
  }

  /* Recipe image styles */
  .recipe__img {
      width: 100%;
      height: auto;
      margin-right: 20px;
  }

  /* Recipe rating styles */
  .recipe__rating {
      display: flex;
      align-items: center;
  }

  .recipe__rating img {
      width: 20px;
      height: 20px;
  }

  /* Footer styles */
  footer {
      grid-area: footer;
      background-color: var(--primary);
      color: var(--tertiary);
      padding: 10px;
      text-align: center;
      position: absolute;
      bottom: 0;
      width: 100%;
  }

  /* Button styles */
  .footer__button {
    background-color: var(--success);
    border: 1px solid var(--secondary);
    color: var(--tertiary);
    padding: 10px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
  }

  /* Media queries for different screen sizes */
  @media (min-width: 600px) {
      /* 4 columns on big screens */
      .main {
        grid-template-columns: repeat(2, 50%);
      }

      /* Recipe image styles */
      .recipe__img {
        width: 150px;
        height: 150px;
      }

      header {
        background: url('/images/anne-nygard-qVPNNR1eazU-unsplash.jpg') no-repeat center 40%/cover;
        height: 45vh;
      }

      header input {
        background: linear-gradient(to right, #ffffff, rgb(255, 255, 255), #fff4e8, var(--secondary));
      }
  }
  @media (min-width: 900px) {
    .main {
        grid-template-columns: repeat(3, 33%);
      }
  }
  @media (min-width: 1200px) {
    .header {
      margin-top: 70px;
    }
    .main {
        grid-template-columns: repeat(4, 25%);
        max-width: 1200px;
      }
  }

</style>