<script setup lang="ts">
import { Trash2, Edit3, PlusCircle } from "lucide-vue-next";
import type { Annotation, Comment } from "@/stores/annotationStore";

const annotationStore = useAnnotationStore();

const showEditDialog = ref(false);
const showAddCommentDialog = ref(false);
const currentAnnotationToEdit = ref<Annotation | null>(null);
const currentCommentToEdit = ref<Comment | null>(null);
const editText = ref("");

const openEditCommentDialog = (annotation: Annotation, comment: Comment) => {
  currentAnnotationToEdit.value = annotation;
  currentCommentToEdit.value = comment;
  editText.value = comment.text;
  showEditDialog.value = true;
};

const handleUpdateComment = () => {
  if (
    currentAnnotationToEdit.value &&
    currentCommentToEdit.value &&
    editText.value.trim()
  ) {
    annotationStore.updateComment(
      currentAnnotationToEdit.value.id,
      currentCommentToEdit.value.commentId,
      editText.value.trim()
    );
  }
  closeEditDialog();
};

const closeEditDialog = () => {
  showEditDialog.value = false;
  currentAnnotationToEdit.value = null;
  currentCommentToEdit.value = null;
  editText.value = "";
};

const openAddCommentDialog = (annotation: Annotation) => {
  currentAnnotationToEdit.value = annotation;
  editText.value = "";
  showAddCommentDialog.value = true;
};

const handleAddCommentToAnnotation = () => {
  if (currentAnnotationToEdit.value && editText.value.trim()) {
    annotationStore.addCommentToAnnotation(
      currentAnnotationToEdit.value.id,
      editText.value.trim()
    );
  }
  closeAddCommentDialog();
};

const closeAddCommentDialog = () => {
  showAddCommentDialog.value = false;
  currentAnnotationToEdit.value = null;
  editText.value = "";
};

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleString();
};
</script>

<template>
  <div class="flex h-full flex-col p-4">
    <div class="mb-4 flex items-center justify-between">
      <h2 class="text-xl font-semibold">Annotations</h2>
      <Button
        v-if="annotationStore.getAnnotations.length > 0"
        variant="destructive"
        size="sm"
        @click="annotationStore.clearAllAnnotations()"
      >
        Clear All
      </Button>
    </div>

    <div
      v-if="annotationStore.getAnnotations.length === 0"
      class="text-muted-foreground flex flex-1 items-center justify-center text-center"
    >
      <div>
        <p class="mb-1 text-lg">No annotations yet.</p>
        <p class="text-sm">
          Select text in the preview and right-click (or Ctrl+/) to add a
          comment.
        </p>
      </div>
    </div>

    <div v-else class="flex-1 space-y-4 overflow-y-auto pr-2">
      <div
        v-for="annotation in annotationStore.getAnnotations"
        :key="annotation.id"
        class="bg-card rounded-lg border p-4 shadow-sm"
      >
        <div class="mb-3 border-b pb-2">
          <p
            class="text-muted-foreground text-sm font-medium italic"
            :title="`Annotated on: ${formatDate(annotation.createdAt)}`"
          >
            "{{ annotation.selectedText }}"
          </p>
        </div>

        <div class="space-y-3">
          <div
            v-for="comment in annotation.comments"
            :key="comment.commentId"
            class="group bg-muted/50 relative rounded-md p-3"
          >
            <p class="text-foreground text-sm whitespace-pre-wrap">
              {{ comment.text }}
            </p>
            <p
              class="text-muted-foreground/80 mt-1 text-xs"
              :title="`Last updated: ${formatDate(comment.updatedAt)}`"
            >
              {{ formatDate(comment.createdAt) }}
              <span v-if="comment.createdAt !== comment.updatedAt"
                >(edited)</span
              >
            </p>
            <div
              class="absolute top-2 right-2 flex space-x-1 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Button
                variant="ghost"
                size="icon"
                class="h-6 w-6"
                title="Edit comment"
                @click="openEditCommentDialog(annotation, comment)"
              >
                <Edit3 class="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                class="text-destructive hover:bg-destructive/10 hover:text-destructive h-6 w-6"
                title="Delete comment"
                @click="
                  annotationStore.deleteComment(
                    annotation.id,
                    comment.commentId
                  )
                "
              >
                <Trash2 class="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </div>

        <div class="mt-3 flex items-center justify-between pt-2">
          <Button
            variant="outline"
            size="sm"
            class="text-xs"
            @click="openAddCommentDialog(annotation)"
          >
            <PlusCircle class="mr-1.5 h-3.5 w-3.5" />
            Add Comment
          </Button>
          <Button
            variant="link"
            size="sm"
            class="text-destructive hover:text-destructive/80 text-xs"
            @click="annotationStore.deleteAnnotation(annotation.id)"
          >
            Delete Annotation
          </Button>
        </div>
      </div>
    </div>

    <Dialog v-model:open="showEditDialog">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Comment</DialogTitle>
          <DialogDescription>
            Make changes to your comment below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div class="py-4">
          <Textarea
            v-model="editText"
            placeholder="Edit your comment..."
            class="min-h-[100px]"
            @keydown.enter.ctrl="handleUpdateComment"
          />
        </div>
        <DialogFooter>
          <DialogClose as-child>
            <Button variant="outline" @click="closeEditDialog">Cancel</Button>
          </DialogClose>
          <Button @click="handleUpdateComment">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <Dialog v-model:open="showAddCommentDialog">
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Comment</DialogTitle>
          <DialogDescription>
            Add another comment to "{{
              currentAnnotationToEdit?.selectedText
            }}".
          </DialogDescription>
        </DialogHeader>
        <div class="py-4">
          <Textarea
            v-model="editText"
            placeholder="Type your new comment..."
            class="min-h-[100px]"
            @keydown.enter.ctrl="handleAddCommentToAnnotation"
          />
        </div>
        <DialogFooter>
          <DialogClose as-child>
            <Button variant="outline" @click="closeAddCommentDialog"
              >Cancel</Button
            >
          </DialogClose>
          <Button @click="handleAddCommentToAnnotation">Add Comment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>
