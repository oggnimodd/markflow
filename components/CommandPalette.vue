<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import { generateConcatenatedPrompt } from "@/lib/generatePrompt";
import { toast } from "vue-sonner";
import { ClipboardCopy, Trash2, PanelLeft, HelpCircle } from "lucide-vue-next";
import { useCommandPaletteStore } from "@/stores/commandPaletteStore";
import { useAnnotationStore } from "@/stores/annotationStore";
import { useViewConfigStore } from "@/stores/viewConfigStore";

const commandPaletteStore = useCommandPaletteStore();
const annotationStore = useAnnotationStore();
const viewConfigStore = useViewConfigStore();

interface CommandAction {
  id: string;
  value: string;
  icon: any;
  label: string;
  shortcut?: string[];
  action?: () => void;
  disabled?: boolean;
}

interface CommandCategory {
  heading: string;
  actions: CommandAction[];
}

const { copy, isSupported } = useClipboard({ legacy: true });
const handleGenerateAndCopyPrompt = async () => {
  if (!isSupported.value) {
    toast.error("Clipboard operations are not supported by your browser.");
    return;
  }
  const annotations = annotationStore.getAnnotations;
  if (annotations.length === 0) {
    toast.info("No annotations to generate a prompt from.");
    return;
  }
  const promptText = generateConcatenatedPrompt(annotations);
  await copy(promptText);
  toast.success("Prompt copied to clipboard!");
  commandPaletteStore.closeCommandPalette();
};

const handleClearAllAnnotations = () => {
  if (annotationStore.getAnnotations.length === 0) {
    toast.info("No annotations to clear.");
    return;
  }
  annotationStore.clearAllAnnotations();
  toast.success("All annotations cleared!");
  commandPaletteStore.closeCommandPalette();
};

const handleCycleViewMode = () => {
  viewConfigStore.cycleViewMode();
  toast.info(`View mode changed to: ${viewConfigStore.currentViewMode}`);
  commandPaletteStore.closeCommandPalette();
};

const commandCategories: CommandCategory[] = [
  {
    heading: "General",
    actions: [
      {
        id: "genPrompt",
        value: "generate copy prompt ai",
        icon: ClipboardCopy,
        label: "Generate & Copy Prompt",
        shortcut: ["Alt", "P"],
        action: handleGenerateAndCopyPrompt,
      },
      {
        id: "clearAnnos",
        value: "clear all annotations delete",
        icon: Trash2,
        label: "Clear All Annotations",
        shortcut: ["Alt", "K"],
        action: handleClearAllAnnotations,
      },
      {
        id: "toggleGuide",
        value: "toggle keyboard shortcuts help command palette",
        icon: HelpCircle,
        label: "Open Command Palette",
        shortcut: ["Ctrl", "/"],
        action: () => commandPaletteStore.closeCommandPalette(),
      },
    ],
  },
  {
    heading: "View Modes",
    actions: [
      {
        id: "cycleView",
        value: "cycle view modes layout",
        icon: PanelLeft,
        label: "Cycle View Modes",
        shortcut: ["Ctrl", "1"],
        action: handleCycleViewMode,
      },
    ],
  },
];

const onSelectCommand = (actionId: string) => {
  const allActions = commandCategories.flatMap((cat) => cat.actions);
  const selected = allActions.find((cmd) => cmd.id === actionId);
  if (selected?.action) {
    selected.action();
  } else if (selected) {
    toast.info(`Shortcut: ${selected.label}`);
  }
  commandPaletteStore.closeCommandPalette();
};
</script>

<template>
  <Command class="rounded-lg border shadow-md">
    <CommandInput placeholder="Type a command or search..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <template
        v-for="(category, index) in commandCategories"
        :key="category.heading"
      >
        <CommandGroup :heading="category.heading">
          <CommandItem
            v-for="cmd in category.actions"
            :key="cmd.id"
            :value="cmd.value"
            :disabled="cmd.disabled"
            @select="() => onSelectCommand(cmd.id)"
            class="cursor-pointer"
          >
            <component :is="cmd.icon" class="mr-2 h-4 w-4" />
            <span>{{ cmd.label }}</span>
            <CommandShortcut v-if="cmd.shortcut">
              {{ cmd.shortcut.join(" + ") }}
            </CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator v-if="index < commandCategories.length - 1" />
      </template>
    </CommandList>
  </Command>
</template>
