<script>
  import { SearchIcon, XIcon } from 'svelte-feather-icons'
  
  export let searchFilter
</script>

<div class={`bg-white p-4 shadow-xl flex items-center gap-4 ${$$props.class}`}>

  <SearchIcon size="20" />
  
  <input
    bind:value={searchFilter}
    class="bg-transparent outline-0 flex-1"
    placeholder="Course Name / Professor Name / ID"
  />
  
  <button
    class="flex items-center"
    on:click={() => {searchFilter = ''}}>
    <XIcon size="20" />   
  </button>

</div>
