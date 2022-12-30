<template>
  <ads-layout>
    <v-card>
      <v-card-title>
        평수 / 면적 계산기
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-text-field
              prefix="제곱미터"
              placeholder="test"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              prefix="평"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </ads-layout>
</template>

<script setup lang="ts">

</script>
