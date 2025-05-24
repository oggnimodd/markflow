<script setup lang="ts">
import type { Annotation, Comment } from "@/stores/annotationStore";
import {
  Trash2,
  Edit3,
  PlusCircle,
  MoreVertical,
  BookMarked,
} from "lucide-vue-next";

const annotationStore = useAnnotationStore();

const showEditCommentDialog = ref(false);
const showAddCommentDialog = ref(false);

const activeAnnotationId = ref<string | null>(null);
const activeCommentId = ref<string | null>(null);

const commentInputText = ref("");

const openEditCommentDialog = (annotation: Annotation, comment: Comment) => {
  activeAnnotationId.value = annotation.id;
  activeCommentId.value = comment.commentId;
  commentInputText.value = comment.text;
  showEditCommentDialog.value = true;
};

const handleUpdateComment = () => {
  if (
    activeAnnotationId.value &&
    activeCommentId.value &&
    commentInputText.value.trim()
  ) {
    annotationStore.updateComment(
      activeAnnotationId.value,
      activeCommentId.value,
      commentInputText.value.trim()
    );
  }
  closeEditCommentDialog();
};

const closeEditCommentDialog = () => {
  showEditCommentDialog.value = false;
  activeAnnotationId.value = null;
  activeCommentId.value = null;
  commentInputText.value = "";
};

const openAddCommentDialog = (annotation: Annotation) => {
  activeAnnotationId.value = annotation.id;
  commentInputText.value = "";
  showAddCommentDialog.value = true;
};

const handleAddCommentToAnnotation = () => {
  if (activeAnnotationId.value && commentInputText.value.trim()) {
    annotationStore.addCommentToAnnotation(
      activeAnnotationId.value,
      commentInputText.value.trim()
    );
  }
  closeAddCommentDialog();
};

const closeAddCommentDialog = () => {
  showAddCommentDialog.value = false;
  activeAnnotationId.value = null;
  commentInputText.value = "";
};

const getCurrentAnnotationForDialog = computed(() => {
  if (activeAnnotationId.value) {
    return annotationStore.getAnnotationById(activeAnnotationId.value);
  }
  return null;
});
</script>

<template>
  <div class="flex h-full flex-col p-4">
    <div class="mb-4 flex items-center justify-between pb-2">
      <h2 class="text-xl font-semibold tracking-tight">Annotations</h2>
      <Button
        v-if="annotationStore.getAnnotations.length > 0"
        variant="outline"
        size="sm"
        @click="annotationStore.clearAllAnnotations()"
      >
        Clear All
      </Button>
    </div>

    <div
      v-if="annotationStore.getAnnotations.length === 0"
      class="text-muted-foreground flex flex-1 flex-col items-center justify-center space-y-2 text-center"
    >
      <BookMarked class="h-12 w-12 opacity-50" />
      <p class="text-base font-medium">No annotations yet.</p>
      <p class="max-w-xs text-sm">
        Select text in the preview panel, then right-click or use Ctrl+/ to add
        your first comment.
      </p>
    </div>

    <div v-else class="flex-1 space-y-5 overflow-y-auto pr-1">
      <div
        v-for="annotation in annotationStore.getAnnotations.toReversed()"
        :key="annotation.id"
        class="group/annotation-card bg-card rounded-lg border shadow-sm transition-shadow hover:shadow-md"
      >
        <div class="bg-muted/30 border-b px-4 py-3">
          <p class="text-foreground/80 truncate text-sm font-medium italic">
            "{{ annotation.selectedText }}"
          </p>
        </div>

        <div class="space-y-px p-2">
          <div
            v-for="comment in annotation.comments"
            :key="comment.commentId"
            class="group/comment-item hover:bg-muted/50 relative flex items-center justify-between rounded-md px-2 py-2.5"
          >
            <p class="text-foreground flex-1 pr-8 text-sm whitespace-pre-wrap">
              {{ comment.text }}
            </p>
            <div
              class="absolute top-1/2 right-1 -translate-y-1/2 opacity-0 transition-opacity group-hover/comment-item:opacity-100"
            >
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost" size="icon" class="h-7 w-7">
                    <MoreVertical class="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    @click="openEditCommentDialog(annotation, comment)"
                  >
                    <Edit3 class="mr-2 h-4 w-4" />
                    Edit Comment
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    class="text-destructive focus:bg-destructive/10 focus:text-destructive"
                    @click="
                      annotationStore.deleteComment(
                        annotation.id,
                        comment.commentId
                      )
                    "
                  >
                    <Trash2 class="mr-2 h-4 w-4" />
                    Delete Comment
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-end space-x-2 border-t px-4 py-2">
          <Button
            variant="outline"
            size="sm"
            @click="openAddCommentDialog(annotation)"
          >
            <PlusCircle class="mr-1.5 h-4 w-4" />
            Add Comment
          </Button>
          <Button
            variant="ghost"
            size="sm"
            class="text-destructive hover:bg-destructive/10 hover:text-destructive"
            @click="annotationStore.deleteAnnotation(annotation.id)"
          >
            <Trash2 class="mr-1.5 h-4 w-4" />
            Delete Annotation
          </Button>
        </div>
      </div>
    </div>

    <Dialog v-model:open="showEditCommentDialog">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Comment</DialogTitle>
          <DialogDescription>
            Modify your comment for the selected text:
            <strong class="text-foreground/90 mt-1 block break-words italic">
              "{{ getCurrentAnnotationForDialog?.selectedText }}"
            </strong>
          </DialogDescription>
        </DialogHeader>
        <div class="py-2">
          <Textarea
            v-model="commentInputText"
            placeholder="Edit your comment..."
            class="min-h-[120px] resize-none"
            @keydown.enter.ctrl="handleUpdateComment"
          />
        </div>
        <DialogFooter>
          <DialogClose as-child>
            <Button variant="outline" @click="closeEditCommentDialog"
              >Cancel</Button
            >
          </DialogClose>
          <Button @click="handleUpdateComment">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <Dialog v-model:open="showAddCommentDialog">
      <DialogContent class="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Comment</DialogTitle>
          <DialogDescription>
            Add a new comment to the selected text:
            <strong class="text-foreground/90 mt-1 block break-words italic">
              "{{ getCurrentAnnotationForDialog?.selectedText }}"
            </strong>
          </DialogDescription>
        </DialogHeader>
        <div class="py-2">
          <Textarea
            v-model="commentInputText"
            placeholder="Type your new comment..."
            class="min-h-[120px] resize-none"
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
