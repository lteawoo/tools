<template>
  <ads-layout>
    <v-card elevation="1">
      <v-card-title>
        <h1 class="my-5">평수 / 면적 계산기</h1>
      </v-card-title>

      <v-divider />

      <v-card-text>
        <v-row>
          <v-col sm="6" cols="12">
            <input-select
              v-model:input="input1"
              v-model:select="selected1"
              :items="AreaUnit.values"
              auto-focus
              @input="input('left')"
            />
          </v-col>
          <v-col sm="6" cols="12">
            <input-select
              v-model:input="input2"
              v-model:select="selected2"
              :items="AreaUnit.values"
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
import { AreaUnit } from '@/types/calc/area/areaUnit'
import { EnumType } from '@/types/enumType'

definePageMeta({
  title: '평수 / 면적 계산기'
})

useHead({
  title: '평수 / 면적 계산기',
  meta: [{
    property: 'og:description', content: '평수 계산기, 면적 계산기, 평수, 면적, 계산기, 평 제곱 계산기, 부동산 계산기'
  }]
})

const input1 = ref<string>('1')
const input2 = ref<string>('3.305785')
const selected1 = ref<string>(AreaUnit.PYEONG.value)
const selected2 = ref<string>(AreaUnit.SQUARE_METER.value)
const selected1Enum = computed(() => AreaUnit.valueOf(selected1.value))

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
    input2.value = calculate(input1.value, AreaUnit.valueOf(selected1.value), AreaUnit.valueOf(selected2.value))
  } else {
    input1.value = calculate(input2.value, AreaUnit.valueOf(selected2.value), AreaUnit.valueOf(selected1.value))
  }
}

const calculate = (value: string, source: EnumType, target: EnumType): string => {
  switch (source) {
    case AreaUnit.PYEONG:
      if (target === AreaUnit.SQUARE_METER) {
        return String(Math.round(Number(value) * 3.305785 * 1000000) / 1000000)
      } break
    case AreaUnit.SQUARE_METER:
      if (target === AreaUnit.PYEONG) {
        return String(Math.round(Number(value) / 3.305785 * 1000000) / 1000000)
      } break
  }
  return '0'
}
</script>
