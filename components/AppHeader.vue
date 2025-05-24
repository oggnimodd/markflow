<script setup lang="ts">
import { ClipboardCopy, HelpCircle } from "lucide-vue-next";
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
const commandPaletteStore = useCommandPaletteStore();
const { copy, copied, isSupported } = useClipboard({ legacy: true });

const activeElement = useActiveElement();
const notUsingInput = computed(() => !activeElement.value?.isContentEditable);

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
    toast.info("No annotations to clear.");
    return;
  }
  annotationStore.clearAllAnnotations();
  toast.success("All annotations cleared!");
};

const { ctrl_slash, alt_k, alt_p } = useMagicKeys({
  passive: false,
  onEventFired(e) {
    if (notUsingInput.value) {
      if (
        (e.altKey && e.key.toLowerCase() === "k" && e.type === "keydown") ||
        (e.altKey && e.key.toLowerCase() === "p" && e.type === "keydown") ||
        (e.ctrlKey && e.key === "/" && e.type === "keydown")
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

whenever(logicAnd(ctrl_slash, notUsingInput), () => {
  commandPaletteStore.toggleCommandPalette();
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
      <Button
        variant="outline"
        size="icon"
        @click="commandPaletteStore.openCommandPalette()"
        title="Open Command Palette (?)"
      >
        <HelpCircle class="h-5 w-5" />
      </Button>
    </div>
  </header>
</template>
