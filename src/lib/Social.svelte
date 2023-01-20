<script lang="ts">
	  import { page } from "$app/stores";
    import { onMount, onDestroy } from "svelte";
	import Login from "./Login.svelte";
    import { currentUser, pb } from "./pocketbase";

    const MIN_CHARS = 3;

    let unsubscribe: () => void;

    let comments: Array<any> = [];
    let newestComments: Array<any> = [];
    let restOfComments: Array<any> = [];
    let answers: Array<any> = [];
    let text = "";
    let rating = 5;
    let btnDisabled = true;
    let message = "";
    let selected = 5;
    let placeholder: string;
    let header: string;
    let showMore = false;

    let placeholders = [
    "Vad tyckte du om detta recept?",
    "Lämna dina åsikt om detta recept",
    "Vad var din favoritdel av detta recept?",
    "Gjorde du några förändringar? Berätta!",
    "Dela dina tankar"
  ];

    let headers = [
    "Dela dina tankar och betygsätt detta recept",
    "Lämna din åsikt och betygsätt detta recept",
    "Betygsätt detta recept och berätta vad du tycker",
    "Vad tyckte du om detta recept? Lämna en kommentar",
    "Lämna din recension och hjälp andra användare"
  ];

  onMount( async () => {
      let parsed = await JSON.parse($page.data.social)
      comments = await parsed.comments.items
      comments.reverse()
      newestComments = comments.slice(0, 3)
      restOfComments = comments.slice(3)
      answers = await parsed.answers.items
      placeholder = placeholders[Math.floor(Math.random()*placeholders.length)];
      header = headers[Math.floor(Math.random()*headers.length)];
      // subscribe to realtime comments
      unsubscribe = await pb.collection('comments').subscribe('*', function (e) {
        newestComments = [e.record, ...newestComments];
      });
  });

    onDestroy(() => {
      unsubscribe?.();
    })

  const handleInput = (e: any) => {
    if (e.target.value.trim().length < MIN_CHARS) {
      message = `Text must be at least ${MIN_CHARS} characters`;
      btnDisabled = true;
    } else {
      message = "";
      btnDisabled = false;
    }
  };

  const updateRating = async () => {
  let getRecipe = JSON.parse($page.data.recipe)
  let currentRating = getRecipe.rating
  let currentRaters = getRecipe.raters
  let newRating = rating // the new rating being added
  let newAverage = Math.round(((currentRating * currentRaters + newRating) / (currentRaters + 1)) * 100) / 100
  let data = {
    "rating": newAverage,
    "raters": currentRaters + 1
  }
  const record = await pb.collection("recipes").update(getRecipe.id, data)
  return
}

const handleSubmit = async (e: any) => {
    e.preventDefault()
    let getRecipe = await JSON.parse($page.data.recipe)
    let getUserId = $currentUser?.id
    if (text.trim().length > MIN_CHARS) {
      const newComment = {
          "message": text.trim(),
          "user": getUserId,
          "recipe": getRecipe.id,
          "rating": rating
      };
      // update rating
      updateRating()
      // send newComment to server
      const record = await pb.collection('comments').create(newComment);
      text = "";
    }
  };


  const onChange = (e: any) => {
    selected = +e.currentTarget.value;
    rating = +e.currentTarget.value;
  };
</script>

