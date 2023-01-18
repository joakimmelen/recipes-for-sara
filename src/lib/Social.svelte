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
    let placeholder: string;
    let header: string;

    let placeholders = [
    "What did you think of this recipe? Share your thoughts here.",
    "Leave your feedback on this recipe",
    "What was your favorite part of this recipe?",
    "Did you make any changes to this recipe? Let us know!",
    "What would you rate this recipe? Share your thoughts"
  ];

    let headers = [
    "Share your thoughts and rate this recipe",
    "Leave your feedback and rate this recipe",
    "Rate this recipe and let us know what you think",
    "What did you think of this recipe? Leave a comment and rate it",
    "Leave your review and help other users rate this recipe"
  ];

    onMount(() => {
      comments = JSON.parse($page.data.comments);
      placeholder = placeholders[Math.floor(Math.random()*placeholders.length)];
      header = headers[Math.floor(Math.random()*headers.length)];
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
    selected = +e.currentTarget.value;
    rating = +e.currentTarget.value;
  };
</script>

<div class="comments-container">
  {#if $currentUser}

      <div class="card">
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
                      class:selected={selected === num}
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