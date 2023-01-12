<script lang="ts">
	import { currentUser, pb } from "./pocketbase";

    let username: string;
    let password: string;

    async function login() {
        await pb.collection("users").authWithPassword(username, password)

    }

    async function signUp() {
        try {
        const data = {
            username, password, passwordConfirm: password, name: "howdy"
        }
        const createdUser = await pb.collection("users").create(data);
     await login();
        } catch (err) {
            console.error(err)
        }
    }

    function signOut() {
        pb.authStore.clear();
    }

</script>

{#if $currentUser}

 <section class="topbar">
    <a href="/"><h3 class="logo-text">Recipes for Sara</h3></a>
    <div class="logincontainer">
      <p>Signed in as {$currentUser.username}</p>
      <button on:click={signOut}>Log out</button>
    </div>
 </section>
 {:else}

 <form on:submit|preventDefault>
    <input type="text" placeholder="Username" bind:value={username}>
    <input type="password" placeholder="Password" bind:value={password}>
    <button class="btn" on:click={signUp}>Sign Up</button>
    <button class="btn" on:click={login}>Login</button>
 </form>

{/if}

<style>

a {
  text-decoration: none;
  color: inherit;
}

p {
  color: whitesmoke;
}

.logo-text {
  color: gold;
}

.logincontainer {
  display: flex;
  max-height: 25px;
  align-items: center;
}

.topbar {
    display: flex;
    justify-content: space-between;
    height: 5vh;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    background-color: rgb(93, 4, 4);
    width: calc(100vw);
    padding-top: 10px;
    padding-bottom: 10px;
}



</style>