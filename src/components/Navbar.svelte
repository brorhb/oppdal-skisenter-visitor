<script>
  // List of navigation items
  const navItems = [
    {
      label: "camera",
      route: "/cameras"
    }, 
  ]
</script>

<nav class="pa3 bb b--black-10 navbar">
  <a class="link dim b dib mr3 navbrand" href="/">Oppdal Skisenter</a>
    <div>
      {#each navItems as item}
        {#if item.label != "camera"} 
          <a class="link dim gray dib mr3 pointer" href={item.route}>{item.label}</a>
        {:else}
            <a class="link dim gray dib mr3 pointer camera-anchor" href={item.route}><div class="div-circle"><i class="fas fa-camera fa-lg"></i></div></a>
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
  }

  .navbrand {
    font-size:26px;
    color: white; 
    outline: none; 
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
    background-color: white; 
    border-radius: 50%;
  }
</style>