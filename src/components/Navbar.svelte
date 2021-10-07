<script>
  import { onMount } from 'svelte'
  let isPwa = false

  onMount(() => {
    isPwa = window.navigator.standalone
  })

</script>

<nav class="navbar max-width-wrapper">
  {#if !isPwa}
    <a href="https://oppdalskisenter.no">Gå til oppdalskisenter.no</a>
  {/if}
  <img src="../../assets/logo.svg" alt="oppdalskisenter-logo"/>
</nav>

<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 1rem;
  }
  .navbar > a {
    font-size: 1.25rem;
    color: #2C3B6C;
    font-family: Work Sans;
	  font-style: normal;
    font-weight: 600;
  }
  .navbar > a:hover {
    cursor: pointer;
    opacity: 70%;
  }
  .navbar > img {
    margin-right: 1rem;
  }
  @media only screen and (max-width: 1000px) {
    .navbar > img {
      margin-right: 1rem;
    }
    .navbar > * {
      padding: 1rem;
    }
    
}
</style>