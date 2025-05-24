import { defineStore } from "pinia";

export type ViewMode = "editor" | "preview" | "split";

interface ViewConfigState {
  currentViewMode: ViewMode;
}

export const useViewConfigStore = defineStore("viewConfig", {
  state: (): ViewConfigState => ({
    currentViewMode: "split",
  }),
  actions: {
    setViewMode(mode: ViewMode) {
      this.currentViewMode = mode;
    },
  },
  getters: {
    showEditor: (state) =>
      state.currentViewMode === "editor" || state.currentViewMode === "split",
    showPreview: (state) =>
      state.currentViewMode === "preview" || state.currentViewMode === "split",
  },
});
