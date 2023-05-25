<template>
  <li v-if="isValid">
    <q-item
      class="block"
      :to="{ name: 'story', params: { id: story.id } }">
      <q-item-section>
        <q-item-label
          class="row no-wrap items-center q-mb-xs text-weight-bold text-subtitle1">
          {{ story.title }}
          <q-btn
            @click.stop
            :href="story.url"
            target="_blank"
            icon="link"
            class="q-ml-sm"
            size="12px"
            color="accent"
            glossy
            round
            dense
            :ripple="false" />
        </q-item-label>

        <q-item-label
          class="no-margin"
          caption>
          posted by {{ story.by }} {{ dayjs.unix(story.time).fromNow() }}
        </q-item-label>

        <div class="q-mt-sm q-gutter-x-sm">
          <q-badge
            class="q-py-xs q-px-sm"
            color="red"
            rounded>
            Score: {{ story.score }}
            <q-icon
              name="thumb_up"
              class="q-ml-xs" />
          </q-badge>

          <q-badge
            class="q-py-xs q-px-sm"
            color="blue"
            rounded>
            Comments: {{ story.descendants }}
            <q-icon
              name="comment"
              class="q-ml-xs" />
          </q-badge>
        </div>
      </q-item-section>
    </q-item>

    <q-separator spaced="sm" />
  </li>
</template>

<script setup>
import { computed, toRef, inject } from 'vue';

const dayjs = inject('dayjs');

const props = defineProps({
  story: Object,
});

const story = toRef(props, 'story');

const isValid = computed(() => !story.value.deleted && !story.value.dead);
</script>
