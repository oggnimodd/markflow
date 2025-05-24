import { defineStore } from "pinia";

interface SelectionDetails {
  text: string;
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
    },
    clearSelection() {
      this.currentSelection = null;
    },
  },
});
