<script>    
    import { onDestroy } from 'svelte';
    import { toast } from '../../stores/Toast'

    let toast_value;
    const unsubscribe = toast.subscribe(value => {
        toast_value = value;
    });
    onDestroy(unsubscribe);
</script>

{#if toast_value.show}
  <div class={`snackbar snackbar-${toast_value.type}`}>
      {toast_value.message}
  </div>
{/if}

<style>
    .snackbar {
      min-width: 250px;
      margin-left: -125px;
      color: #fff;
      text-align: center;
      padding: 16px;
      position: fixed;
      z-index: 1;
      left: 50%;
      bottom: 50px;
      border-radius: 8px;
      box-shadow: 0px 0px 7px 0px rgba(0,0,0,0.75);
    }
    .snackbar-error {
      background-color: #F93154;
    }
    .snackbar-success{
      background-color: #00B74A;
    }

    /* Animations to fade the snackbar in and out */
    @-webkit-keyframes fadein {
      from {bottom: 0; opacity: 0;}
      to {bottom: 30px; opacity: 1;}
    }

    @keyframes fadein {
      from {bottom: 0; opacity: 0;}
      to {bottom: 30px; opacity: 1;}
    }

    @-webkit-keyframes fadeout {
      from {bottom: 30px; opacity: 1;}
      to {bottom: 0; opacity: 0;}
    }

    @keyframes fadeout {
      from {bottom: 30px; opacity: 1;}
      to {bottom: 0; opacity: 0;}
    }
</style>