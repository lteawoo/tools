export class EnumType {
  public readonly label: string
  public readonly value: string
  public readonly desc?: string

  constructor (label: string, value: string, desc: string) {
    this.label = label
    this.value = value
    this.desc = desc
  }

  static get values (): EnumType[] {
    return Object.values(this)
  }

  static valueOf (p: string): EnumType {
    return Object.values(this).find(e => e.value === p)
  }
}
