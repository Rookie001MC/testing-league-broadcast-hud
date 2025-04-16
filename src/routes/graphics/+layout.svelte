<script>
    let { children} = $props()
</script>

<main id="graphics-container">
{@render children()}
</main>

<style>
    #graphics-container{
        height: 1920px;
        width: 1080px;
        position: relative;
        overflow: hidden;
    }
</style>