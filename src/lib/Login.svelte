<script lang="ts">
import { onMount } from "svelte";
import { currentUser, pb } from "./pocketbase";

interface User {
  username: string;
  password: string;
}

let user: User = {
  username: '',
  password: '',
};

let checkForUser: boolean
let modalOpen = false;

onMount(async () => {
  checkForUser = $currentUser == null ? true : false
});

const signOut = () => {
    pb.authStore.clear();
    modalOpen = !modalOpen
}

const login = async () => {
    await pb.collection("users").authWithPassword(user.username, user.password);
    modalOpen = !modalOpen
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

function openModal() {
  modalOpen = !modalOpen;
}

</script>

<section class="navbar" >
  
  <a href="/"><ion-icon name="home"></ion-icon></a>
  <a href="/recipes"><ion-icon name="book"></ion-icon></a>

  {#if checkForUser == null}
  <p>laddar..</p>
  {:else}
    {#if $currentUser}
    <button on:click={openModal}><ion-icon name="apps"></ion-icon></button>
    <div class="modal" style:display={modalOpen ? 'flex' : 'none'}>
      <div class="modal-content">
        <form>
          <button style="background-color: var(--secondary); padding: 10px 20px;" on:click={signOut}>Logga ut</button>
        </form>
      </div>
    </div>
    {:else}
    <button on:click={openModal}><ion-icon name="apps-outline"></ion-icon></button>
    <div class="modal" style:display={modalOpen ? 'flex' : 'none'}>
      <div class="modal-content">
        <form>
          <input type="text" placeholder="Username" id="username" bind:value={user.username}>
          <input type="password" placeholder="Password" id="password" bind:value={user.password}>
          <button style="background-color: var(--secondary); padding: 10px 20px;" type="submit" on:click={login}>Logga in</button>
        </form>
      </div>
    </div>
    {/if}
    {/if}
 
</section>

<style>

  /* Modal */
.modal {
    position: fixed;
    bottom: 60px; /* height of the navigation bar */
    left: 0;
    width: 100vw;
    height: 20vh;
    background-color: #fff;
    box-shadow: 0px -5px 10px #ccc; /* add a shadow effect */
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.modal-content form {
  display: flex;
  flex-direction: column;
}

form input {
  width: 80%;
}

button {
  padding: 0;
  margin: 0;
  background-color: var(--primary);
  border: none;
  color: none;
  font-size: 30px;
  cursor: pointer;
}

.navbar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background-color: var(--primary);
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-size: 30px;
    z-index: 99;
}

form {
    display: flex;
    align-items: center;
}

form input {
    border: 1px solid var(--secondary);
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
}

a {
  text-decoration: none;
  color: inherit;
}

a:hover {
  color: var(--secondary);
}

</style>