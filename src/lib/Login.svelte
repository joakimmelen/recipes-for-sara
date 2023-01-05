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
    <h3 class="animate-charcter">Recipes for Sara</h3>
    <p>Signed in as {$currentUser.username}</p>
    <button on:click={signOut}>Log out</button>
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

.topbar {
    display: flex;
    justify-content: space-between;
    height: 5vh;
    align-items: center;
    position: fixed;
    top: 0;
    background-color: whitesmoke;
    width: 90vw;
   
}

.animate-charcter
{

  background-image: linear-gradient(
    -225deg,
    #231557 0%,
    #44107a 29%,
    #ff1361 67%,
    #fff800 100%
  );
  background-size: auto auto;
  background-clip: border-box;
  background-size: 200% auto;
  color: #fff;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: textclip 5s linear infinite;

}

@keyframes textclip {
  to {
    background-position: 100% center;
  }
}


</style>