<script setup lang="ts">
import {
  PanelLeft,
  PanelRight,
  Columns2,
  ClipboardList,
} from "lucide-vue-next";
import { useActiveElement, useMagicKeys, whenever } from "@vueuse/core";
import { computed } from "vue";

const viewConfigStore = useViewConfigStore();

// Set up magic keys
const activeElement = useActiveElement();
const notUsingInput = computed(
  () =>
    activeElement.value?.tagName !== "INPUT" &&
    !activeElement.value?.isContentEditable
);

const { ctrl_1 } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (e.ctrlKey && e.key === "1" && e.type === "keydown") {
      e.preventDefault();
    }
  },
});

// Cycle through view modes when Ctrl+1 is pressed
whenever(
  () => ctrl_1.value && notUsingInput.value,
  () => {
    viewConfigStore.cycleViewMode();
  }
);
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
        viewConfigStore.currentViewMode === 'preview' ? 'secondary' : 'ghost'
      "
      size="icon"
      @click="viewConfigStore.setViewMode('preview')"
      title="Preview Only"
    >
      <PanelRight class="h-5 w-5" />
    </Button>
    <Button
      :variant="
        viewConfigStore.currentViewMode === 'editorAndPreview'
          ? 'secondary'
          : 'ghost'
      "
      size="icon"
      @click="viewConfigStore.setViewMode('editorAndPreview')"
      title="Editor & Preview"
    >
      <Columns2 class="h-5 w-5" />
    </Button>
    <Button
      :variant="
        viewConfigStore.currentViewMode === 'previewAndAnnotations'
          ? 'secondary'
          : 'ghost'
      "
      size="icon"
      @click="viewConfigStore.setViewMode('previewAndAnnotations')"
      title="Preview & Annotations"
    >
      <ClipboardList class="h-5 w-5" />
    </Button>
  </div>
</template>
