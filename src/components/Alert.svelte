<script>
    export let alert = {};
</script>

<div class="alert">
    <i class="fas fa-exclamation"></i> {alert.message}
</div>

<style>
    .alert {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        text-align: center;
        background-color: #F5E8E8;
        color: #004A7C;
        height: 112px;
        font-size: 26px;
        margin-top: 10px;
    }
    .alert > i {
        margin-right: 10px;
        font-size: 32px;
    }
</style>