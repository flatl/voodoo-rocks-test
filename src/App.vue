<template>
  <main class="main">
    <search-filter
      class="main__filter"
      @input="handleSearch"
    />
    <post-items
      :posts="filteredPosts"
      :users="usersById"
      class="main__items"
    />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import JsonPlaceholderAPI from '@/lib/api/jsonPlaceholderApi';
import PostItems from './components/PostItems.vue';
import SearchFilter from './components/SearchFilter.vue';

import type { Post, User } from '@/lib/api';

interface Data {
  jsonPlaceholderApi: JsonPlaceholderAPI
  posts: Post[]
  users: User[]

  filterValue: string
}

export default defineComponent({
  components: { PostItems, SearchFilter },

  data(): Data {
    const jsonPlaceholderApi = new JsonPlaceholderAPI();

    return {
      jsonPlaceholderApi,
      posts: [],
      users: [],

      filterValue: '',
    };
  },

  computed: {
    usersById(): { [key in number]: User } {
      return Object.fromEntries(
        this.users.map((user) => [user.id, user])
      );
    },

    filteredPosts(): Post[] {
      if (this.filterValue) {
        const authorRegExp = new RegExp(this.filterValue, 'i');

        return this.posts.filter(
          (post) => authorRegExp.test(
            this.usersById[post.userId].name
          )
        );
      }
        
      return this.posts;
    },
  },

  async mounted() {
    const promises = [
      (async () => {
        const response = await this.jsonPlaceholderApi.getPosts();

        if (response.success) {
          this.posts = response.data;
        } else {
          throw new Error(response.message);
        }
      })(),
      (async () => {
        const response = await this.jsonPlaceholderApi.getUsers();

        if (response.success) {
          this.users = response.data;
        } else {
          throw new Error(response.message);
        }
      })()
    ];

    Promise.all(promises)
      .catch((aggregateError: Error & { errors: any[] }) => {
        aggregateError.errors.forEach(
          (error) => console.error(error)
        );
      });
  },

  methods: {
    handleSearch(value: string) {
      this.filterValue = value;
    },
  },
});
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1920px;
  grid-gap: 2rem;
  padding: 2rem 3rem;
}

@media (max-width: 991px) {
  .main {
    padding: 2rem 2rem;
  }
}

@media (max-width: 600px) {
  .main {
    padding: 2rem 1rem;
  }
}
</style>
./lib/api/jsonPlaceholderApi./lib/api/jsonPlaceholderApi