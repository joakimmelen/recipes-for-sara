<script lang="ts">
import { currentUser, pb } from "./pocketbase";

interface User {
  username: string;
  password: string;
}

let user: User = {
  username: '',
  password: '',
};

const signOut = () => {
    pb.authStore.clear();
    window.location.href = '/';
}

const login = async () => {
    await pb.collection("users").authWithPassword(user.username, user.password);
    window.location.replace('/');
}

const signUp = async () => {
    try {
        const data = {
            ...user,
            passwordConfirm: user.password,
            name: "howdy"
        }
        await pb.collection("users").create(data);
        await login();
    } catch (err) {
        console.error(err);
    }
}

</script>

<section class="topbar" >
  <a href="/" class="logo-text">Recipes for Sara</a>
  <div class="logincontainer">
    {#if $currentUser}
      <p>Signed in as {$currentUser.username}</p>
      <button on:click={signOut}>Log out</button>
    {:else}
      <form class="login-form" on:submit|preventDefault>
        <label for="username">Username:</label>
        <input id="username" type="text" placeholder="Username" bind:value={user.username}>
        <label for="password">Password:</label>
        <input id="password" type="password" placeholder="Password" bind:value={user.password}>
        <div class="button-container">
          <button class="btn" on:click={signUp}>Sign Up</button>
          <button class="btn" on:click={login}>Login</button>
        </div>
      </form>
    {/if}
  </div>
</section>

<style>

.topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    background-color: #5d0404;
    width: 100vw;
    padding: 10px;
    z-index: 1; /* to display the topbar on top of all other elements */
}

.logo-text {
  color: gold;
  font-size: 1.5em; /* to increase the size of the text */
  font-weight: bold; /* to make the text bold */
  margin-left: 10px; /* to add some spacing between the logo and the left side */
}

.logincontainer {
    display: flex;
    align-items: center;
    margin-right: 10px; /* to add some spacing between the login container and the right side */
}

.logincontainer p {
    color: whitesmoke;
    margin-right: 10px; /* to add some spacing between the text and the logout button */
}

.logincontainer button {
    background-color: #ffc107;
    border: none;
    color: #5d0404;
    padding: 10px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
}

form {
    display: flex;
    align-items: center;
}

form input {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
}

form button {
    background-color: #ffc107;
    border: none;
    color: #5d0404;
    padding: 10px 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
}

</style>