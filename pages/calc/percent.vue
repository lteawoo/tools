<template>
  <ads-layout>
    <v-card>
      <v-card-title>
        <h1 class="my-5">퍼센트 계산기</h1>
      </v-card-title>

      <v-divider />

      <v-card-text>
        <v-row>
          <v-col sm="6" cols="12">
            <input-select
              v-model:input="input1"
              v-model:select="selected1"
              :items="PercentUnit.values"
              auto-focus
              @input="input('left')"
            />
          </v-col>
          <v-col sm="6" cols="12">
            <input-select
              v-model:input="input2"
              v-model:select="selected2"
              :items="PercentUnit.values"
              @input="input('right')"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-chip>공식</v-chip> {{ selected1Enum.desc }}
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </ads-layout>
</template>

<script setup lang="ts">
import InputSelect from '@/components/base/input/inputSelect.vue'
import { PercentUnit } from '@/types/calc/percentUnit'
import { EnumType } from '@/types/enumType'

definePageMeta({
  title: '퍼센트 계산기'
})

useHead({
  title: '퍼센트 계산기',
  meta: [{
    property: 'og:description', content: '퍼센트 계산기, 퍼센트 숫자 변환, 계산기'
  }]
})

const input1 = ref<string>('10')
const input2 = ref<string>('0.1')
const selected1 = ref<string>(PercentUnit.PERCENT.value)
const selected2 = ref<string>(PercentUnit.NUMBER.value)
const selected1Enum = computed(() => PercentUnit.valueOf(selected1.value))

watch(selected1, (n, o) => {
  if (n === selected2.value) {
    selected1.value = selected2.value
    selected2.value = o
  }
  input('left')
})

watch(selected2, (n, o) => {
  if (n === selected1.value) {
    selected2.value = selected1.value
    selected1.value = o
  }
  input('left')
})

const input = (side: string) => {
  if (side === 'left') {
    input2.value = calculate(input1.value, PercentUnit.valueOf(selected1.value), PercentUnit.valueOf(selected2.value))
  } else {
    input1.value = calculate(input2.value, PercentUnit.valueOf(selected2.value), PercentUnit.valueOf(selected1.value))
  }
}

const calculate = (value: string, source: EnumType, target: EnumType): string => {
  switch (source) {
    case PercentUnit.PERCENT:
      if (target === PercentUnit.NUMBER) {
        return String(Math.round(Number(value) / 100 * 1000000) / 1000000)
      } break
    case PercentUnit.NUMBER:
      if (target === PercentUnit.PERCENT) {
        return String(Math.round(Number(value) * 100 * 1000000) / 1000000)
      } break
  }
  return '0'
}
</script>
