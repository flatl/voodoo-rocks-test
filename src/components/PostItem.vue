<template>
  <article class="post-item">
    <h3 class="post-item__title">
      {{ post.title }}
    </h3>
    <p class="post-item__text">
      {{ post.body }}
    </p>
    <span class="post-item__author">
      {{ user.name }}
    </span>
  </article>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

import type { Post, User } from '@/lib/api';

export default defineComponent({
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    },
    user: {
      type: Object as PropType<User>,
      default: () => ({}),
    },
  },
});
</script>

<style lang="scss" scoped>
.post-item {
  display: flex;
  flex-direction: column;
  width: 100%;
  grid-gap: 1rem;
  padding: 1rem;
  // border: 1px solid var(--c-very-light-grey);
  border-radius: 0.25rem;
  box-shadow: 0 0.125rem 0.375rem rgba(222, 222, 222, 0.6);
  background-color: var(--c-white);

  &__title {
    font-size: 1rem;
    font-weight: 500;
    line-height: 22px;
    color: var(--c-violet-blue);
    text-transform: capitalize;
  }

  &__text {
    font-size: 14px;
    font-weight: 400;
    line-height: 1.25rem;
    color: var(--c-black);
    text-transform: capitalize;
  }

  &__author {
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
    color: var(--c-dark-grey);
  }
}
</style>
