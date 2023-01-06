export class EnumType {
  static get values (): EnumType[] {
    return Object.values(this)
  }

  static valueOf (p: string): EnumType {
    return Object.values(this).find(e => e.value === p)
  }
}
