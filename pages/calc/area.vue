<template>
  <ads-layout>
    <v-card>
      <v-card-title>
        평수 / 면적 계산기
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col sm="6" cols="12">
            <input-select
              v-model:input="input1"
              v-model:select="selected1"
              :items="selectItems1"
              auto-focus
              @input="input('left', $event)"
            />
          </v-col>
          <v-col sm="6" cols="12">
            <input-select
              v-model:input="input2"
              v-model:select="selected2"
              :items="selectItems2"
              @input="input('right', $event)"
            />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </ads-layout>
</template>

<script setup lang="ts">
import InputSelect from '@/components/base/input/inputSelect.vue'
import { UNIT } from '@/types/calc/area/unions/unit'

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

const input = (side: string, e: InputEvent) => {
  const target = <HTMLInputElement> e.target
  if (side === 'left') {
    input2.value = calculate()
  } else {
    input1.value = calculate()
  }
  input2.value = target.value ? String(Number(target.value) * 3.305785) : ''
}

const calculate = () => {
  return '0'
}
</script>
