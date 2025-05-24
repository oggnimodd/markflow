# MarkFlow

MarkFlow is a personal Markdown editor and annotation tool. I built it to streamline my own process of working with text, analyzing content, and refining prompts, particularly for interactions with AI models.

**Please Note:**
*   This tool is primarily designed for my personal workflow and specific use cases.
*   It is **not built for mobile view** and is best used on a desktop browser.

## Core Features

MarkFlow currently offers the following functionalities:

1.  **Markdown Editor & Live Preview:**
    *   A straightforward Markdown editor (using a basic textarea) alongside a live HTML preview panel.
    *   The preview is rendered using `markdown-it` and includes syntax highlighting for code blocks via `highlight.js`.

2.  **Flexible View Modes:**
    *   Easily switch between different layouts using toolbar buttons (or `Ctrl+1` to cycle):
        *   Editor Only
        *   Preview Only
        *   Editor & Preview (side-by-side)
        *   Preview & Annotations (preview alongside the annotation management panel)

3.  **Text Annotation Workflow:**
    *   Select any text directly in the live preview panel.
    *   Right-click the selection or use the `Ctrl+/` shortcut (when not focused on an input and text is selected) to open an input popover.
    *   Add your comments or notes related to the selected text (`Ctrl+Enter` to submit, `Esc` to cancel from popover).

4.  **Annotation Management Panel:**
    *   When in "Preview & Annotations" view mode, a dedicated "Annotations" panel lists all your created annotations.
    *   Each annotation card displays the original text you selected and its associated comment(s).
    *   You can add multiple comments to a single text selection using the "Add Comment" button on an annotation card.
    *   Edit or delete individual comments within an annotation via a dropdown menu on each comment (opens a dialog for editing, `Ctrl+Enter` to save).
    *   Delete entire annotations (the selected text and all its comments).
    *   A "Clear All" button allows removing all annotations at once.

5.  **Prompt Generation:**
    *   A "Generate Prompt" button in the header (shortcut `Alt+P`) compiles all your annotations (selected text snippets and their corresponding comments) into a single, structured text.
    *   This compiled text is automatically copied to your clipboard, ready for use. Toast notifications confirm success or provide feedback.

6.  **Command Palette:**
    *   Access common actions quickly using the command palette. It can be opened via a "Help" (?) button in the header or the `Ctrl+/` shortcut (when not focused on an input and no text is selected in preview).
    *   Available commands include:
        *   Generate & Copy Prompt (`Alt+P`)
        *   Clear All Annotations (`Alt+K`)
        *   Cycle View Modes (`Ctrl+1`)

7.  **User Interface & Experience:**
    *   Built with a clean, modern UI using shadcn-vue and Tailwind CSS.
    *   Includes light and dark mode support (via OS preference or future toggle).
    *   Toast notifications for feedback on actions (e.g., copy success, errors).

## Technology Stack

*   **Framework:** Nuxt.js (v3)
*   **UI Library:** Vue.js (v3)
*   **Styling:** Tailwind CSS
*   **UI Components:** shadcn-vue (reka-ui primitives)
*   **Markdown Parsing:** `markdown-it`
*   **Syntax Highlighting:** `highlight.js`
*   **State Management:** Pinia
*   **Icons:** Lucide Icons
*   **Clipboard:** VueUse `@vueuse/core`
*   **Keyboard Shortcuts:** VueUse `@vueuse/core`
