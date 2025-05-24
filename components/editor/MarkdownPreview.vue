<script setup lang="ts">
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";

import vue from "highlight.js/lib/languages/xml";

hljs.registerLanguage("vue", vue);

const documentStore = useDocumentStore();

const md: MarkdownIt = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: function (str: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre><code class="hljs">' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          "</code></pre>"
        );
      } catch (_) {
        console.error(`Highlight.js failed to highlight language: ${lang}`);
      }
    }
    return (
      '<pre><code class="hljs">' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  },
});

const renderedHtml = computed(() => {
  if (!documentStore.markdownContent) {
    return '<p class="text-muted-foreground">Start typing Markdown in the editor to see a live preview.</p>';
  }
  return md.render(documentStore.markdownContent);
});
</script>

<template>
  <div class="prose dark:prose-invert max-w-none" v-html="renderedHtml"></div>
</template>
