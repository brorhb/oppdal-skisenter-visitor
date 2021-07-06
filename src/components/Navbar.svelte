<script>
  // List of navigation items
  const navItems = [
    {
      label: "camera",
      route: "/cameras"
    }, 
  ]
</script>

<nav class="navbar">
  <a class="navbrand oppdal-title" href="/">Oppdal Skisenter</a>
    <div>
      {#each navItems as item}
        {#if item.label != "camera"} 
          <a href={item.route}>{item.label}</a>
        {:else}
            <a class="camera-anchor" href={item.route}><div class="div-circle"><i class="fas fa-camera fa-lg"></i></div></a>
        {/if}
      {/each}
  </div>
</nav>

<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #004a7c;
    padding: 1rem 3rem;
  }

  .navbar > a:hover, a:visited, a:link, a:active {
    text-decoration: none;
  }

  .navbar > a:hover {
    cursor: pointer;
    opacity: 90%;
  }

  .navbrand {
    cursor: pointer; 
  }

  .camera-anchor {
    color: #004a7c;
  }

  .div-circle{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 40px;  
    background-color: #FAFAFA;
    border-radius: 50%;
  }

  .div-circle:hover {
    opacity: 90%;
  }
</style>