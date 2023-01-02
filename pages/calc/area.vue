<template>
  <ads-layout>
    <v-card>
      <v-card-title>
        평수 / 면적 계산기
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <input-select
              v-model:input="input1"
              v-model:select="selected1"
              :items="selectItems1"
              @input="calcInput1"
            />
          </v-col>
          <v-col cols="6">
            <input-select
              v-model:input="input2"
              v-model:select="selected2"
              :items="selectItems2"
              @input="calcInput2"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </ads-layout>
</template>

<script setup lang="ts">
import InputSelect from '@/components/base/input/inputSelect.vue'

const selectItems1 = [{
  label: '평',
  value: 'pyeong'
}]
const selectItems2 = [{
  label: '제곱미터',
  value: 'squareMeter'
}]

const input1 = ref<string>('1')
const input2 = ref<string>('3.306')
const selected1 = ref<string>('pyeong')
const selected2 = ref<string>('squareMeter')

onMounted(() => {
})

const calcInput1 = (e: InputEvent) => {
  const target = <HTMLInputElement> e.target
  input2.value = target.value ? String(Number(target.value) * 3.305785) : ''
}

const calcInput2 = (e: InputEvent) => {
  const target = <HTMLInputElement> e.target
  input1.value = target.value ? String(Number(target.value) / 3.305785) : ''
}
</script>
