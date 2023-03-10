<script lang="ts">
  import { SearchIcon, XIcon, FilterIcon, MapPinIcon, ClockIcon, AwardIcon, GlobeIcon, UsersIcon, UserPlusIcon, ShieldIcon, InfoIcon, PlusIcon } from 'svelte-feather-icons'
  import '@fontsource/roboto-condensed'
  import '@fontsource/roboto-slab'

  import nthuParse from './parser/nthu.ts'
  const courseData = nthuParse('nthu11123.json')

  import MiniSearch from 'minisearch'
  const miniSearch = new MiniSearch({
    fields: ['nameEN', 'nameZH', 'teachersMerged', 'courseID'],
    storeFields: Object.keys(courseData[0]),
    idField: 'ID'
  })

  miniSearch.addAll(courseData)

  let value = 'thesis', deptFilter, engFilter, timetableOpen = false

  $: engFilter, console.log(engFilter)

  $: searchData = (
    isNaN(value[0]) ?
    miniSearch.search(value, {
      fields: ['nameEN', 'nameZH', 'teachersMerged'],
      fuzzy: 0.5,

      filter: res => (
        (deptFilter ? res.department == deptFilter.toUpperCase() : res) &&
        (engFilter ? res.language == '英' : res)
      )
    }) :
    miniSearch.search(value, {
      fields: ['courseID'],
      fuzzy: 0.1,

      filter: (res) => deptFilter ? res.department == deptFilter.toUpperCase() : res
    })
  ).slice(0, 50)

</script>
  
<body class="font-serif">

  <div class="bg-gray-200 px-48 py-4">
    <div class="bg-white p-4 my-4 shadow-xl flex items-center gap-4">
      <SearchIcon size="20" />
      <input bind:value class="bg-transparent outline-0 flex-1" placeholder="Course Name / Professor Name / ID" />
      <XIcon size="20" />
    </div>

    <div>
      <span class="block py-1">Filters:</span>
    </div>

    <div class="flex items-center gap-2">
      <input bind:value={deptFilter} class="px-4 py-2 bg-white outline-0" placeholder="Department">
      
      <button on:click={() => {engFilter = !engFilter}} class="px-4 py-2 bg-white">
        {#if engFilter}
        <span class="mr-2">Offered in English</span>
        {:else}
        <span class="mr-2">Offered in All Language</span>
        {/if}
      </button>

        
      <div>
        <button on:click={() => {timetableOpen = !timetableOpen}} class="px-4 py-2 bg-white">
          Timetable
        </button>

        {#if timetableOpen}
        <div class="p-4 absolute bg-white shadow-lg gap-1 flex flex-col gap-1">
          <div class="flex gap-1">
          {#each [' ', 'M', 'T', 'W', 'R', 'F', 'S'] as day}
            <div class="w-6 h-6 bg-gray-300 rounded flex items-center justify-center">{day}</div>
          {/each}
          </div>

          {#each ['1', '2', '3', '4', 'n', '5', '6', '7', '8', '9', 'a', 'b', 'c'] as time}
          <div class="flex gap-1">
            <div class="w-6 h-6 flex bg-gray-300 rounded items-center justify-center">{time}</div>
            {#each ['M', 'T', 'W', 'R', 'F', 'S'] as day}
            <button class="w-6 h-6 bg-gray-200 rounded"></button>
            {/each}
          </div>
          {/each}
        </div>
        {/if}
      </div>

    </div>

      
  </div>

  <div class="px-48 py-8">
    <span class="block pb-8">
      {searchData.length} courses found:
    </span>
    
    <div class="grid grid-cols-2 gap-8 font">
    {#if searchData}
      {#each searchData as course}
        <div class="flex flex-col bg-gray-100 shadow-lg rounded-lg p-6 font-sans text-sm text-slate-600 transition duration-400 hover:shadow-2xl">
          
          <span class="text-0.75rem text-slate-500">
            {course.department} {course.courseID}
          </span>
          <span class="truncate text-xl text-slate-800">
            {course.nameEN}
          </span>
          <span>
            {course.teachers.map(i => i.en).join(' & ')}
          </span>
          
          <div class="border-1 border-slate-300 my-3" />

          <div class="grid grid-cols-2 gap-y-1">
            <span class="flex items-center gap-2">
              <AwardIcon size="14" />
              {course.credits} Credits
            </span>

            <span class="flex items-center gap-2">
              <GlobeIcon size="14" />
              {course.language == '中' ? 'Chinese' : 'English'}
            </span>

            <span class="flex items-center gap-2">
              <MapPinIcon size="14" />
              {course.venue || 'Unset'}
            </span>

            <span class="flex items-center gap-2">
              <ClockIcon size="14" />
              {course.time.join(', ') || 'Unset'}
            </span>

            <span class="flex items-center gap-2">
              <UsersIcon size="14" />
              {course.capacity || 'Unset'}
            </span>

            <span>
              <UserPlusIcon size="14" />
              {course.freshmanCapacity}
            </span>
          </div>

          <div class="border-1 border-slate-300 my-3" />

          <div class="flex flex-col gap-y-1 mb-8">
            {#if course.description.trim()}
            <span class="flex items-center gap-2">
              <InfoIcon size="14" />
              <div class="flex-1">
                {course.description}
              </div>
            </span>
            {/if}

            {#if course.limits}
            <span class="flex items-center gap-2">
              <ShieldIcon size="14" />
              <div class="flex-1">
                {course.limits}
              </div>
            </span>
            {/if}
          </div>

          <button class="mt-auto p-2 bg-gray-200 rounded flex items-center justify-center transition duration-100 hover:bg-gray-300">
            <PlusIcon size="20" />
          </button>

        </div>
      {/each}
    {/if}
    </div>
  </div>

</body>

<style>
  .font-serif { font-family: "Roboto Slab", serif; }
  .font-sans { font-family: "Roboto Condensed", sans-serif; }
</style>