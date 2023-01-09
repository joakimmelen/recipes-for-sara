<script lang="ts">

  let searchterm: string

  async function search() {
    console.log(`Searching for ${searchterm}`)
  }
</script>



<div class="hero">
    <div class="hero-image">
      <form class="search-form" on:submit|preventDefault>
        <input type="text" placeholder="Search" bind:value={searchterm}> 
        <button class="btn" on:click={search}>Search</button>
        <ion-icon name="search-outline"></ion-icon>
     </form>
    </div>
</div>



<div class="popular">
<h2>Popular right now</h2>
 <a href="/recipes"><button>recipes</button></a>
      </div>
<style>

input {
  padding: 10px;
  font-size: 17px;
  border: 1px solid #d88d0a;
  float: left;
  width: 50%;
  border-radius: 10px 0 0 10px;
}

input:focus {
  outline: none;
  border: 1px solid #d88d0a;
  box-shadow: 0 0 5px #d88d0a;
}

button {
  border-radius: 0 10px 10px 0;
  float: left;
  width: 20%;
  padding: 10px;
  background: #d88d0a;
  color: white;
  font-size: 17px;
  border: 1px solid #d88d0a;
  border-left: none; /* Prevent double borders */
  cursor: pointer;
}


.search-form {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  border-radius: 50px;
}


.hero-image {
  background-image: url("/images/recipes-for-sara-bigpic.jpg"); /* The image used */
  background-color: #cccccc; /* Used if the image is unavailable */
  height: 500px; /* You must set a specified height */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
}

</style>