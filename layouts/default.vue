<script setup lang="ts">
import { useMagicKeys } from "@vueuse/core";
import { whenever } from "@vueuse/core";
const commandPaletteStore = useCommandPaletteStore();
import "vue-sonner/style.css";

whenever(
  () => commandPaletteStore.showCommandPalette && useMagicKeys().escape?.value,
  () => {
    commandPaletteStore.closeCommandPalette();
  }
);
</script>

<template>
  <div>
    <Toaster position="bottom-right" closeButton />
    <slot />

    <Dialog v-model:open="commandPaletteStore.showCommandPalette">
      <DialogContent class="overflow-hidden p-0 shadow-lg sm:max-w-lg">
        <CommandPalette />
      </DialogContent>
    </Dialog>
  </div>
</template>
