<script setup lang="ts">
import { cn } from "~/lib/utils";

const viewConfigStore = useViewConfigStore();

const isSplitMode = computed(() => viewConfigStore.currentViewMode === "split");

const panelClass = computed(() =>
  cn(
    "bg-card text-card-foreground overflow-y-auto",
    isSplitMode.value ? "flex-1" : "w-full"
  )
);

const previewContentClass = computed(() =>
  cn("p-4", !isSplitMode.value && "mx-auto max-w-4xl")
);
</script>

<template>
  <div class="bg-background text-foreground flex h-screen flex-col">
    <AppHeader />

    <main class="flex flex-1 flex-row overflow-hidden">
      <!-- Editor Panel -->
      <div v-if="viewConfigStore.showEditor" :class="panelClass">
        <div class="flex h-full flex-col p-4">
          <EditorMarkdownEditor class="min-h-0 flex-1" />
        </div>
      </div>

      <!-- Divider -->
      <div v-if="isSplitMode" class="bg-border w-px shrink-0" />

      <!-- Preview Panel -->
      <div v-if="viewConfigStore.showPreview" :class="panelClass">
        <div :class="previewContentClass">
          <EditorMarkdownPreview />
        </div>
      </div>
    </main>
  </div>
</template>
