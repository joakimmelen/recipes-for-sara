<script lang="ts">
import RecipeGenerator from "../../components/magic/RecipeGenerator.svelte";


</script>
<svelte:head>
	<title>Magiska avdelningen</title>
</svelte:head>

<div class="wrapper">
    <div class="hero">
        <h1>Välkommen till min magiska receptgenerator</h1>
        <p>Här kan du hitta ett specifikt recept du söker, eller skapa/hitta ett nytt med några ingredienser du valt.</p>
    </div>
    <RecipeGenerator />
</div>

<style>

.wrapper {
    display: flex;
    flex-direction: column;
    margin: 5px 20px;
}

.hero {
    text-align: center;
    font-size: 1.2;
    margin-bottom: 2rem;
}

</style>