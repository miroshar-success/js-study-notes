// ------------------ 交叉类型 -------------------
interface Clickable {
  click(): void
}
interface Focusable {
  focus(): void
}

type EventInsectionType = Clickable & Focusable

const event_object: EventInsectionType = {
  click () {
    console.log('click')
  },
  focus () {
    console.log('focus')
  }
}


// ----------- 交叉类型顺序 ----------------
interface Scrollable {
  register (x: string): boolean
}
interface Dblclickable {
  register (x: string): string
}
type ClickAndScrollable = Dblclickable & Scrollable
type ScrollAndClickable = Scrollable & Dblclickable

const combine_function = (a: ClickAndScrollable, b: ScrollAndClickable) => {
  console.log(a.register('world'))
  console.log(b.register('hello'))
}
combine_function(
  {
    // @ts-ignore
    register (a) {
      return true || a
    }
  },
  {
    register(a) {
      return false
    }
  }
)

// ---------- 交叉类型的类型成员 ----------
type OptionalObjectPropsA = {
  x?: number
  y: number
}
type OptionalObjectPropsB = {
  z: number
  m?: bigint
}
type InsectionTypeObjectProps = OptionalObjectPropsA & OptionalObjectPropsB
const xyz: InsectionTypeObjectProps = {
  y: 123,
  z: 456
}

// -------------- 索引签名 ----------
type PropKeyA = {
  [key: string]: boolean
}
type PropKeyB = {
  [key: number]: boolean
}

type PropKeyBothKey = PropKeyA & PropKeyB
const prop_key: PropKeyBothKey = {
  1: true,
  2: false,
  'a': true
}

// ------------ 索引查询类型 ----------------
type BookProps = {
  name: string
  price: number
  author: string
}
type BookKeyProps = keyof BookProps
const book_name: BookKeyProps = 'name'
const book_price: BookKeyProps = 'price'

interface T {
  [key: string]: boolean
}
type KeyofType = keyof T  // string | number

interface NumberKeyT {
  [key: number]: string
}
type NumberKey = keyof NumberKeyT // number

const symbol_key: unique symbol = Symbol()
type SymbolKeyT = {
  // [key: symbol]: number
  [symbol_key]: boolean
}
type SymbolKey = keyof SymbolKeyT   // symbol

// ------------- 联合类型使用keyof ------------
type TypeA = { a: string; b: string }
type TypeB = { a: boolean; z: number }
type TypeAB = keyof (TypeA | TypeB)     // 'a'

// ------------- 索引访问类型 ----------------
type TypeC = { a: boolean; b: string }
type Ca = 'a'
type Cb = 'b'
type TypeCA = TypeC[Ca]
type TypeCB = TypeC[Cb]

const symbol_string: unique symbol = Symbol()
const ROLE = 'user/role'
const enum E {
  A = 10
}
type ComplexType = {
  0: string
  x: boolean
  [E.A]: number
  [symbol_string]: bigint
}

type TypeOfNumberLikeName = ComplexType[0]
type TypeOfStringLikeName = ComplexType['x']
type TypeOfEnumName = ComplexType[E.A]
type TypeofSymbolName = ComplexType[typeof symbol_string]

type ComplexTypeKey = 0 | 'x'
type ValueType = ComplexType[ComplexTypeKey]  // string | boolean

const create_select_options = <T, K extends keyof T, V extends keyof T>(list: T[] = [], label: K, value: V) => {
  const temp: { label: string; value: number }[] = []
  list.forEach(item => {
    temp.push({
      label: item[label] as unknown as string,
      value: Number(item[value])
    })
  })
  return temp
}

// -------------- 索引类型的应用 ------------
const get_object_property = <T, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key]
}
type WatchProps = {
  name: string
  price: number
  color: string
}
const watch_props: WatchProps = {
  name: 'hello',
  price: 1200,
  color: 'black'
}
const watch_price = get_object_property<WatchProps, 'price'>(watch_props, 'price')
const watch_name = get_object_property(watch_props, 'name')
const watch_color = get_object_property(watch_props, 'color')