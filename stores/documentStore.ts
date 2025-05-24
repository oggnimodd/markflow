import { defineStore } from "pinia";

export const useDocumentStore = defineStore("document", {
  state: () => ({
    markdownContent: `# Welcome to MarkFlow! (from Pinia Store)

This is your personal Markdown editor.

## Features:
- Type Markdown on the left.
- See live preview on the right (soon!).
- Annotate specific text for prompt refinement (core feature!).

### Try some Markdown:
**Bold text** and *italic text*.
\`\`\`javascript
function hello() {
  console.log("world");
}
\`\`\`
- List item 1
- List item 2

> A blockquote for emphasis.

Ready to refine your prompts?`,
  }),
  actions: {
    setMarkdownContent(newContent: string) {
      this.markdownContent = newContent;
    },
  },
  getters: {
    getMarkdownContent: (state) => state.markdownContent,
  },
});
