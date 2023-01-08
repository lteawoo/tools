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
              :items="Unit.values"
              auto-focus
              @input="input('left')"
            />
          </v-col>
          <v-col sm="6" cols="12">
            <input-select
              v-model:input="input2"
              v-model:select="selected2"
              :items="Unit.values"
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
import { Unit } from '@/types/calc/area/unit'
import { EnumType } from '@/types/enumType'

const input1 = ref<string>('1')
const input2 = ref<string>('3.305785')
const selected1 = ref<string>(Unit.PYEONG.value)
const selected2 = ref<string>(Unit.SQUARE_METER.value)
const selected1Enum = computed(() => Unit.valueOf(selected1.value))

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
    input2.value = calculate(input1.value, Unit.valueOf(selected1.value), Unit.valueOf(selected2.value))
  } else {
    input1.value = calculate(input2.value, Unit.valueOf(selected2.value), Unit.valueOf(selected1.value))
  }
}

const calculate = (value: string, source: EnumType, target: EnumType): string => {
  switch (source) {
    case Unit.PYEONG:
      if (target === Unit.SQUARE_METER) {
        return String(Math.round(Number(value) * 3.305785 * 1000000) / 1000000)
      } break
    case Unit.SQUARE_METER:
      if (target === Unit.PYEONG) {
        return String(Math.round(Number(value) / 3.305785 * 1000000) / 1000000)
      } break
  }
  return '0'
}
</script>
