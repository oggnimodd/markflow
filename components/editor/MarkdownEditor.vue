<script setup lang="ts">
const documentStore = useDocumentStore();
const editorContent = computed({
  get: () => documentStore.markdownContent,
  set: (value) => {
    documentStore.setMarkdownContent(value);
  },
});
</script>
<template>
  <textarea
    v-model="editorContent"
    placeholder="Start typing your Markdown here..."
    class="block h-full min-h-0 w-full resize-none border-none bg-transparent p-0 focus:ring-0 focus:outline-none"
    spellcheck="false"
  ></textarea>
</template>
