import type { Annotation } from "@/stores/annotationStore";

export function generateConcatenatedPrompt(
  annotations: Readonly<Annotation[]>
): string {
  if (!annotations || annotations.length === 0) {
    return "No annotations were provided to generate a prompt.";
  }

  let promptParts: string[] = [];
  promptParts.push(
    "Please analyze the following text segments and my corresponding notes or questions."
  );
  promptParts.push(
    "For each segment, I will provide the original text excerpt and then my comments related to it."
  );
  promptParts.push("---");

  annotations.forEach((annotation, index) => {
    promptParts.push(`\n[Text Segment ${index + 1}]`);
    promptParts.push(
      `Excerpt:\n> ${annotation.selectedText.replace(/\n/g, "\n> ")}\n`
    );

    if (annotation.comments && annotation.comments.length > 0) {
      promptParts.push(`My Notes/Questions for Segment ${index + 1}:`);
      annotation.comments.forEach((comment) => {
        promptParts.push(`- ${comment.text}`);
      });
    } else {
      promptParts.push(
        `I have no specific notes or questions for this segment.`
      );
    }
    promptParts.push("---");
  });

  promptParts.push(
    "\nPlease provide a comprehensive response based on all the segments and notes provided above."
  );

  return promptParts.join("\n");
}
