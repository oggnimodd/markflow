# Project Todo List

- [x] **Task 1: Project Setup and Core UI Integration**
  - Initialize the Nuxt.js project, integrate Tailwind CSS and shadcn-vue, and set up the basic application structure including app.vue and the main index page.

- [x] **Task 2: Implement Basic Two-Panel Layout and Header**
  - Implement the main two-panel layout for the editor and preview areas and create a placeholder for the header toolbar.
  - [x] Subtask 2.1: Create Base Page Structure
    - Set up the fundamental HTML structure within `pages/index.vue`, including a main container, a header element, and a main content area container.
  - [x] Subtask 2.2: Implement Two-Panel Layout Container
    - Apply Tailwind CSS flexbox or grid classes to the main content area container created in the previous step to establish a two-column layout structure.
  - [x] Subtask 2.3: Add Editor and Preview Panel Placeholders
    - Insert two distinct `<div>` elements inside the two-panel layout container to serve as placeholders for the editor and preview areas.
  - [x] Subtask 2.4: Apply Basic Visual Styling to Panels and Header
    - Add temporary background colors or borders using Tailwind CSS to the header placeholder and the editor/preview panel placeholders to make them visually distinct and confirm the layout structure.
  - [x] Subtask 2.5: Configure Layout to Fill Available Space
    - Adjust Tailwind CSS classes to ensure the main content area (editor/preview panels) occupies the remaining vertical space below the header and that the panels divide the horizontal space appropriately.

- [x] **Task 3: Create Markdown Editor Component**
  - Create a component for the Markdown editor panel, initially using a simple textarea.

- [x] **Task 4: Integrate Markdown Parser and Create Live Preview**
  - Integrate a Markdown parsing library (e.g., marked.js) and create a component for the live preview panel, connecting it to the editor's content for real-time rendering.

- [x] **Task 5: Implement View Mode Switching**
  - Implement the UI controls and logic in the header toolbar to switch between Editor Only, Preview Only, and Split View modes.

- [x] **Task 6: Implement Text Selection Detection in Preview**
  - Add JavaScript event listeners to the Markdown preview panel to detect user text selections.

- [x] **Task 7: Implement Basic Annotation Input UI**
  - Upon text selection in the preview, display an 'Add Comment' UI element and a modal for users to input their comment using shadcn-vue components.

- [ ] **Task 8: Implement Annotation Data Structure and Visual Highlighting**
  - Store the selected text and comment data in a structured format and visually distinguish the selected text in the preview panel.

- [ ] **Task 9: Implement Local Data Persistence**
  - Implement saving and loading of the Markdown content and the list of annotations using the browser's localStorage API.

- [ ] **Task 10: Implement Concatenated Prompt Generation**
  - Add a button to generate a concatenated prompt from all annotations and display it in a modal with a copy-to-clipboard option.
