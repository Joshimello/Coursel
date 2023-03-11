<script lang="ts">
  import '@fontsource/roboto-slab'

  import SearchFilter from './lib/SearchFilter.svelte'
  import TimetableFilter from './lib/TimetableFilter.svelte'
  import DepartmentFilter from './lib/DepartmentFilter.svelte'
  import Card from './lib/Card.svelte'

  import nthuParse from './parser/nthu.ts'
  const courseData = nthuParse('nthu11123.json')

  const departmentData = [...new Set(courseData.map(i => i.department))]

  import MiniSearch from 'minisearch'
  const miniSearch = new MiniSearch({
    fields: ['nameEN', 'nameZH', 'teachersMerged', 'courseID', 'department'],
    storeFields: Object.keys(courseData[0]),
    idField: 'ID'
  })

  miniSearch.addAll(courseData)

  let searchFilter = '', deptFilter = '', engFilter = false, timeFilter = []

  let searchData

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

      <button
        on:click={() => {deptFilter = '', engFilter = false, timeFilter = []}}
        class="px-4 py-2">
        Clear All
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
        <Card {course} />
      {/each}
    {/if}
    </div>
  </div>

</body>

<style>
  .font-serif { font-family: "Roboto Slab", serif; }
</style>