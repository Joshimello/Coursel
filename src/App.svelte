<!-- 
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
  import '@fontsource/roboto-slab'

  import SelectedSection from './lib/SelectedSection.svelte'
  import SearchSection from './lib/SearchSection.svelte'  
  import Card from './lib/Card.svelte'

  import nthuParse from './parser/nthu.ts'
  const courseData = nthuParse('nthu11123.json')

  let searchData = []

  let selectedCourses = courseData.slice(0, 10)
  $: selectedCourses, console.log(selectedCourses)

  let timetableOpen
</script>
  
<body class="font-serif">

  <SelectedSection bind:selectedCourses bind:timetableOpen />
  <SearchSection bind:searchData bind:timetableOpen {courseData} />

  <div class="px-48">
    <span class="block pb-8">
      {searchData.length} courses found:
    </span>
    
    <div class="grid grid-cols-2 gap-8 font">
    {#if searchData}
      {#each searchData as course}
        <Card bind:selectedCourses {course} />
      {/each}
    {/if}
    </div>
  </div>

</body>

<style>
  .font-serif { font-family: "Roboto Slab", serif; }
</style>