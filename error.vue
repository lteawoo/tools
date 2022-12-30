<template>
  <NuxtLayout>
    <v-container fluid>
      <v-row dense>
        <v-col>
          error {{ error }}
        </v-col>
      </v-row>
    </v-container>
  </NuxtLayout>
</template>

<script setup lang="ts">
defineProps<{
  error: Object
}>()
</script>
