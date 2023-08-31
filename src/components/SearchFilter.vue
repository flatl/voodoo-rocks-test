<template>
  <div class="search-filter">
    <label
      for="searchFilterInput"
      :class="['search-filter__label', { focused: isFocused }]"
    >
      <loupe-thumb class="search-filter__label__thumb" />
    </label>
    <input
      v-model="inputValue"
      type="text"
      id="searchFilterInput"
      placeholder="Filter by author..."
      class="search-filter__input"
      @focus="isFocused = true"
      @blur="isFocused = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoupeThumb from '@/components/icons/LoupeThumb.vue';

export default defineComponent({
  components: { LoupeThumb },

  emits: {
    input(value: string): boolean {
      return typeof value === 'string';
    }
  },

  data(): { value: string, isFocused: boolean } {
    return {
      value: '',
      isFocused: false
    };
  },

  computed: {
    inputValue: {
      get() {
        return this.value;
      },
      set(value: string) {
        this.$emit('input', value);
        this.value = value;
      },
    }
  }
});
</script>

<style lang="scss" scoped>
.search-filter {
  display: flex;
  flex-direction: row;
  max-width: 100%;

  &__label {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0.5rem;
    border: 1px solid var(--c-very-light-grey);
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    background-color: var(--c-white);
    cursor: text;

    &.focused {
      border-right-color: var(--c-violet-blue);
    }
  }

  &__input {
    max-width: calc(100% - 34px);
    border: 1px solid var(--c-very-light-grey);
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;

    &:focus {
      border-color: var(--c-violet-blue);
      box-shadow: 0 0 4px 0 var(--c-violet-blue);
    }
  }
}
</style>
