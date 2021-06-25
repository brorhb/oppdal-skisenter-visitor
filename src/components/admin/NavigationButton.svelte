<script>
    import { navigateTo } from 'svelte-router-spa'
    export let faIcon = 'exclamation' //default icon
    export let title = ''
    export let navigate = ''
    export let onclick = undefined;
</script>

<div class="navigation-item" on:click={() => onclick ? onclick() : navigateTo(`${navigate}`)}>
    <div class="navigation-icon">
      <i class={`fas fa-${faIcon}`}></i>
    </div>
    <div class="navigation-title">{title}</div>
</div>

<style>
    .navigation-item {
      width: 150px;
      height: 150px;
      box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.75);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      cursor: pointer;
      border-radius: 12px;
      margin: 30px;
    }
    .navigation-item:hover {
      background-color: rgb(236, 236, 236);
    }
    .navigation-icon {
      font-size: 56px;
      margin-bottom: 20px;
    }
    @media only screen and (max-width: 600px) {
      .navigation-item {
        margin: 0;
        margin-top: 30px;
      }
    }
</style>
