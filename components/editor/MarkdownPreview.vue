<script setup lang="ts">
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import vue from "highlight.js/lib/languages/xml";
import { useMagicKeys, whenever, useActiveElement } from "@vueuse/core";
import { logicAnd } from "@vueuse/math";

hljs.registerLanguage("vue", vue);

const POPOVER_WIDTH_REM = 32;
const TEXTAREA_MIN_HEIGHT_PX = 100;
const VIEWPORT_PADDING = 16;

const documentStore = useDocumentStore();
const selectionStore = useSelectionStore();
const annotationStore = useAnnotationStore();

const previewPanelRef = ref<HTMLDivElement | null>(null);
const textareaRef = ref<HTMLTextAreaElement | null>(null);

const showCommentPopover = ref(false);
const popoverPosition = ref({ top: 0, left: 0 });
const commentText = ref("");

// Magic keys setup
const activeElement = useActiveElement();
const notUsingInput = computed(
  () =>
    activeElement.value?.tagName !== "INPUT" &&
    activeElement.value?.tagName !== "TEXTAREA"
);

const { ctrl_slash, escape, ctrl_enter } = useMagicKeys();

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
      } catch (error) {
        // Fallback to escaped HTML
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

const closeCommentPopover = () => {
  showCommentPopover.value = false;
  selectionStore.clearSelection();
  commentText.value = "";
};

const getOptimalPopoverPosition = (mouseX: number, mouseY: number) => {
  const popoverWidthPx = POPOVER_WIDTH_REM * 16;
  const popoverHeightPx = TEXTAREA_MIN_HEIGHT_PX + 32; // Account for padding

  let left = mouseX - popoverWidthPx / 2;
  let top = mouseY + 10;

  // Ensure popover stays within viewport horizontally
  if (left < VIEWPORT_PADDING) {
    left = VIEWPORT_PADDING;
  } else if (left + popoverWidthPx > window.innerWidth - VIEWPORT_PADDING) {
    left = window.innerWidth - popoverWidthPx - VIEWPORT_PADDING;
  }

  // Ensure popover stays within viewport vertically
  if (top + popoverHeightPx > window.innerHeight - VIEWPORT_PADDING) {
    top = mouseY - popoverHeightPx - 10;
  }

  if (top < VIEWPORT_PADDING) {
    top = VIEWPORT_PADDING;
  }

  return { left, top };
};

const showCommentDialog = async (mouseX?: number, mouseY?: number) => {
  const selection = window.getSelection();
  const selectedText = selection?.toString().trim();

  if (!selectedText) return;

  selectionStore.setSelectedText(selectedText);

  // Use mouse position if provided, otherwise center on viewport
  const x = mouseX ?? window.innerWidth / 2;
  const y = mouseY ?? window.innerHeight / 2;

  const position = getOptimalPopoverPosition(x, y);
  popoverPosition.value = position;
  showCommentPopover.value = true;

  await nextTick();
  const componentRef = textareaRef.value as any;
  const textarea = componentRef?.$el || componentRef?.textareaElement;
  textarea?.focus();
};

const handleContextMenu = (event: MouseEvent) => {
  event.preventDefault();
  showCommentDialog(event.clientX, event.clientY);
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Element | null;
  if (showCommentPopover.value && !target?.closest?.(".comment-popover")) {
    closeCommentPopover();
  }
};

const handleCommentSubmit = () => {
  if (commentText.value.trim() && selectionStore.currentSelection) {
    annotationStore.addCommentToAnnotation(
      selectionStore.currentSelection.text,
      commentText.value.trim()
    );
    closeCommentPopover();
  }
};

// Magic keys watchers
whenever(logicAnd(ctrl_slash, notUsingInput), () => {
  showCommentDialog();
});

whenever(escape, () => {
  if (showCommentPopover.value) {
    closeCommentPopover();
  }
});

whenever(ctrl_enter, () => {
  if (showCommentPopover.value) {
    handleCommentSubmit();
  }
});

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  previewPanelRef.value?.addEventListener("contextmenu", handleContextMenu);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
  previewPanelRef.value?.removeEventListener("contextmenu", handleContextMenu);
});
</script>

<template>
  <div class="relative h-full w-full">
    <div
      ref="previewPanelRef"
      class="prose dark:prose-invert relative h-full max-w-none overflow-auto"
      v-html="renderedHtml"
    />

    <Teleport to="body">
      <div
        v-if="showCommentPopover"
        class="comment-popover bg-popover fixed z-[9999] rounded-lg border p-4 shadow-xl"
        :style="{
          width: `${POPOVER_WIDTH_REM}rem`,
          top: `${popoverPosition.top}px`,
          left: `${popoverPosition.left}px`,
        }"
      >
        <Textarea
          ref="textareaRef"
          v-model="commentText"
          placeholder="Add a comment... (Ctrl+Enter to submit, Esc to cancel)"
          :style="{ minHeight: `${TEXTAREA_MIN_HEIGHT_PX}px` }"
          class="w-full resize-none text-sm"
        />
      </div>
    </Teleport>
  </div>
</template>
