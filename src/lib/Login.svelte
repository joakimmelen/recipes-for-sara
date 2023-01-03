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

 <p class="auth-container">
    Signed in as {$currentUser.username}
    <button on:click={signOut}>Log out</button>
 </p>
 {:else}

 <form on:submit|preventDefault>
    <input type="text" placeholder="Username" bind:value={username}>
    <input type="password" placeholder="Password" bind:value={password}>
    <button class="btn" on:click={signUp}>Sign Up</button>
    <button class="btn" on:click={login}>Login</button>
 </form>

{/if}

<style>
    p {
        display: flex;
        justify-content: right;
    }
</style>