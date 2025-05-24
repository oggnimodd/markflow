import { defineStore } from "pinia";

interface SelectionDetails {
  text: string;
  // We can add more details like DOM range, start/end offsets later if needed
  // For now, text is the primary piece of information.
  // For instance, to re-highlight or link annotations, a Range object is useful.
  // However, serializing Range for storage or across components can be tricky.
  // Let's keep it simple for Task 6 and focus on capturing the text.
}

interface SelectionState {
  currentSelection: SelectionDetails | null;
}

export const useSelectionStore = defineStore("selection", {
  state: (): SelectionState => ({
    currentSelection: null,
  }),
  actions: {
    setSelectedText(text: string) {
      if (text.trim() === "") {
        this.currentSelection = null;
        return;
      }
      this.currentSelection = { text };
      // For debugging
      console.log("Selected Text (in store):", text);
    },
    clearSelection() {
      this.currentSelection = null;
      // For debugging
      console.log("Selection cleared (in store)");
    },
  },
});
