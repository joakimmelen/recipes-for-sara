<script lang="ts">
    import Login from "../lib/Login.svelte"

</script>

<Login />

<div class="hero">
    <div class="hero-image">
        <h1 class="animate-charcter">Welcome to recipes for Sara</h1>

    </div>
</div>

           

<style>

.animate-charcter
{
   text-transform: uppercase;
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

h1 {
    position: absolute;
    right: 120px;
    top: 90px;
    font-size: clamp(1.75rem, 3vw, 6rem);
}

.hero-image {
  background-image: url("/images/recipes-for-sara-bigpic.jpg"); /* The image used */
  background-color: #cccccc; /* Used if the image is unavailable */
  height: 500px; /* You must set a specified height */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
}

</style>