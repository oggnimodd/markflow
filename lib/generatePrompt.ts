import type { Annotation } from "@/stores/annotationStore";

export function generateConcatenatedPrompt(
  annotations: Readonly<Annotation[]>
): string {
  if (!annotations?.length) {
    return "No annotations were provided to generate a prompt.";
  }

  const header = [
    "Please analyze the following text segments and my corresponding notes or questions.",
    "For each segment, I will provide the original text excerpt and then my comments related to it.",
    "---",
  ];

  const body = annotations.flatMap((annotation, idx) => {
    const segmentHeader = `\n[Text Segment ${idx + 1}]`;
    const excerpt = `Excerpt:\n> ${annotation.selectedText.replace(/\n/g, "\n> ")}`;
    const notes =
      annotation.comments && annotation.comments.length
        ? [
            `My Notes/Questions for Segment ${idx + 1}:`,
            ...annotation.comments.map((c) => `- ${c.text}`),
          ]
        : ["I have no specific notes or questions for this segment."];

    return [...segmentHeader.split("\n"), excerpt, ...notes, "---"];
  });

  const footer =
    "Hi there! Here are my comments for your response; I have several things I'd like to discuss.";

  return [...header, ...body, footer].join("\n");
}
