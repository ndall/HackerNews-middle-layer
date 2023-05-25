<template>
  <q-item
    v-if="isValid"
    tag="li">
    <q-item-section>
      <q-item-label class="text-italic">
        <q-icon
          color="accent"
          :size="$q.screen.gt.xs ? 'md' : 'sm'"
          name="account_circle" />
        <span class="author">{{ comment.by }}</span>
        {{ dayjs.unix(comment.time).fromNow() }}
      </q-item-label>

      <div
        v-html="comment.text"
        class="comment-text" />

      <template v-if="hasSubcomments">
        <q-btn
          :label="isExpanded ? 'Collapse' : 'Expand'"
          :icon="isExpanded ? 'expand_less' : 'expand_more'"
          :ripple="false"
          class="expand-button"
          color="accent"
          dense
          glossy
          rounded
          unelevated
          no-caps
          no-wrap
          @click="toggleSubcomments" />

        <q-list
          v-if="isExpanded"
          tag="ul"
          separator>
          <Suspense
            v-if="isExpansionInitiator"
            timeout="0">
            <CommentItem
              v-for="commentId of comment.kids"
              :key="commentId"
              :commentId="commentId" />

            <template #fallback>
              <q-inner-loading :showing="true">
                <q-spinner-gears color="warning" />
              </q-inner-loading>
            </template>
          </Suspense>

          <CommentItem
            v-else
            v-for="commentId of comment.kids"
            :key="commentId"
            :commentId="commentId" />
        </q-list>
      </template>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { ref, computed, inject } from 'vue';
import { useGetStory } from '../composables/useGetStory.js';

const dayjs = inject('dayjs');

const props = defineProps({
  commentId: Number,
  collapse: Boolean,
});

const comment = ref(null);
const hasSubcomments = ref(false);
const isExpanded = ref(!props.collapse); // set to false on a root comment and to true on nested comments
const isExpansionInitiator = ref(false);

const isValid = computed(() => !comment.value.deleted && !comment.value.dead);

function toggleSubcomments() {
  isExpanded.value = !isExpanded.value;
  isExpansionInitiator.value = isExpanded.value; // set to true only on the comment whose expand button was clicked
}

await useGetStory(props.commentId, comment);

if (comment.value.kids) {
  for (const commentId of comment.value.kids) {
    const subcomment = await useGetStory(commentId);

    if (!subcomment.deleted && !subcomment.dead) {
      hasSubcomments.value = true; // set to true only if comment.kids exists and contains at least one valid comment
      break;
    }
  }
}
</script>

<style lang="scss" scoped>
.q-inner-loading {
  position: relative;
  background-color: transparent;
  font-size: 50px;
  height: 69.5px;
}

.q-list {
  padding-left: clamp(16px, 4vw, 40px);
}

.q-item {
  padding: 12px 0 0 0;
}

.author {
  font-weight: bold;
  margin-left: 6px;
}

.comment-text {
  padding: 8px 12px 8px 4px;
  line-height: 1.25;
  font-size: 13px;
  overflow-wrap: anywhere;

  &:last-child {
    padding: 8px 12px 12px 4px;
  }

  :deep(p) {
    margin: 8px 0 0 0;
  }
}

.expand-button {
  align-self: flex-start;
  padding: 2px 10px 2px 6px;
  margin: 0 0 12px 4px;
  font-size: 11px;
  font-weight: bold;
}

.q-btn + .q-list > .q-item:first-child {
  padding-top: 0;
}

i {
  background-color: #f8eee7;
  border-radius: 50%;
}
</style>
