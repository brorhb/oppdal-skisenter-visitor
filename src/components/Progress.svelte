<script>
    export let numerator = 0;
    export let denominator = 0;
    export let description = '';

</script>

<div class="progress-bar">
    <div class="inner"></div>
    <div class="information number">
        <div>{numerator}/{denominator}</div>
        <div>{description}</div>
    </div>
    <div class="circle">
        <div class="bar left" >
            {#if (numerator/denominator*100) <= 50}
                <div class="progress" style={`transform: rotate(${numerator/denominator*360}deg)`}></div>
            {:else}
                <div class="progress" style={`transform: rotate(180deg)`}></div>
            {/if}
        </div>
        <div class="bar right">
            {#if (numerator/denominator*100) <= 50}
                <div class="progress"></div>
            {:else}
                <div class="progress" style={`transform: rotate(${(numerator/denominator*360) - 180}deg)`}></div>
            {/if}
        </div>
    </div>  
</div>

<style>
    .progress-bar {
        height: 100px;
        width: 100px;
        position: relative;
    }
    .progress-bar .inner {
        position: absolute;
        z-index: 6;
        top: 50%;
        left: 50%;
        height: 80px;
        width: 80px;
        margin: -40px 0 0 -40px;
        background: #FAFAFA;
        border-radius: 100%;
    }
    .progress-bar .number {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
    }
    .progress-bar .bar {
        position: absolute;
        height: 100%;
        width: 100%;
        background: #fff;
        -webkit-border-radius: 100%;
        border-radius: 100%;
        clip: rect(0px, 100px, 100px, 50px)
    }
    .progress-bar .progress {
        position: absolute;
        height: 100%;
        width: 100%;
        -webkit-border-radius: 100%;
        border-radius: 100%;
        clip: rect(0px, 50px, 100px, 0px);
        background: #004a7c;
    }
    .progress-bar .circle .left .progress {
        z-index: 1;
    }
    .progress-bar .circle .right {
        transform: rotate(180deg);
        z-index: 3;
    }
</style>