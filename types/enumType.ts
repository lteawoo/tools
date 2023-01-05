export class EnumType {
  static get values (): EnumType[] {
    return Object.values(this)
  }

  static valueOf (p: string): EnumType {
    console.log(p)
    return p
  }
}
