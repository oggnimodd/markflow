import { defineStore } from "pinia";

export type ViewMode =
  | "editor"
  | "preview"
  | "editorAndPreview"
  | "previewAndAnnotations";

interface ViewConfigState {
  currentViewMode: ViewMode;
}

export const useViewConfigStore = defineStore("viewConfig", {
  state: (): ViewConfigState => ({
    currentViewMode: "editorAndPreview",
  }),
  actions: {
    setViewMode(mode: ViewMode) {
      this.currentViewMode = mode;
    },
  },
  getters: {
    showEditor: (state): boolean =>
      state.currentViewMode === "editor" ||
      state.currentViewMode === "editorAndPreview",

    showPreview: (state): boolean =>
      state.currentViewMode === "preview" ||
      state.currentViewMode === "editorAndPreview" ||
      state.currentViewMode === "previewAndAnnotations",

    showAnnotationsPanel: (state): boolean =>
      state.currentViewMode === "previewAndAnnotations",

    isSinglePanelMode: (state): boolean =>
      state.currentViewMode === "editor" || state.currentViewMode === "preview",

    isTwoPanelMode: (state): boolean =>
      state.currentViewMode === "editorAndPreview" ||
      state.currentViewMode === "previewAndAnnotations",
  },
});
