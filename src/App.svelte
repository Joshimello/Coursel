<script lang="ts">

  import nthuParse from './parser/nthu.ts'
  const data = nthuParse('nthu11123.json')

  import MiniSearch from 'minisearch'
  const miniSearch = new MiniSearch({
    fields: ['nameEN', 'nameZH', 'teachersMerged'],
    storeFields: Object.keys(data[0]),
    idField: 'ID',
    searchOptions: {
      fuzzy: 0.5
    }
  })

  miniSearch.addAll(data)

  let value = ''
  
  $: searchData = miniSearch.search(value)

</script>

<body class="">

  <input bind:value class="bg-transparent" />

  {#if searchData}
    {#each searchData as course}

      <div>
      {course.nameEN}
      </div>

    {/each}
  {/if}

</body>