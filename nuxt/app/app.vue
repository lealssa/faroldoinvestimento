<script setup>
const indicesStore = useIndicesStore();
// await callOnce(indicesStore.fetchIndicesOCI)
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
