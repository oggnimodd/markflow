<script setup lang="ts">
import { PanelLeft, PanelRight, Columns2 } from "lucide-vue-next";

const viewConfigStore = useViewConfigStore();
</script>

<template>
  <div class="flex space-x-1">
    <Button
      :variant="
        viewConfigStore.currentViewMode === 'editor' ? 'secondary' : 'ghost'
      "
      size="icon"
      @click="viewConfigStore.setViewMode('editor')"
      title="Editor Only"
    >
      <PanelLeft class="h-5 w-5" />
    </Button>
    <Button
      :variant="
        viewConfigStore.currentViewMode === 'split' ? 'secondary' : 'ghost'
      "
      size="icon"
      @click="viewConfigStore.setViewMode('split')"
      title="Split View"
    >
      <Columns2 class="h-5 w-5" />
    </Button>
    <Button
      :variant="
        viewConfigStore.currentViewMode === 'preview' ? 'secondary' : 'ghost'
      "
      size="icon"
      @click="viewConfigStore.setViewMode('preview')"
      title="Preview Only"
    >
      <PanelRight class="h-5 w-5" />
    </Button>
  </div>
</template>
