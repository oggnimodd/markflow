<script setup lang="ts">
const annotationStore = useAnnotationStore();
</script>

<template>
  <div class="h-full w-full p-4">
    <h2 class="mb-4 text-lg font-semibold">Annotations</h2>
    <div
      v-if="annotationStore.getAnnotations.length === 0"
      class="text-muted-foreground"
    >
      No annotations yet. Select text in the preview and right-click to add a
      comment.
    </div>
    <div v-else>
      <div
        v-for="annotation in annotationStore.getAnnotations"
        :key="annotation.id"
        class="mb-3 rounded-md border p-3"
      >
        <p class="text-muted-foreground mb-1 text-sm font-medium">
          {{ annotation.selectedText }}
        </p>
        <div
          v-for="comment in annotation.comments"
          :key="comment.commentId"
          class="ml-2 text-sm"
        >
          <p>{{ comment.text }}</p>
        </div>
      </div>
    </div>
    <Button
      v-if="annotationStore.getAnnotations.length > 0"
      variant="destructive"
      size="sm"
      class="mt-4"
      @click="annotationStore.clearAllAnnotations()"
    >
      Clear All Annotations
    </Button>
  </div>
</template>
