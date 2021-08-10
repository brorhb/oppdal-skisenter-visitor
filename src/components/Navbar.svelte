<nav class="navbar max-width-wrapper">
  <a href="https://oppdalskisenter.no"><i class="fas fa-angle-left"></i> Tilbake til oppdalskisenter.no</a>
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
  .navbar > a:hover, a:visited, a:link, a:active {
    text-decoration: none;
  }
  .navbar > a:hover {
    cursor: pointer;
    opacity: 70%;
  }
  .navbar > img {
    margin-right: 1rem;
  }
  @media only screen and (max-width: 1000px) {
    .navbar {
      padding: 1rem 5rem 0 5rem;
      display: flex;
      justify-content: space-evenly;
    }
    .navbar > img {
      margin-right: 0;
    }
}
</style>