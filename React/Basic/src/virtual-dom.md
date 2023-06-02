# Virtual DOM

  Virtual DOM 称为 ReactNode

1. ReactElement (ReactComponentElement / ReactDOMElement)
2. ReactFragment
3. ReactText

```ts
type ReactNode = ReactElement | ReactFragment | ReactText
type ReactElement = ReactComponentElement | ReactDOMElement

type ReactDOMElement = {
  type: string
  props: {
    children: ReactNodeList,
    className: string
    id: string
    // ...
  }
  key: string | boolean | number | null
  ref: string | null
}

type ReactText = string | number
type ReactEmpty = null | undefined | boolean
type ReactFragment = Array<ReactNode | ReactEmpty>
```


  instantiateReactComponent
1. node为空   创建ReactEmptyComponent
2. node为对象
- element为字符串 -----> ReactNativeComponent / 否则初始化自定义组件ReactCompositeComponent

## 属性更新

  this.createOpenTagMarkupAndPutListeners(transaction)
```js
// 事件
enqueuePutListener(this, propKey, propValue, transaction)

// 样式
CssPropertyOperations.createMarkupForStyles(propValue, this)

// 属性
DOMPropertyOperations.createMarkupForProperty(propKey, propValue)

// 创建唯一标识
DOMPropertyOperations.createMarkupForID(this._domID)
```

## 更新属性

```js
const updateDOMProperties = (lastProps, nextProps) => {
  var propKey;
  var styleName;
  var styleUpdates;
  for (propKey in lastProps) {
    // 旧的属性不在新的属性里 删除
    if (nextProps.hasOwnProperty(propKey) || !lastProps.hasOwnProperty(propKey) || lastProps[propKey] === null) continue
    // 删除不需要的样式
    if (propKey === 'style') {
      const lastStyle = this._previousStyleCopy
      for (const key in lastStyle) {
        styleUpdates = styleUpdates || {}
        styleUpdates[key] = ''
      }
      this._previousStyleCopy = null
    }
  }
  // 新的属性 写到DOM节点
  for(propKey in nextProps) {
    const nextProp = nextProps[propKey]
    const lastProp = propKey === 'style'
      ? this._previousStyleCopy :
      lastProps != null ? lastProps[propKey] : undefined;
    if (propKey === 'style') {
      if (nextProp) {
        // 替换this._previousStyleCopy
        nextProp = this._previousStyleCopy = Object.assign({}, nextProp)
      }
      if (lastProp) {
        for (const styleName in lastProp) {
          // 在旧的styles中 且不在新的styles中 删除旧的
          if (lastProp.hasOwnProperty(styleName) && (!nextProp || !nextProp.hasOwnProperty(styleName))) {
            styleUpdates = styleUpdates || {}
            styleUpdates[styleName] = ''
          }
        }
        // 同时在旧的prop 和 新的 prop, 且不相同 更新该样式
        for (const styleName in nextProp) {
          if (nextProp.hasOwnProperty(styleName) && lastProp[styleName] !== nextProp[styleName]) {
            styleUpdates = styleUpdates || {}
            styleUpdates[styleName] = nextProp[styleName]
          }
        }
        // 没有旧样式, 直接写入新的样式
      } else {
        styleUpdates = nextProp
      }
    }
  }
}
```