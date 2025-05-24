<script setup lang="ts">
import { cn } from "~/lib/utils";

definePageMeta({
  layout: "default",
});

const viewConfigStore = useViewConfigStore();

const panelBaseClass = "bg-card text-card-foreground overflow-y-auto";

const editorPanelClass = computed(() => {
  if (viewConfigStore.currentViewMode === "editorAndPreview") {
    return cn(panelBaseClass, "flex-1 basis-1/2");
  }
  return cn(panelBaseClass, "w-full"); // For 'editor' mode
});

const previewPanelClass = computed(() => {
  if (
    viewConfigStore.currentViewMode === "editorAndPreview" ||
    viewConfigStore.currentViewMode === "previewAndAnnotations"
  ) {
    return cn(panelBaseClass, "flex-1 basis-1/2");
  }
  return cn(panelBaseClass, "w-full"); // For 'preview' mode
});

const annotationsPanelClass = computed(() => {
  if (viewConfigStore.currentViewMode === "previewAndAnnotations") {
    return cn(panelBaseClass, "flex-1 basis-1/2");
  }
  return cn(panelBaseClass, "w-full"); // Fallback, not visible alone
});

const previewContentClass = computed(() =>
  cn(
    "p-4",
    viewConfigStore.currentViewMode === "preview" && "mx-auto max-w-4xl"
  )
);
</script>

<template>
  <div class="bg-background text-foreground flex h-screen flex-col">
    <AppHeader />
    <main class="flex flex-1 flex-row overflow-hidden">
      <div v-if="viewConfigStore.showEditor" :class="editorPanelClass">
        <div class="flex h-full flex-col p-4">
          <EditorMarkdownEditor class="min-h-0 flex-1" />
        </div>
      </div>

      <div
        v-if="viewConfigStore.currentViewMode === 'editorAndPreview'"
        class="bg-border w-px shrink-0"
      />

      <div v-if="viewConfigStore.showPreview" :class="previewPanelClass">
        <div :class="previewContentClass">
          <EditorMarkdownPreview />
        </div>
      </div>

      <div
        v-if="viewConfigStore.currentViewMode === 'previewAndAnnotations'"
        class="bg-border w-px shrink-0"
      />

      <div
        v-if="viewConfigStore.showAnnotationsPanel"
        :class="annotationsPanelClass"
      >
        <AnnotationsEditor />
      </div>
    </main>
  </div>
</template>
