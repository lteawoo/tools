<template>
  <v-text-field
    v-model="localInput"
    variant="outlined"
    hide-details
    :autofocus="props.autoFocus"
    @input="$emit('input', $event)"
  />
  <v-select
    v-model="localSelect"
    :items="items"
    item-title="label"
    item-value="value"
    density="compact"
    variant="outlined"
    hide-details
  />
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  items?: Array<Object>,
  input: string,
  select: string,
  autoFocus?: boolean
}>(), {
  items: () => [],
  autoFocus: false
})

const emit = defineEmits<{
(event: 'update:input', payload: string): void
(event: 'update:select', payload: string): void
(event: 'input', payload:InputEvent): void
}>()

const localInput = computed({
  get () {
    return props.input
  },

  set (n) {
    emit('update:input', n)
  }
})

const localSelect = computed({
  get () {
    return props.select
  },

  set (n) {
    emit('update:select', n)
  }
})
</script>

<style scoped>
</style>
