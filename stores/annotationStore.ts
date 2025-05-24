import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

export interface Comment {
  commentId: string;
  text: string;
  createdAt: number;
  updatedAt: number;
}

export interface Annotation {
  id: string;
  selectedText: string;
  comments: Comment[];
  createdAt: number;
}

interface AnnotationState {
  annotations: Annotation[];
}

export const useAnnotationStore = defineStore("annotation", {
  state: (): AnnotationState => ({
    annotations: [],
  }),
  actions: {
    addAnnotation(selectedText: string, commentText: string) {
      if (!selectedText.trim() || !commentText.trim()) {
        console.warn(
          "Attempted to add an annotation with empty selected text or comment."
        );
        return;
      }

      const newComment: Comment = {
        commentId: uuidv4(),
        text: commentText,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      const newAnnotation: Annotation = {
        id: uuidv4(),
        selectedText,
        comments: [newComment],
        createdAt: Date.now(),
      };

      this.annotations.push(newAnnotation);
    },

    clearAllAnnotations() {
      this.annotations = [];
    },

    addCommentToAnnotation(annotationId: string, commentText: string) {
      if (!commentText.trim()) {
        console.warn("Attempted to add an empty comment.");
        return;
      }
      const annotation = this.annotations.find((a) => a.id === annotationId);
      if (annotation) {
        const newComment: Comment = {
          commentId: uuidv4(),
          text: commentText,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        annotation.comments.push(newComment);
      } else {
        console.warn(
          `Annotation with id ${annotationId} not found to add comment.`
        );
      }
    },

    updateComment(annotationId: string, commentId: string, newText: string) {
      if (!newText.trim()) {
        console.warn("Attempted to update comment with empty text.");
        return;
      }
      const annotation = this.annotations.find((a) => a.id === annotationId);
      if (annotation) {
        const comment = annotation.comments.find(
          (c) => c.commentId === commentId
        );
        if (comment) {
          comment.text = newText;
          comment.updatedAt = Date.now();
        } else {
          console.warn(
            `Comment with id ${commentId} not found in annotation ${annotationId}.`
          );
        }
      } else {
        console.warn(
          `Annotation with id ${annotationId} not found to update comment.`
        );
      }
    },

    deleteComment(annotationId: string, commentId: string) {
      const annotationIndex = this.annotations.findIndex(
        (a) => a.id === annotationId
      );
      if (annotationIndex !== -1) {
        const annotation = this.annotations[annotationIndex];
        const commentIndex = annotation.comments.findIndex(
          (c) => c.commentId === commentId
        );

        if (commentIndex !== -1) {
          annotation.comments.splice(commentIndex, 1);
          if (annotation.comments.length === 0) {
            this.annotations.splice(annotationIndex, 1);
          }
        } else {
          console.warn(
            `Comment with id ${commentId} not found in annotation ${annotationId}.`
          );
        }
      } else {
        console.warn(
          `Annotation with id ${annotationId} not found to delete comment.`
        );
      }
    },

    deleteAnnotation(annotationId: string) {
      const index = this.annotations.findIndex((a) => a.id === annotationId);
      if (index !== -1) {
        this.annotations.splice(index, 1);
      } else {
        console.warn(`Annotation with id ${annotationId} not found to delete.`);
      }
    },
  },
  getters: {
    getAnnotations: (state): Readonly<Annotation[]> => state.annotations,
    getAnnotationById: (state) => {
      return (id: string): Readonly<Annotation> | undefined =>
        state.annotations.find((a) => a.id === id);
    },
    getCommentsForAnnotation: (state) => {
      return (annotationId: string): Readonly<Comment[]> => {
        const annotation = state.annotations.find((a) => a.id === annotationId);
        return annotation ? annotation.comments : [];
      };
    },
  },
});