<div class="comments-container">
  {#if $currentUser}
      <div class="comment">
          <header><h2>{header}</h2></header>
          <form on:submit|preventDefault={handleSubmit}>
              <div class="rating-select">
                <ul class="rating">
                  {#each [1, 2, 3, 4, 5] as num}
                  <li>
                    <input
                      type="radio"
                      name="rating"
                      id={`num${num}`}
                      value={num}
                      on:change={onChange}
                      checked={selected === num ? true : false}
                    />
                    <label for={`num${num}`}>{num}</label>
                  </li>
                  {/each}
                    </ul>
                  </div>
                  <div class="input-group">
                    
                    <input
                      type="text"
                      on:input={handleInput}
                      bind:value={text}
                      placeholder={placeholder}
                    />
                    <button disabled={btnDisabled} type="submit" on:submit={handleSubmit}>Kommentera</button>
                  </div>
                  {#if message}
                  <div class="message">
                    {message}
                  </div>
                  {/if}
              </form>
          </div>
  
          {:else} 
            <header>Du måste vara inloggad för att kommentera</header>
            <div class="input-group"></div>
      {/if}
          <div class="comments-list">
          {#if comments.length}
              {#each newestComments as comment (comment.id)}
                  {#if comment.message}
                  <div class="comment">
                      <div class="num-display">{comment.rating}</div>
                          <p>{comment.message} <br> <span class="date">{new Date(comment.created).toLocaleString()}</span>
                            {#if comment.expand.user}
                           {comment.expand.user.name}
                           {:else} {$currentUser?.name}
                            {/if}
                          </p>
                            {#each answers as answer (answer.id)}
                            {#if answer.comment.includes(comment.id)}
                            <p class="answer">{answer.message} <br> <span class="date">{new Date(answer.created).toLocaleString()}
                            </span>
                            {#if answer.expand.user}
                            {answer.expand.user.name}
                            {:else} {$currentUser?.name}
                            {/if}
                            </p>
                            {/if}
                            {/each}
                  </div>
                  {/if}
              {/each}
              {#if comments.length > 3}
              <button class="show-more" on:click={() => showMore = !showMore}>
                {showMore ? "Hide" : "Show"} comments
              </button>
              <div class="accordion" style:display={showMore ? 'block' : 'none'}>
                {#each restOfComments as comment (comment.id)}
                {#if comment.message}
                <div class="comment">
                    <div class="num-display">{comment.rating}</div>
                        <p>{comment.message} <br> <span class="date">{new Date(comment.created).toLocaleString()}</span>
                          {#if comment.expand.user}
                         {comment.expand.user.name}
                         {:else} {$currentUser?.name}
                          {/if}
                        </p>
                          {#each answers as answer (answer.id)}
                          {#if answer.comment.includes(comment.id)}
                          <p class="answer">{answer.message} <br> <span class="date">{new Date(answer.created).toLocaleString()}
                          </span>
                          {#if answer.expand.user}
                          {answer.expand.user.name}
                          {:else} {$currentUser?.name}
                          {/if}
                          </p>
                          {/if}
                          {/each}
                </div>
                {/if}
                {/each}
              </div>
            {/if}
          {/if}
        </div>
  </div>

<style>
/* styling of ratings */
.num-display {
    position: absolute;
    top: -10px;
    left: -10px;
    width: 20px;
    height: 20px;
    background: var(--primary-color);
    color: var(--tertiary-color);
    border-radius: 50%;
    padding: 10px;
    text-align: center;
    font-size: 19px;
  }

  .rating-select {
    display: flex;
    justify-content: center;
  }

  .rating {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 30px 0;
    width: 100%;
    max-width: 400px;
  }

  .rating li {
    position: relative;
    background-color: var(--tertiary-color);
    color: var(--success-color);
    border: 1px solid var(--success-color);
    width: 20px;
    height: 20px;
    padding: 10px;
    text-align: center;
    border-radius: 50%;
    font-size: 19px;
    transition: .2s;
  }

  .rating li label {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    padding: 10px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }

  .rating li:hover {
    box-shadow: 0px 0px 10px var(--primary-color); /* add a shadow effect */
    opacity: 90%;
  }

  /* Make actual radio select invisible */
  [type="radio"] {
    opacity: 0;
  }

  /* Use the sibling select */
  [type="radio"]:checked ~ label {
    background-color: var(--primary-color);
    color: var(--accent-color);
    opacity: .5;
    border: 0;
  }

/* styling for inputs */
header {
    max-width: 400px;
    margin: auto;
  }

  header h2 {
    font-size: 22px;
    font-weight: 600;
    text-align: center;
  }

  .input-group {
    display: flex;
    flex-direction: row;
    border: 1px solid var(--secondary-color);
    padding: 5px 7px;
    border-radius: 8px;
    margin-top: 15px;
  }

  input {
    flex-grow: 2;
    border: none;
    font-size: calc(1.5rem + (0.7vw - 18px));
  }

  input:focus {
    outline: none;
  }

  .message {
    padding-top: 10px;
    text-align: center;
    color: var(--danger-color);
  }

/* container for the comments section */
.comments-container {
  display: flex;
    flex-direction: column;
  width: 100%;
  max-width: 900px;
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
}

/* style for the comments */
.comment {
    background-color:var(--background-color);
    color: var(--text-color);
    border-radius: 15px;
    padding: 10px 50px;
    margin: 20px 0;
    position: relative;
  }

/* style for the answers */
.comments-container p.answer {
  margin-left: 20px;
  font-size: 14px;
  color: #999;
}

/* style for the date created */
.comments-container .date {
  font-size: 12px;
  color: #999;
  text-align: right;
  margin-top: 5px;
}

/* styles for button */ 
button {
    background-color: var(--secondary-color);
    border: 0;
    border-radius: 8px;
    width: 100px;
    height: 40px;
    cursor: pointer;
  }

  button:hover {
    transform: scale(0.98);
    opacity: 0.9;
  }
  button:disabled {
    background-color: #cccccc;
    color: #333;
    cursor: auto;
  }
  button:disabled:hover {
    transform: scale(1);
    opacity: 1;
  }
</style>