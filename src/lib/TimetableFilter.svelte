<script>
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
    class="px-4 py-2 bg-white">
    Timetable
  </button>

  {#if timetableOpen}
  <div class="p-4 absolute bg-white shadow-lg grid grid-cols-6 gap-1 rounded-lg mt-1">
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