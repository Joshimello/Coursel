<script>
  import { FilterIcon, SettingsIcon, CalendarIcon } from 'svelte-feather-icons'

  import SearchFilter from './SearchFilter.svelte'
  import TimetableFilter from './TimetableFilter.svelte'
  import DepartmentFilter from './DepartmentFilter.svelte'

  export let courseData, searchData, timetableOpen

  let searchFilter = '', deptFilter = '', engFilter = false, timeFilter = []
  const departmentData = [...new Set(courseData.map(i => i.department))]

  import MiniSearch from 'minisearch'
  const miniSearch = new MiniSearch({
    fields: ['nameEN', 'nameZH', 'teachersMerged', 'courseID', 'department'],
    storeFields: Object.keys(courseData[0]),
    idField: 'ID'
  })

  miniSearch.addAll(courseData)

  $: {
    // if is number
    if(!isNaN(searchFilter[0])) {
      searchData = miniSearch.search(searchFilter, {
        fields: ['courseID'],
        fuzzy: 0.2,
        filter: res => (true
          && (timeFilter.length ? timeFilter.some(i => res.time.includes(i)) : res)
          && (deptFilter ? res.department == deptFilter.toUpperCase() : res)
          && (engFilter ? res.language == '英' : res)
        )
      }).slice(0, 10)
    }

    // search is empty but dept is filled
    else if(!searchFilter && deptFilter) {
      searchData = miniSearch.search(deptFilter, {
        fields: ['department'],
        filter: res => (true
          && (timeFilter.length ? timeFilter.some(i => res.time.includes(i)) : res)
          && (engFilter ? res.language == '英' : res)
        )
      })
    }

    // normal search
    else {
      searchData = miniSearch.search(searchFilter, {
        fields: ['nameEN', 'nameZH', 'teachersMerged'],
        fuzzy: 0.5,
        filter: res => (true
          && (timeFilter.length ? timeFilter.some(i => res.time.includes(i)) : res)
          && (deptFilter ? res.department == deptFilter.toUpperCase() : res)
          && (engFilter ? res.language == '英' : res)
        )
      }).slice(0, 10)
    }
  
  }

  let filterOpen = false, settingsOpen = false

</script>

<div class="bg-gray-200 px-48 py-4 mb-8 flex flex-col gap-4">

  <div class="flex gap-2">
    <SearchFilter bind:searchFilter class="flex-1" />
    
    <button
      class="bg-white py-4 px-6 shadow-xl flex items-center"
      on:click={() => {filterOpen = !filterOpen}}>
      <FilterIcon size="16" />
    </button>

    <button
      class="bg-white py-4 px-6 shadow-xl flex items-center"
      on:click={() => {settingsOpen = !settingsOpen}}>
      <SettingsIcon size="16" />
    </button>

    <button
      class="bg-white py-4 px-6 shadow-xl flex items-center"
      on:click={() => {timetableOpen = !timetableOpen}}>
      <CalendarIcon size="16" />
    </button>
  </div>

  {#if filterOpen}
  <div class="flex items-center gap-2">
  
    <DepartmentFilter bind:deptFilter suggestion={departmentData} />
    <TimetableFilter bind:timeFilter />

    <button on:click={() => {engFilter = !engFilter}} class="px-4 py-2 bg-white">
      Offered in {engFilter ? 'English' : 'All Language'}
    </button>

    <button
      on:click={() => {deptFilter = '', engFilter = false, timeFilter = []}}
      class="px-4 py-2">
      Clear All
    </button>
  </div>
  {/if}

  {#if settingsOpen}
  <div class="flex items-center gap-2">
  
    <select class="bg-white px-4 py-2.2" disabled>
      {#each ['nthu11123', 'nthu11122', 'nthu11121'] as set}
      <option>{set}</option>
      {/each}
    </select>

    <select class="bg-white px-4 py-2.2" disabled>
      {#each ['English', 'Chinese'] as set}
      <option>{set}</option>
      {/each}
    </select>

    <select class="bg-white px-4 py-2.2" disabled>
      {#each ['Light', 'Dark'] as set}
      <option>{set}</option>
      {/each}
    </select>
  </div>
  {/if}

</div>