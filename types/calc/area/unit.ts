export class Unit {
  static readonly PYEONG = new Unit('평', 'pyeong')
  static readonly SQUARE_METER = new Unit('제곱미터', 'squareMeter')

  public readonly label: string
  public readonly value: string

  static get values (): Unit[] {
    Object.keys(this)
    return []
  }

  private constructor (label: string, value: string) {
    this.label = label
    this.value = value
  }
}
