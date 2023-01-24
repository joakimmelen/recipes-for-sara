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
  <header class="header" class:shrink={$searchStore.search}>
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
      <img class="recipe__img" width="50" src={`http://127.0.0.1:8090/api/files/recipes/${recipe.id}/${recipe.picture}`} alt={recipe.title}>
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
  
</div>

<style>

  /* Header styles */
  .header {
    color: var(--primary);
    font-size: calc(2rem + (1.1vw - 6px));
    grid-area: header;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.363),
      rgba(0, 0, 0, 0)
    ), url('/images/roam-in-color-pRKDJZWNUvY-unsplash.webp') no-repeat center 0%/cover;
    height: 50vh;
    padding: 20px;
    text-align: center;
    justify-content: center;
    transition: height 1s;
  }

  .header.shrink {
    height: 10vh;
    border: none;
  }

  .header.shrink .header__search-form__input {
    transform: scaleX(1);
    margin: 10px;
    width: 80vw;
    transition: transform 2s;
  }

  .header.shrink h2 {
    display: none;
  }

  .search-form__h2 {
    color: var(--primary);
  }

  .header__search-form input[type="search"] {
    width: 70%;
    padding: 12px 20px;
    margin: 8px 0;
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

  .main {
    margin: 1rem;
    display: flex;
    flex-direction: column-reverse;
    gap: 1rem;
  }

  .recipe {
    border: 1px solid var(--dark);
    padding: 5px;
    box-shadow: 0 3px 5px var(--dark);
    display: flex;
    flex-direction: column;
    border-radius: 5px;
  }

  .recipe h1 {
    height: 5rem;
    border-top: 1px solid var(--light);
    margin: 5px 0;
  }

  /* Recipe image styles */
  .recipe__img {
      width: 100%;
      height: 20vh;
      object-fit: cover;
      margin-right: 20px;
  }

  /* Recipe rating styles */
  .recipe__rating {
      display: flex;
      align-items: center;
      margin: 0 0 10px 0px;
  }

  .recipe__rating img {
      width: 20px;
      height: 20px;
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

      header input {
        background: linear-gradient(to right, #ffffff, rgb(255, 255, 255), #fff4e8, #fff, #fff, #fff, whitesmoke, var(--secondary));
      }
  }
  @media (min-width: 900px) {
    .header {
      background: url('/images/anne-nygard-qVPNNR1eazU-unsplash.jpg') no-repeat center 45%/cover;
    }
    .main {
        grid-template-columns: repeat(3, 33%);
      }
  }
  @media (min-width: 1200px) {
    .header {
      margin-top: 50px;
      height: 45vh;
    }
    .main {
        grid-template-columns: repeat(4, 25%);
        max-width: 1200px;
      }
  }

</style>