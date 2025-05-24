import { defineStore } from "pinia";

export const useCommandPaletteStore = defineStore("commandPalette", {
  state: () => ({
    showCommandPalette: false,
  }),
  actions: {
    toggleCommandPalette() {
      this.showCommandPalette = !this.showCommandPalette;
    },
    openCommandPalette() {
      this.showCommandPalette = true;
    },
    closeCommandPalette() {
      this.showCommandPalette = false;
    },
  },
});
