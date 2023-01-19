<script lang="ts">
    import { onMount } from "svelte";
    
      /** @type {import('./$types').PageData} */  export let data: any;
     
    let isLoading: boolean = true
    let user;
    
    onMount(async () => {
        try {
          user = await data
          isLoading = false;
        } catch(err) {
          console.log(err);
        }
      });
    </script>
    
    {console.log(data)}
    
    <style>
    

    </style>