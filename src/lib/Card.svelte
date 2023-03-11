<script>
  import {
    MapPinIcon, 
    ClockIcon, 
    AwardIcon, 
    GlobeIcon, 
    UsersIcon, 
    UserPlusIcon, 
    ShieldIcon, 
    InfoIcon, 
    PlusIcon 
  } from 'svelte-feather-icons'

  import '@fontsource/roboto-condensed'

  export let course
</script>

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

    <span class="flex items-center gap-2">
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

<style>
  .font-sans { font-family: "Roboto Condensed", sans-serif; }
</style>