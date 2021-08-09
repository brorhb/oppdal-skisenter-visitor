<script>
  import { selected_zone } from '../stores/SelectedZoneStore';
  import { onMount } from 'svelte';
  export let options;
  export let zones;
  export let lifts;
  
  let selected_option = $selected_zone;
  let init_option = selected_option;
  let root;

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
            };
        });
      };
    };
  });

  window.addEventListener('click', function(e) {
    if (options) {
      const select = document.querySelector('.custom-select')
      if (!select.contains(e.target)) {
          select.classList.remove('open');
      };
    };
  });

  function get_status(chosen_zone) {
    if (chosen_zone) {
      if (chosen_zone == "Alle" || chosen_zone == "Transport") {
        return "";
      } else {
        let zoneID = (zones.find(zone => zone.name == chosen_zone)).id;
        let lifts_in_zone = lifts.filter(lift => lift.zone == zoneID);
        for (var i=0; i<lifts_in_zone.length; i++) {
          if (lifts_in_zone[i].status == "open") {
            return "Åpen";
          };
        };
        return "Stengt";
      };  
    } else {
      return "Ukjent status";
    };
  }

  function handleClick(option) {
    selected_option = option;
    selected_zone.update(value => value = selected_option);
  };
</script>

<div bind:this={root}>
  {#if options} 
    <div class="custom-select-wrapper">
      <div class="custom-select">
          <div class="custom-select__trigger"><div class="mobile-h3 selected-text">{selected_option}</div>
              <div class="arrow"></div>
          </div>
          <div class="custom-options">
              <div class="custom-option selected paragraph" data-value={init_option} on:click={() => handleClick(init_option)}><div>{init_option}</div><div style={get_status(init_option) == "Åpen" ? "color: #2FC93E" : "color: #A0B2DC"}>{get_status(init_option)}</div></div>
              {#each options as option}
                {#if option == "Transport"}
                  <div class="custom-option paragraph" data-value={option} on:click={() => handleClick(option)}><div>Vis løyper mellom skiområdene</div></div>
                {:else if option == "Alle"}
                  <div class="custom-option paragraph" data-value={option} on:click={() => handleClick(option)}><div>Vis alle løyper</div></div>
                {:else}
                  <div class="custom-option paragraph" data-value={option} on:click={() => handleClick(option)}><div>{option}</div><div style={get_status(option) == "Åpen" ? "color: #2FC93E" : "color: #A0B2DC"}>{get_status(option)}</div></div>
                {/if}
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
.selected-text {
  color: white;
}
.custom-select {
  position: relative;
  display: flex;
  flex-direction: column;
}
.custom-select__trigger {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
  font-size: 20px;
  font-weight: 300;
  color: #FFFFFF;
  height: 34px;
  line-height: 60px;
  background: #2C3B6C;
  cursor: pointer;
  border-radius:4px;
}
.custom-options {
  position: absolute;
  display: block;
  top: 100%;
  left: 0;
  right: 0;
  border: 2px solid #2C3B6C;
  border-top: 4px solid #2C3B6C;
  border-radius: 4px;
  margin-top: -4px;
  background: #FFFFFF;
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
  padding: 0.5rem 0.5rem 0.3rem 0.5rem;
  cursor: pointer;
  transition: all 0.5s;
  display: flex;
  flex-direction: row;
  justify-content: space-between;  
}
.custom-option:not(:last-child):after {
  content: "";
  background: #A0B2DC;
  position: absolute;
  bottom: 0;
  left: 0.5rem;
  right: 0.5rem;
  height: 1px;
}
.custom-option:hover {
  cursor: pointer;
  background-color: #F4F8FF;
}
.custom-option.selected {
  font-weight: 700;
}
.paragraph {
	font-size: 0.8125rem; /*13px*/
	font-weight: normal;
	line-height: 15px;
}

.arrow {
  position: relative;
  height: 10px;
  width: 10px;
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
  left: -3px;
  transform: rotate(-45deg);
  background-color: #FFFFFF;
}
.arrow::after {
  left: 3px;
  transform: rotate(45deg);
  background-color: #FFFFFF;
}
:global(.open .arrow::before) {
  left: -3px;
  transform: rotate(45deg);
}
:global(.open .arrow::after) {
  left: 3px;
  transform: rotate(-45deg);
}




</style>