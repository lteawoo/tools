<template>
  <v-responsive>
    <div class="d-flex flex-row justify-center bg-blue">
      <div class="main-container">
        <slot />
      </div>
    </div>
  </v-responsive>
</template>

<script setup lang="ts">

</script>

<style scoped>
.main-container {
  width: 100%;
  max-width: 1024px;
  padding: 32px;
}
</style>
