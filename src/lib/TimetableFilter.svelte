<script>
  import { XIcon } from 'svelte-feather-icons'

  const days = ['M', 'T', 'W', 'R', 'F', 'S']
  const periods = ['1', '2', '3', '4', 'n', '5', '6', '7', '8', '9', 'a', 'b', 'c']

  let timetableOpen = false

  let timetable = {}
  periods.map(period => days.map(day => { timetable[day + period] = false }))

  $: timeFilter = Object.entries(timetable).filter(i => i[1]).map(i => i[0])
  export let timeFilter
</script>

<div class={`${$$props.class}`}>

  <button
    on:click={() => {timetableOpen = !timetableOpen}}
    class="px-4 py-2 bg-white outline-0">
    {#if timeFilter.length}
    {timeFilter.sort((a, b) => days.indexOf(a[0]) - days.indexOf(b[0])).join(', ')}
    {:else}
    Timetable
    {/if}
  </button>

  {#if timetableOpen}
  <div class="p-4 absolute bg-white shadow-lg grid grid-cols-6 gap-1 rounded-lg mt-1">
    <button
      class="h-7 bg-gray-200 rounded flex items-center justify-center col-span-5 text-gray-500 transition duration-100 hover:bg-gray-300 mb-1 text-sm"
      on:click={() => Object.keys(timetable).map(i => {timetable[i] = false})}>
      Clear All
    </button>

    <button
      class="h-7 bg-gray-200 rounded col-span-1 flex items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-300"
      on:click={() => timetableOpen = false}>
      <XIcon size="20" />
    </button>

    {#each Object.keys(timetable) as time}
    <button 
      class="w-7 h-7 bg-gray-200 rounded flex items-center justify-center transition duration-100"
      class:bg-gray-400={timetable[time]}
      class:hover:bg-gray-300={!timetable[time]}
      class:h-5={'n9'.includes(time[1])}
      class:my-1={'n9'.includes(time[1])}
      on:click={() => {timetable[time] = !timetable[time]}}>
      
      <span 
        class="text-0.75rem text-gray-400"
        class:text-white={timetable[time]}>
        {time}
      </span>
      
    </button>
    {/each}
  </div>
  {/if}

</div>