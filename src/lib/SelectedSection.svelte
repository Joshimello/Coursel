<script>
  export let selectedCourses

  const days = ['M', 'T', 'W', 'R', 'F', 'S']
  const periods = ['1', '2', '3', '4', 'n', '5', '6', '7', '8', '9', 'a', 'b', 'c']
  const timetable = periods.map(i => days.map(j => j + i)).flat()

  let open = false

</script>

{#if open}
<div class="fixed h-screen w-screen z-1 py-4 px-96" style="background: #00000050">
  <div class="bg-white rounded z-2 grid grid-cols-6 gap-2 p-2">
    
    {#each timetable as time}
    <div class="bg-gray-100 p-2">
      {time}
    </div>
    {/each}

  </div>
</div>
{/if}