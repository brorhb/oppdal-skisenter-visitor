<script>
    export let alert = {};
</script>

<div class="paragraph-big alert">
    <i class="fas fa-exclamation"></i> {alert.message}
</div>

<style>
    .alert {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        background-color: #F5E8E8;
        color: #004A7C;
        padding: 1rem;
        margin: 1rem 3rem 0 3rem;
    }
    .alert > i {
        margin-right: 10px;
        font-size: 32px;
    }
</style>