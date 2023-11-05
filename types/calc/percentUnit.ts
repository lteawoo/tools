import { EnumType } from '@/types/enumType'

export class PercentUnit extends EnumType {
  static readonly PERCENT = new PercentUnit('%', 'percent', '퍼센트에 100을 나눕니다')
  static readonly NUMBER = new PercentUnit('숫자', 'number', '숫자에 100을 곱합니다')
}
