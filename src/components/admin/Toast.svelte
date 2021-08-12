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
      <h3>{toast_value.message}</h3>
      {#if toast_value.type == 'error'}
      <i class="far fa-times-circle"></i>
      {:else if toast_value.type == 'success'}
      <i class="far fa-check-circle"></i>
      {/if}
  </div>
{/if}

<style>
    .snackbar {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 50%;
      min-height: 100px;
      position: fixed;
      z-index: 1000;
      bottom: 1rem;
      left: 25%;
      background: #2C3B6C;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 3px;
      opacity: 75%;
    }
    .snackbar > h3 {
      color: #fff;
      padding: 1rem 0 1rem 0;
    }
    .snackbar > i {
      font-size: 48px;
      padding: 0 0 1rem 0;
    }
    .snackbar-error > i {
      color: #C92F2F;
    }
    .snackbar-success > i{
      color: #2FC93E;
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
    @media only screen and (max-width: 800px) {
      .snackbar {
        width: 90%;
        left: 5%;
      }
    }
</style>