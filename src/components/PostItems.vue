<template>
  <div class="post-items">
    <div
      v-for="(column, index) of postColumns"
      :key="index"
      class="post-items__column"
    >
      <post-item
        v-for="post of column"
        :key="post.id"
        :post="post"
        :user="users[post.userId]"
        class="post-items__item"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import PostItem from './PostItem.vue';

import type { Post, User } from '@/lib/api';

interface Users {
  [key: number]: User
}

type MaxColumns = 4 | 3 | 2 | 1;

export default defineComponent({
  components: { PostItem },

  props: {
    posts: {
      type: Array as PropType<Post[]>,
      required: true,
    },

    users: {
      type: Object as PropType<Users>,
      required: true,
    },
  },

  data() {
    return { windowWidth: 1920 };
  },

  mounted() {
    this.windowWidth = window.innerWidth;
    // @ts-ignore
    window.addEventListener('resize', this.handleResize);
  },

  unmounted() {
    // @ts-ignore
    window.removeEventListener('resize', this.handleResize);
  },

  computed: {
    maxColumns(): MaxColumns {
      if (this.windowWidth > 1440) {
        return 4;
      } else if (this.windowWidth > 991) {
        return 3;
      } else if (this.windowWidth > 600) {
        return 2;
      }

      return 1;
    },

    postColumns(): Post[][] {
      const columns = Array(this.maxColumns)
        .fill(null)
        .map(() => []);

      let counter = 0;

      for (const post of this.posts) {
        (columns[counter] as Post[]).push(post);

        if (counter === this.maxColumns - 1) counter = 0;
        else counter++;
      }

      return columns;
    },
  },

  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
  }
});
</script>

<style lang="scss" scoped>
.post-items {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1.25rem;

  &__column {
    display: flex;
    flex-direction: column;
    grid-gap: 1rem;
  }
}

@media (max-width: 1440px) {
  .post-items {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 991px) {
  .post-items {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 600px) {
  .post-items {
    grid-template-columns: 1fr;
  }
}
</style>
