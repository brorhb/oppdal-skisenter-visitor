<script>
    export let alert = {};
</script>

<div class="alert">
    <i class="fas fa-exclamation"></i> 
    <div>
        <h3>Beskjed:</h3>
        <p>{alert.message}</p>
    </div>
</div>

<style>
    .alert {
        display: flex;
        align-items: center;
        border-radius: 9px;
        min-height: 67px;
        background-color: #FFF0E4;
    }
    .alert > i {
        font-size: 39px;
        margin: 0 22px 0 22px;
    }
</style>