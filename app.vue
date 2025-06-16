<script setup>
import { useNuxtApp, onMounted, watch } from "#app";
import { useToast } from "@/components/ui/sonner";
import { Sonner } from "@/components/ui/sonner";

const { $pwa } = useNuxtApp();
const toast = useToast();

onMounted(() => {
  if ($pwa.offlineReady) {
    toast.success("App ready to work offline");
  }
});

watch($pwa.needRefresh, (newValue) => {
  if (newValue) {
    toast.info("New content available! Click to reload.", {
      action: {
        label: "Reload",
        onClick: () => $pwa.updateServiceWorker(),
      },
      duration: Infinity,
    });
  }
});

watch($pwa.offlineReady, (newValue) => {
  if (newValue) {
    toast.success("App ready to work offline");
  }
});
</script>

<template>
  <div>
    <VitePwaManifest />
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <Sonner />
  </div>
</template>
