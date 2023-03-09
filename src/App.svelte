<script lang="ts">

  import Fuse from 'fuse.js'
  import nthuParse from './parser/nthu.ts'

  let value = ''
  let searchData

  const data = nthuParse('nthu11123.json')

  const fuse = new Fuse(data, {
    // keys: Object.keys(data[0])
    keys: ['nameEN', 'nameZH', 'teacher.en', 'teacher.zh']
  })

  $: searchData = fuse.search(value, { limit: 20 })

</script>

<body class="">

  <input bind:value class="bg-transparent" />

  {#if searchData}
    {#each searchData as course}

      <div>
      {course.item.nameEN}
      </div>

    {/each}
  {/if}

</body>