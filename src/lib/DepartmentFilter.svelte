<script>
  export let deptFilter = '', suggestion

  let isFocus = false, textbox

  $: suggest = suggestion.filter(i => i.includes(deptFilter.toUpperCase())).slice(0, 3)
</script>

<div class={`${$$props.class}`}>

  <input
    bind:this={textbox}
    bind:value={deptFilter}
    class="px-4 py-2 bg-white outline-0"
    placeholder="Department"
    on:focus={() => isFocus = true}
    on:blur={() => isFocus = false}
    on:keyup={e => {if(e.key == 'Enter' || e.keyCode === 13){ textbox.blur() }}}
  />
  
  {#if isFocus && deptFilter.length != 0 && suggest.length}
  <div class="px-4 py-2 absolute bg-white shadow-lg rounded-lg mt-1">
    {#each suggest as item}
    <button
      class="block text-sm text-gray-500"
      on:mousedown={() => deptFilter = item}>
      {item}
    </button>
    {/each}
  </div>
  {/if}

</div>