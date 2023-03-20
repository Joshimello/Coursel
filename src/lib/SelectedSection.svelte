<script>
  import { XIcon } from 'svelte-feather-icons'

  export let selectedCourses, timetableOpen

  const days = ['M', 'T', 'W', 'R', 'F', 'S']
  const times = ['1', '2', '3', '4', 'n', '5', '6', '7', '8', '9', 'a', 'b', 'c']

  let timetable = {}
  times.flatMap(i => days.map(j => j+i)).forEach(i => timetable[i] = [])

  $: {
    times.flatMap(i => days.map(j => j+i)).forEach(i => timetable[i] = [])
    selectedCourses.forEach(c => c.time?c.time.forEach(t => timetable[t] = [...timetable[t], c]):null)
  }

</script>

{#if timetableOpen}
<div class="absolute w-screen h-400vh z-1 py-4 px-48 flex flex-col" style="background: #00000050">
  
  <button
    class="p-1 mb-1 bg-white rounded flex justify-end"
    on:click={() => { timetableOpen = false }}>
    <XIcon />      
  </button>

  <div class="bg-white rounded z-2 grid grid-cols-6 gap-2 p-2">

    {#each Object.entries(timetable) as [time, classes]}
    <div class="bg-gray-100 p-2 text-0.75rem">
      <span class="text-gray-400">{time}</span>
      {#if classes.length}
        {#each classes as clas}
          <span class="block mt-1 truncate">{clas.nameEN}</span>
          <span class="block text-gray-500">{clas.venue}</span>  
        {/each}
      {:else}
        <span>&nbsp;</span>
      {/if}
    </div>
    {/each}

  </div>
</div>
{/if}

