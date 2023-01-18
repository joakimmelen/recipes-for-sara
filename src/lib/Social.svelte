<script lang="ts">
	import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { currentUser } from "./pocketbase";

    let commentsList: Array<any> = []

    onMount(() => {
        // Load local comments for specific recipe from params on slug
        commentsList = JSON.parse($page.data.comments)
    })
</script>

<div class="comments-container">
    {#if $currentUser}
        {#if commentsList.length}
            {#each commentsList as comment (comment.id)}
                {#if comment.expand}
                        <p>{comment.expand.comment.message} <span class="date">{new Date(comment.expand.comment.created).toLocaleString()}</span></p>
                    {#if comment.expand.answers.message}
                            <p class="answer">{comment.expand.answers.message} <span class="date">{new Date(comment.expand.answers.created).toLocaleString()}</span></p>
                    {/if}
                {/if}
            {/each}
        {:else}
            <p>Sadly, zero comments found</p> <button>Add comment</button>
        {/if}
    {:else}
        <p>You must be logged in to see comments and post</p>
    {/if}
</div>


<style>
/* container for the comments section */
.comments-container {
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
}

/* style for the comments */
.comments-container p {
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 1.5;
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