<template>
  <max-wrapper class="md:px-0 px-4">
    <div class="mt-4">
      <h1 class="font-bold text-4xl">Sikkerhet</h1>
      <div class="flex flex-col lg:flex-row w-full mt-4">
        <div class="p-4 rounded-xl w-full lg:w-1/3 flex-col bg-accent-color dark:bg-gray-900">
          <div class="text-xs font-bold pb-4">Skipatrulje</div>
          <img src="/assets/skipatrulje-icon.svg" alt="Skipatrulje symbol">
          <div class="text-2xl font-bold mt-2">
            Kontakt skipatrulje ved skader eller uhell:
            <a class="underline cursor-pointer" href="tel:+4772404480">+4772404480</a>
          </div>
          <div class="mt-2 text-sm">
            Du kan også varsle nærmeste billettkontor eller heishus, så hjelper vi deg.
          </div>
        </div>
        <div class="lg:px-2 py-2"></div>
        <avalanche :avalancheWarnings="avalancheWarnings"></avalanche>
      </div>
    </div>
  </max-wrapper>
</template>
<script>
export default {
  props: ['avalancheWarnings'],
}
</script>