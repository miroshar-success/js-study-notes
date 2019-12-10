# v-model

    v-model 会忽略所有表单元素的 value、checked、selected 特性的初始值而总是将 Vue 实例的数据作为数据来源。
    你应该通过 JavaScript 在组件的 data 选项中声明初始值。
    
    tips:
    1. 在文本区域插值 <textarea>{{text}}</textarea>并不会生效,应用v-model来代替
    2. v-model收集到到数据是 value
    3. 如果 v-model 表达式的初始值未能匹配任何选项，<select> 元素将被渲染为“未选中”状态。在 iOS 中，这会使用户无法选择第一个选项。
    因为这样的情况下，iOS 不会触发 change 事件。因此，更推荐像下面这样提供一个值为空的禁用选项。

```html
<div id="example-5">
  <select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>
```

# v-text

    更新元素的 textContent。如果要更新部分的 textContent ，需要使用 {{ Mustache }} 插值。
    
# v-cloak

    这个指令保持在元素上直到关联实例结束编译。和 CSS 规则如 [v-cloak] { display: none } 一起用时，
    这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。
```html
<style>
    [v-cloak] {
      display: none;
    }
</style>

<div v-cloak>
  {{ message }}
</div>
```