<script setup lang="ts">
import { HelpCircle } from "lucide-vue-next";

interface Shortcut {
  keys: string[];
  description: string;
}

interface ShortcutCategory {
  category: string;
  shortcuts: Shortcut[];
}

const shortcutData: ShortcutCategory[] = [
  {
    category: "General Application",
    shortcuts: [
      { keys: ["?"], description: "Toggle Keyboard Shortcuts Guide" },
      {
        keys: ["Alt", "P"],
        description: "Generate and Copy Prompt",
      },
      {
        keys: ["Alt", "K"],
        description: "Clear All Annotations",
      },
    ],
  },
  {
    category: "View Modes",
    shortcuts: [
      {
        keys: ["Ctrl", "1"],
        description: "Cycle Through View Modes",
      },
    ],
  },
  {
    category: "Commenting on Preview",
    shortcuts: [
      {
        keys: ["Ctrl", "/"],
        description: "Open 'Add Comment' Popover",
      },
      {
        keys: ["Esc"],
        description: "Close 'Add Comment' Popover",
      },
      {
        keys: ["Ctrl", "Enter"],
        description: "Submit Comment from Popover",
      },
    ],
  },
  {
    category: "Annotation Panel & Dialogs",
    shortcuts: [
      {
        keys: ["Ctrl", "Enter"],
        description: "Submit Comment in Dialogs",
      },
      {
        keys: ["Esc"],
        description: "Close Dialogs",
      },
    ],
  },
];

const formatKeys = (keys: string[]) => {
  return keys
    .map((key) => {
      if (key.toLowerCase() === "ctrl") return "Ctrl";
      if (key.toLowerCase() === "alt") return "Alt";
      if (key.toLowerCase() === "shift") return "Shift";
      if (key.toLowerCase() === "esc") return "Esc";
      if (key.toLowerCase() === "enter") return "Enter";
      return key.toUpperCase();
    })
    .join(" + ");
};
</script>

<template>
  <DialogContent class="sm:max-w-lg">
    <DialogHeader>
      <DialogTitle class="flex items-center">
        <HelpCircle class="mr-2 h-5 w-5" />
        Keyboard Shortcuts
      </DialogTitle>
      <DialogDescription>
        List of available keyboard shortcuts for MarkFlow.
      </DialogDescription>
    </DialogHeader>

    <div class="mt-4 max-h-[60vh] space-y-6 overflow-y-auto pr-3">
      <div v-for="category in shortcutData" :key="category.category">
        <h3 class="text-md text-foreground mb-3 font-semibold">
          {{ category.category }}
        </h3>
        <ul class="space-y-2">
          <li
            v-for="shortcut in category.shortcuts"
            :key="shortcut.description"
            class="flex items-center justify-between text-sm"
          >
            <span class="text-muted-foreground">{{
              shortcut.description
            }}</span>
            <div class="flex items-center space-x-1">
              <kbd
                v-for="key in shortcut.keys"
                :key="key"
                class="bg-muted text-muted-foreground pointer-events-none inline-flex h-6 items-center gap-1 rounded border px-1.5 font-mono text-[11px] font-medium opacity-100 select-none"
              >
                {{ formatKeys([key]) }}
              </kbd>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </DialogContent>
</template>
