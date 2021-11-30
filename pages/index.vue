<template>
  <div class="flex flex-col items-center w-full font-sans">
    <Navbar></Navbar>
    <Banner></Banner>
    <Alerts :alerts="[
      {message: 'Løypene er ikke lenger aktive. Du kan ikke lenger registrere løypene dine.', timestamp: '2020-04-01T00:00:00.000Z'},
    ]"></Alerts>
  </div>
</template>

<script>
export default {}
</script>
