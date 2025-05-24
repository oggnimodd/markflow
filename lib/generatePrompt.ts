import type { Annotation } from "@/stores/annotationStore";

export function generateConcatenatedPrompt(
  annotations: Readonly<Annotation[]>
): string {
  if (!annotations?.length) {
    return "No annotations were provided to generate a prompt.";
  }

  const header = [
    "You are an AI assistant. I will provide you with one or more text segments. These segments might be from your previous responses, existing code, a document I'm working on, or other source material. For each segment, I will include my specific input, which could be comments, questions, instructions, or general feedback.",
    "Your primary objective is to carefully analyze my input for each segment and then formulate the most helpful and contextually appropriate response.",
    "---",
    "KEY GUIDELINES FOR YOUR RESPONSE:",
    "1. Determine Context (Initial vs. Follow-up):",
    "   - Examine the 'Referenced Text' in the segments. If it appears to be your own previous output, treat my inputs as feedback for revision and aim to provide an updated version.",
    "   - If the 'Referenced Text' seems to be new material I'm providing, treat this as an initial request for analysis, generation, or answers based on my inputs.",
    "",
    "2. Interpret My Input Accurately:",
    "   My input on each segment can be varied. Understand the intent:",
    "   - Direct Questions (e.g., 'Why is this?', 'What does X mean?'): Provide clear answers.",
    "   - Feedback/Observations (e.g., 'This part is unclear', 'This approach is good'): Acknowledge and use this to inform your response or revisions.",
    "   - Instructions (e.g., 'Rewrite this section', 'Add a try-catch block', 'Remove this sentence', 'Explain this differently'): Execute these instructions on the relevant text.",
    "   - Suggestions/Ideas (e.g., 'What if we tried X?', 'Perhaps add Y'): Consider these for the output, incorporating them if they improve the result.",
    "",
    "3. CRITICAL: Determine Your Response Format (Integrated vs. Segmented):",
    "   This is the most important part. Your response structure should adapt to my needs:",
    "   - **PRIORITIZE INTEGRATED/CONSOLIDATED OUTPUT:** If my inputs (across all segments) seem primarily aimed at refining, correcting, developing, or evolving a single piece of work (e.g., a code script, a document, a comprehensive explanation), your main goal is to produce a **SINGLE, COHERENT, AND UPDATED version** of that work. This revised output should incorporate all my feedback, address questions within the flow (if appropriate), and implement instructions. Avoid a simple point-by-point reply to each of my comments if the overall goal is a better *version* of something.",
    "   - **WHEN TO USE SEGMENTED REPLIES:** If my inputs are predominantly distinct, unrelated questions about different aspects of each segment, and they don't naturally contribute to a single, unified revised output, then (and generally only then) you may address my inputs segment by segment.",
    "   - **FOR MIXED INPUTS:** If it's a combination, lean towards providing the consolidated, revised output as the primary response. You can then briefly address any truly separate, minor questions that don't fit into the main revision.",
    "   - **Core Heuristic:** Ask yourself: 'Is the user trying to get an improved *version* of a whole piece of work, or are they asking a series of largely independent questions?' Let this guide your response structure.",
    "---",
  ];

  const body = annotations.flatMap((annotation, idx) => {
    const segmentHeader = `\n[Segment ${idx + 1} of Text Under Discussion]`;
    const excerpt = `Referenced Text for Segment ${idx + 1}:\n> ${annotation.selectedText.replace(
      /\n/g,
      "\n> "
    )}`;
    const notes =
      annotation.comments && annotation.comments.length
        ? [
            `My Input/Comments Regarding Segment ${idx + 1}:`,
            ...annotation.comments.map((c) => `- ${c.text}`),
          ]
        : [`I have no specific input for this segment.`];

    return [...segmentHeader.split("\n"), excerpt, ...notes, "---"];
  });

  const footer = [
    "\n[Concluding Instruction]",
    "Please process all the provided segments and my corresponding inputs according to the guidelines above. Your aim is to be as helpful as possible, providing either a comprehensively revised output or clear, targeted answers, depending on the inferred intent of my inputs. If revising code or a document, please present the complete, updated version reflecting all changes.",
  ];

  return [...header, ...body, ...footer].join("\n");
}
