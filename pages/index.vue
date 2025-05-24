<script setup lang="ts">
import { cn } from "~/lib/utils";

const viewConfigStore = useViewConfigStore();

const editorPanelClasses = computed(() =>
  cn(
    "bg-card text-card-foreground overflow-y-auto p-4",
    viewConfigStore.currentViewMode === "split" ? "flex-1" : "w-full"
  )
);

const previewPanelClasses = computed(() =>
  cn(
    "bg-card text-card-foreground overflow-y-auto p-4",
    viewConfigStore.currentViewMode === "split" ? "flex-1" : "w-full"
  )
);
</script>

<template>
  <div class="bg-background text-foreground flex h-screen flex-col">
    <AppHeader />

    <main class="flex flex-1 flex-row overflow-hidden">
      <div v-if="viewConfigStore.showEditor" :class="editorPanelClasses">
        <EditorMarkdownEditor />
      </div>

      <div
        v-if="viewConfigStore.currentViewMode === 'split'"
        class="bg-border w-px shrink-0"
      ></div>

      <div v-if="viewConfigStore.showPreview" :class="previewPanelClasses">
        <EditorMarkdownPreview />
      </div>
    </main>
  </div>
</template>
