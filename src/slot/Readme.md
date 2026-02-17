在某些场景中，我们可能想要为子组件传递一些模板片段，让子组件在它们的组件中渲染这些片段

### 具名插槽
使用方需要用`<template>`包裹,  `#`指定插槽名称



### 作用域插槽

插槽内容无法访问子组件的数据。Vue 模板中的表达式只能访问其定义时所处的作用域，这和 JavaScript 的词法作用域规则是一致的。**换言之：父组件模板中的表达式只能访问父组件的作用域；子组件模板中的表达式只能访问子组件的作用域。**

然而在某些场景下插槽的内容可能想要同时使用父组件域内和子组件域内的数据。要做到这一点，我们可以类似于`:props`的方式来让插槽暴露出数据（需要区分的是， 这里是子组件传递数据给父组件）。 
```
<div>
    <slot name = "scope" :text="greetingMessage" :count="1"></slot>
</div>
```
然后使用方通过`{{}}`取值， 如`{{root.key}}`, 这就是作用域插槽，
```
<template #scope="slotProps">
    <p>slotProps: {{slotProps}}</p>
    <p>text: {{slotProps.text}}</p>
    <p>count: {{slotProps.count}}</p>
</template>
```

当然取值方式也可以不用root直接解构取值
- 单绑定对象解构结果是： 该对象内部所有的key的值
- 多绑定对象解构结果是： 各个对象本身

特别的当插槽`v-bind`没有指定名称的时候， 比如`<slot name="item" v-bind="item"/>` ， 则子组件只能解构单绑定对象来取值

### 循环插槽
默认情况下， 子组件不能重复使用同名的插槽，
```
An element cannot have multiple '<template>' elements which are distributed to the same slot.
```

除非当插槽模板是个循环结构， 这样使用方`#itemV1`自然就具备了多个同插槽名, 但渲染的数据各不相同
```
<ul>
    <li v-if="!items.length">
        Loading...
    </li>
    <li v-for="item in items" :key="item.id">
        <slot name="itemV1" :data="item"/>
    </li>
</ul>
```

### 无渲染组件
一些组件可能只包括了计算逻辑而不需要自己渲染内容，视图输出通过作用域插槽全权交给了消费者组件。

我们将这种类型的组件称为无渲染组件。如一个封装了追踪当前鼠标位置逻辑的组件：
```
<MouseTracker v-slot="{ x, y }">
  Mouse is at: {{ x }}, {{ y }}
</MouseTracker>
```

