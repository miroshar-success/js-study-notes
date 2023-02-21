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