<!-- 
timetable clear
clear all filter
show all dept class when no input

course timetable
course selection
course saving
theme

dynamic dataset
optional fetch data
language
responsive

reviews
sort by reviews
 -->

<script lang="ts">
  import { FilterIcon, MapPinIcon, ClockIcon, AwardIcon, GlobeIcon, UsersIcon, UserPlusIcon, ShieldIcon, InfoIcon, PlusIcon } from 'svelte-feather-icons'
  import '@fontsource/roboto-condensed'
  import '@fontsource/roboto-slab'

  import SearchFilter from './lib/SearchFilter.svelte'
  import TimetableFilter from './lib/TimetableFilter.svelte'
  import DepartmentFilter from './lib/DepartmentFilter.svelte'

  import nthuParse from './parser/nthu.ts'
  const courseData = nthuParse('nthu11123.json')

  const departmentData = [...new Set(courseData.map(i => i.department))]

  import MiniSearch from 'minisearch'
  const miniSearch = new MiniSearch({
    fields: ['nameEN', 'nameZH', 'teachersMerged', 'courseID'],
    storeFields: Object.keys(courseData[0]),
    idField: 'ID'
  })

  miniSearch.addAll(courseData)

  let searchFilter = 'thesis', deptFilter, engFilter, timeFilter = []

  $: searchData = (
    isNaN(searchFilter[0]) ?
    miniSearch.search(searchFilter, {
      fields: ['nameEN', 'nameZH', 'teachersMerged'],
      fuzzy: 0.5,

      filter: res => (true
        && (timeFilter.length ? timeFilter.some(i => res.time.includes(i)) : res)
        && (deptFilter ? res.department == deptFilter.toUpperCase() : res)
        && (engFilter ? res.language == '英' : res)
      )
    }) :
    miniSearch.search(searchFilter, {
      fields: ['courseID'],
      fuzzy: 0.1,

      filter: (res) => deptFilter ? res.department == deptFilter.toUpperCase() : res
    })
  ).slice(0, 10)

</script>
  
<body class="font-serif">

  <div class="bg-gray-200 px-48 py-4">
    
    <SearchFilter bind:searchFilter class="my-4" />

    <span class="block py-1">Filters:</span>
    <div class="flex items-center gap-2">
    
      <DepartmentFilter bind:deptFilter suggestion={departmentData} />
      <TimetableFilter bind:timeFilter />

      <button on:click={() => {engFilter = !engFilter}} class="px-4 py-2 bg-white">
        Offered in {engFilter ? 'English' : 'All Language'}
      </button>
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