
# 单元素/组件的过渡

	Vue提供了transition的封装组件,在下列情形中可以给任何元素和组件添加进入/离开过渡
		1. 条件渲染(v-if)
		2. 条件展示(v-show)
		3. 动态组件
		4. 组件根节点

## 过渡的类名

	在进入/离开的过渡种,会有6个class切换。
	1. v-enter: 定义进入过渡的开始状态。元素被插入之后的下一帧移除
	2. v-enter-active: 定义进入过渡生效时的状态。在元素被插入之前生效，在过渡/动画完成之后移除
	3. v-enter-to: 定义进入过渡的结束状态。
	4. v-leave: 定义离开过渡的开始状态。
	5. v-leave-to: 定义离开过渡生效时的状态。在整个离开过渡的阶段中应用。在过渡/动画完成之后移除。
	6. v-leave-to: 定义离开过渡的结束状态。


## CSS动画

    CSS动画用法同CSS过渡,区别是在动画中 v-enter类名在节点插入DOM后不会立刻删除,而是在animationend事件触发时删除。
```css
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
```
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    