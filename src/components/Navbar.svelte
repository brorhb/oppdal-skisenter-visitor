<script>
  import { onMount } from 'svelte'
  let comesFromMainSite = false

  onMount(() => {
    comesFromMainSite = document.referrer.includes("oppdalskisenter")
  })

</script>

<nav class="navbar max-width-wrapper">
  <a href="https://oppdalskisenter.no">
    <img src="../../assets/logo.svg" alt="oppdalskisenter-logo"/>
  </a>
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
