<script setup lang="ts">
import PwaNotifier from "./components/PwaNotifier.vue";
</script>

<template>
  <div>
    <VitePwaManifest />
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <PwaNotifier />
      <NuxtPage />
    </NuxtLayout>
    <Sonner />
  </div>
</template>
