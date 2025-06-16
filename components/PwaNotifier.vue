<script setup lang="ts">
import { toast } from "vue-sonner";
const { $pwa } = useNuxtApp();

onMounted(() => {
  if ($pwa?.offlineReady) {
    toast.success("App ready to work offline");
  }
});

// Fix: Update the callback parameter type to match the watched value
watch(
  () => $pwa?.needRefresh,
  (newValue: boolean | undefined) => {
    if (newValue) {
      toast.info("New content available! Click to reload.", {
        action: {
          label: "Reload",
          onClick: () => $pwa?.updateServiceWorker(),
        },
        duration: Infinity,
      });
    }
  }
);

watch(
  () => $pwa?.offlineReady,
  (newValue: boolean | undefined) => {
    if (newValue) {
      toast.success("App ready to work offline");
    }
  }
);
</script>
