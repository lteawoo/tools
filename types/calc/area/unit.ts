import { EnumType } from '@/types/enumType'

export class Unit extends EnumType {
  static readonly PYEONG = new Unit('평', 'pyeong')
  static readonly SQUARE_METER = new Unit('제곱미터', 'squareMeter')

  public readonly label: string
  public readonly value: string

  private constructor (label: string, value: string) {
    super()
    this.label = label
    this.value = value
  }
}
