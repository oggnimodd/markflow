<script setup lang="ts">
import { ClipboardCopy } from "lucide-vue-next";
import {
  useClipboard,
  useMagicKeys,
  whenever,
  useActiveElement,
} from "@vueuse/core";
import { logicAnd } from "@vueuse/math";
import { toast } from "vue-sonner";
import { generateConcatenatedPrompt } from "@/lib/generatePrompt";

const annotationStore = useAnnotationStore();
const { copy, copied, isSupported } = useClipboard({ legacy: true });

const activeElement = useActiveElement();
const notUsingInput = computed(
  () =>
    activeElement.value?.tagName !== "INPUT" &&
    activeElement.value?.tagName !== "TEXTAREA" &&
    !activeElement.value?.isContentEditable
);

const handleGenerateAndCopyPrompt = async () => {
  if (!isSupported.value) {
    toast.error("Clipboard operations are not supported in this browser.");
    return;
  }
  const annotations = annotationStore.getAnnotations;
  if (annotations.length === 0) {
    toast.info("There are no annotations to generate a prompt from.");
    return;
  }
  const promptText = generateConcatenatedPrompt(annotations);
  try {
    await copy(promptText);
  } catch (e) {
    console.error("Failed to copy prompt:", e);
    toast.error("Failed to copy prompt to clipboard.");
  }
};

watch(copied, (isCopied) => {
  if (isCopied) {
    toast.success("Prompt copied to clipboard!");
  }
});

const handleClearAllAnnotations = () => {
  if (annotationStore.getAnnotations.length === 0) {
    toast.info("There are no annotations to clear.");
    return;
  }
  annotationStore.clearAllAnnotations();
  toast.success("All annotations cleared!");
};

const { alt_k, alt_p } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (notUsingInput.value) {
      if (
        (e.altKey && e.key === "k" && e.type === "keydown") ||
        (e.altKey && e.key === "p" && e.type === "keydown")
      ) {
        e.preventDefault();
      }
    }
  },
});

whenever(logicAnd(alt_k, notUsingInput), () => {
  handleClearAllAnnotations();
});

whenever(logicAnd(alt_p, notUsingInput), () => {
  handleGenerateAndCopyPrompt();
});
</script>

<template>
  <header
    class="bg-muted/40 border-border flex shrink-0 items-center justify-between border-b px-4 py-2 shadow-sm"
  >
    <h1 class="text-xl font-semibold">MarkFlow</h1>
    <div class="flex items-center space-x-3">
      <EditorViewModeToggle />
      <div class="bg-border h-6 w-px" />
      <Button
        variant="default"
        size="sm"
        @click="handleGenerateAndCopyPrompt"
        title="Generate & Copy AI Prompt (Alt+P)"
      >
        <ClipboardCopy class="mr-2 h-4 w-4" />
        Generate Prompt
      </Button>
    </div>
  </header>
</template>
