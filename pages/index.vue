<template>
  <div class="bg-background text-foreground flex h-screen flex-col">
    <header class="bg-muted/40 border-border shrink-0 border-b p-4 shadow-sm">
      <h1 class="text-xl font-semibold">MarkFlow Header Placeholder</h1>
    </header>

    <main class="flex flex-1 flex-row overflow-hidden">
      <div class="bg-card text-card-foreground flex-1 overflow-y-auto p-4">
        <EditorMarkdownEditor />
      </div>

      <div class="bg-border w-px shrink-0"></div>

      <div class="bg-card text-card-foreground flex-1 overflow-y-auto p-4">
        <EditorMarkdownPreview />
      </div>
    </main>
  </div>
</template>
