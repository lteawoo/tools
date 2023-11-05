<template>
  <ads-layout>
    <v-card>
      <v-card-title>
        대출이자 계산
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col sm="3" cols="12">
            상환 방법
          </v-col>
          <v-col sm="9" cols="12">
            <v-btn-toggle v-model="solution" divided mandatory class="d-flex flex-row">
              <v-btn class="flex-grow-1" value="division">
                분할상환
              </v-btn>
              <v-btn class="flex-grow-1" value="maturity">
                만기일시
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row v-if="solution === 'division'">
          <v-col sm="3" cols="12" />
          <v-col sm="9" cols="12">
            <v-btn-toggle v-model="divisionType" divided mandatory class="d-flex flex-row">
              <v-btn class="flex-grow-1" value="principal">
                원금 균등
              </v-btn>
              <v-btn class="flex-grow-1" value="interest">
                원리금 균등
              </v-btn>
              <v-btn class="flex-grow-1" value="jam">
                체증식
              </v-btn>
            </v-btn-toggle>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="3" cols="12">
            추가 계산
          </v-col>
          <v-col sm="9" cols="12">
            <div class="d-flex">
              <v-switch v-model="grace" label="거치기간" density="compact" hide-details />
              <v-switch v-model="prepayment" label="중도상환 / 금리변동" density="compact" hide-details />
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="3" cols="12">
            대출 금액
          </v-col>
          <v-col sm="9" cols="12">
            <v-text-field
              v-model="loanAmt"
              density="compact"
              variant="outlined"
              class="right-input"
              aria-autocomplete="false"
              inputmode="numeric"
            >
              <template #append-inner>
                <div class="append-input">
                  만원
                </div>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="3" cols="12">
            대출 기간
          </v-col>
          <v-col sm="9" cols="12">
            <v-text-field
              v-model="loanPeriod"
              density="compact"
              variant="outlined"
              class="right-input"
              aria-autocomplete="false"
              inputmode="numeric"
            >
              <template #append-inner>
                <div class="append-input">
                  개월
                </div>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="3" cols="12">
            대출 금리
          </v-col>
          <v-col sm="9" cols="12">
            <v-text-field
              v-model="loanRate"
              density="compact"
              variant="outlined"
              class="right-input"
              aria-autocomplete="false"
              inputmode="numeric"
            >
              <template #append-inner>
                <div class="append-input">
                  %
                </div>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col sm="3" cols="12">
            대출일
          </v-col>
          <v-col sm="9" cols="12">
            우왕
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn block variant="flat" size="x-large" @click="calculate">
              계산
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card class="mt-3">
      <v-card-title>
        계산 결과
      </v-card-title>
      <v-card-text>
        <v-table>
          <thead>
            <tr>
              <th>항목</th>
              <th>값</th>
              <th>비고</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>대출 금액</td>
              <td>{{ calcResult.loanAmt }}</td>
              <td>입력 값</td>
            </tr>
            <tr>
              <td>대출 기간</td>
              <td>{{ calcResult.loanPeriod }}</td>
              <td>입력 값</td>
            </tr>
            <tr>
              <td>대출 금리</td>
              <td>{{ calcResult.loanRate }}</td>
              <td>입력 값</td>
            </tr>
            <tr>
              <td>월 평균 이자</td>
              <td>{{ calcResult.monthlyInterest }}</td>
              <td />
            </tr>
            <tr>
              <td>월 상환 금액</td>
              <td>{{ calcResult.monthlyRepay }}</td>
              <td />
            </tr>
            <tr>
              <td>총 이자액</td>
              <td>{{ calcResult.totalInterest }}</td>
              <td />
            </tr>
            <tr>
              <td>총 상환 금액</td>
              <td>{{ calcResult.totalRepay }}</td>
              <td />
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>

    <v-card class="mt-3">
      <v-card-title>
        계산 결과
      </v-card-title>
      <v-card-text>
        <v-table>
          <thead>
            <tr>
              <th>회차</th>
              <th>월 상환 금액</th>
              <th>상환 원금</th>
              <th>대출 잔금</th>
              <th>대출 이자</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>5555</td>
              <td>5555</td>
              <td>55555</td>
              <td>55555</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </ads-layout>
</template>

<script setup lang="ts">

const solution = ref('division')
const divisionType = ref()
const loanAmt = ref(100)
const loanPeriod = ref(5)
const loanRate = ref(5)
const grace = ref(false)
const prepayment = ref(false)

const calcResult = ref({
  loanAmt: 0,
  loanPeriod: 0,
  loanRate: 0,
  monthlyInterest: 0,
  monthlyRepay: 0,
  totalInterest: 0,
  totalRepay: 0
})

watch(solution, (n) => {
  if (n === 'maturity') {
    divisionType.value = null
  }
})

/**
 * 은행은 줘야할땐 더주고
 * 받아야할땐 덜준다
 * 1.1 줘야할땐 -> 2원 줌
 * 1.8 받아야할땐 -> 1원 받음
 */
const calculate = () => {
  calcResult.value.loanAmt = loanAmt.value * 10000
  calcResult.value.loanPeriod = loanPeriod.value
  calcResult.value.loanRate = loanRate.value
  calcResult.value.monthlyInterest = Math.floor(calcResult.value.loanAmt * (calcResult.value.loanRate / 100) / 12)
  calcResult.value.totalInterest = calcResult.value.monthlyInterest * calcResult.value.loanPeriod
  calcResult.value.totalRepay = calcResult.value.loanAmt + calcResult.value.totalInterest
}
</script>

<style scoped>
.right-input:deep(input) {
  text-align: right;
}

.append-input {
  min-width: 40px;
  text-align: center;
}
</style>
