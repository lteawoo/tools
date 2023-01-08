import { EnumType } from '@/types/enumType'

export class Unit extends EnumType {
  static readonly PYEONG = new Unit('평', 'pyeong', '평수에 3.305785을 곱합니다.')
  static readonly SQUARE_METER = new Unit('제곱미터', 'squareMeter', '제곱미터에 3.305785을 나눕니다.')
}
