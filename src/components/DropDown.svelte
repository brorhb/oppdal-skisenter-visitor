<script>
  import { onMount } from 'svelte';
  export let selected_option;
  export let options;
  export let chosen_zone;
  let init_option;
  let root;

  $: selected_option = updateSelected(chosen_zone);

  function updateSelected(chosen_zone) {
    if (chosen_zone) {
      selected_option = chosen_zone;
      init_option = selected_option;
    };
  };

  onMount(async () => {
    if (options) {
      const wrapper = root.querySelector('.custom-select-wrapper');
      wrapper.addEventListener('click', function() {
      this.querySelector('.custom-select').classList.toggle('open');
      });

      for (const option of document.querySelectorAll(".custom-option")) {
        option.addEventListener('click', function() {
            if (!this.classList.contains('selected')) {
                this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
                this.classList.add('selected');
                this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.textContent;
            };
        });
      };
    }
  });

  window.addEventListener('click', function(e) {
    if (options) {
      const select = document.querySelector('.custom-select')
      if (!select.contains(e.target)) {
          select.classList.remove('open');
      }
    }
  });
</script>

<div bind:this={root}>
  {#if options} 
    <div class="custom-select-wrapper">
      <div class="custom-select">
          <div class="custom-select__trigger"><span>{selected_option ? selected_option : init_option}</span>
              <div class="arrow"></div>
          </div>
          <div class="custom-options">
              <div class="custom-option selected" data-value={init_option} on:click={() => selected_option = init_option}>{init_option}</div>
              {#each options as option}
                <div class="custom-option" data-value={option} on:click={() => selected_option = option}>{option}</div>
              {/each}
          </div>
      </div>
    </div>
  {/if}
</div>

<style>
.custom-select-wrapper {
     position: relative;
     user-select: none;
     width: 100%;
}
 .custom-select {
     position: relative;
     display: flex;
     flex-direction: column;
     border-width: 0 2px 0 2px;
     border-style: solid;
     border-color: #305c91;
}
 .custom-select__trigger {
     position: relative;
     display: flex;
     align-items: center;
     justify-content: space-between;
     padding: 0 22px;
     font-size: 20px;
     font-weight: 300;
     color: #3b3b3b;
     height: 60px;
     line-height: 60px;
     background: #ffffff;
     cursor: pointer;
     border-width: 2px 0 2px 0;
     border-style: solid;
     border-color: #305c91;
}
 .custom-options {
     position: absolute;
     display: block;
     top: 100%;
     left: 0;
     right: 0;
     border: 2px solid #305c91;
     border-top: 0;
     background: #fff;
     transition: all 0.5s;
     opacity: 0;
     visibility: hidden;
     pointer-events: none;
     z-index: 2;
}
:global(.open .custom-options) {  /*Global is needed to ensure that the Svelte compiler does not remove the CSS rule */
     opacity: 1;
     visibility: visible;
     pointer-events: all;
}
 .custom-option {
     position: relative;
     display: block;
     padding: 0 22px 0 22px;
     font-size: 22px;
     font-weight: 300;
     color: #3b3b3b;
     line-height: 60px;
     cursor: pointer;
     transition: all 0.5s;
}
 .custom-option:hover {
     cursor: pointer;
     background-color: #BABABA;
}
 .custom-option.selected {
     color: #ffffff;
     background-color: #305c91;
}
.arrow {
     position: relative;
     height: 15px;
     width: 15px;
}
 .arrow::before, .arrow::after {
     content: "";
     position: absolute;
     bottom: 0px;
     width: 0.15rem;
     height: 100%;
     transition: all 0.5s;
}
 .arrow::before {
     left: -5px;
     transform: rotate(-45deg);
     background-color: #305c91;
}
 .arrow::after {
     left: 5px;
     transform: rotate(45deg);
     background-color: #305c91;
}
:global(.open .arrow::before) {
     left: -5px;
     transform: rotate(45deg);
}
:global(.open .arrow::after) {
     left: 5px;
     transform: rotate(-45deg);
}




</style>