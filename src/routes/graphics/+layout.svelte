<script>
    let { children} = $props()
</script>
<div id="graphics-container">
{@render children()}
</div>

<style>
    #graphics-container{
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        overflow: hidden;
        margin: 0 0;
        padding: 0 0;
    }
</style>