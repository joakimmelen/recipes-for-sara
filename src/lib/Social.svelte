<script lang="ts">
	  import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { currentUser } from "./pocketbase";

    const MIN_CHARS = 3;

    let comments: Array<any> = [];
    let text = "";
    let rating = 5;
    let btnDisabled = true;
    let message = "";
    let selected = 5;

    onMount(() => {
      comments = JSON.parse($page.data.comments);
  });

  const handleInput = (e: any) => {
    if (e.target.value.trim().length < MIN_CHARS) {
      message = `Text must be at least ${MIN_CHARS} characters`;
      btnDisabled = true;
    } else {
      message = "";
      btnDisabled = false;
    }
  };


  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (text.trim().length > MIN_CHARS) {
      const newComment = {
        text: text.trim(),
        rating: +rating,
      };
      // send newComment to server
    }
  };

  const onChange = (e: any) => {
    selected = e.currentTarget.value;
  };
</script>

<div class="comments-container">
  {#if $currentUser}

      <div class="card">
          <header><h2>Leave a comment and rate this recipe</h2></header>
          <form on:submit|preventDefault={handleSubmit}>
              <div class="rating-select">
                <ul class="rating">
                  <li>
                    <input
                      type="radio"
                      name="rating"
                      id="num1"
                      value="1"
                      on:change={onChange}
                      class:selected={selected === 1}
                    />
                    <label for="num1">1</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="rating"
                      id="num2"
                      value="2"
                      on:change={onChange}
                      class:selected={selected === 2}
                    />
                    <label for="num2">2</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="rating"
                      id="num3"
                      value="3"
                      on:change={onChange}
                      class:selected={selected === 3}
                    />
                    <label for="num3">3</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="rating"
                      id="num4"
                      value="4"
                      on:change={onChange}
                      class:selected={selected === 4}
                    />
                    <label for="num4">4</label>
                  </li>
                  <li>
                    <input
                      type="radio"
                      name="rating"
                      id="num5"
                      value="5"
                      on:change={onChange}
                      class:selected={selected === 5}
                      />
                      <label for="num5">5</label>
                      </li>
                    </ul>
                  </div>
                  <div class="input-group">
                    <input
                      type="text"
                      on:input={handleInput}
                      bind:value={text}
                      placeholder="Comment on this recipe"
                    />
                    <button disabled={btnDisabled} type="submit">Send</button>
                  </div>
                  {#if message}
                  <div class="message">
                    {message}
                  </div>
                  {/if}
              </form>
          </div>
  
  
          {#if comments.length}
              {#each comments as comment (comment.id)}
                  {#if comment.expand}
                  <div class="card">
                      <div class="num-display">6</div>
                          <p>{comment.expand.comment.message} <span class="date">{new Date(comment.expand.comment.created).toLocaleString()}</span></p>
                            {#if comment.expand.answers.message}
                            <p class="answer">{comment.expand.answers.message} <span class="date">{new Date(comment.expand.answers.created).toLocaleString()}</span></p>
                            {/if}
                  </div>
                  {/if}
              {/each}
          {/if}
      {/if}
  </div>

<style>
/* styling of ratings */
.num-display {
    position: absolute;
    top: -10px;
    left: -10px;
    width: 20px;
    height: 20px;
    background: var(--secondary-color);
    color: var(--secondary-text-color);
    border: 1px #eee solid;
    border-radius: 50%;
    padding: 10px;
    text-align: center;
    font-size: 19px;
  }

  .rating {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 30px 0;
  }

  .rating li {
    position: relative;
    background: var(--secondary-text-color);
    width: 20px;
    height: 20px;
    padding: 10px;
    text-align: center;
    border-radius: 50%;
    font-size: 19px;
    border: 1px #eee solid;
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
    background: var(--secondary-color);
    color: var(--secondary-text-color);
  }

  /* Make actual radio select invisible */
  [type="radio"] {
    opacity: 0;
  }

  /* Use the sibling select */
  [type="radio"]:checked ~ label {
    background: var(--secondary-color);
    color: var(--secondary-text-color);
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
    border: 1px solid #ccc;
    padding: 8px 10px;
    border-radius: 8px;
    margin-top: 15px;
  }

  input {
    flex-grow: 2;
    border: none;
    font-size: 16px;
  }

  input:focus {
    outline: none;
  }

  .message {
    padding-top: 10px;
    text-align: center;
    color: rebeccapurple;
  }

/* container for the comments section */
.comments-container {
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
}

/* style for the comments */
.card {
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
</style>