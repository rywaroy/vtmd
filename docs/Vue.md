# vue文件解析细节

**vue组件介绍**

```js

/**
 * @intro 组件
 * 用来展示列表
 */
export default {
  // xxx
}
```

检测vue文件script标签中导出对象的前置注释，简单得说就是写在`exprot default {}`上方的注释。可以写 版本、作者、组件功能等信息。


**props**

```js
export default {
  props: {
    // 这是苹果
    apple: String,

    // 这是香蕉
    banana: {
      type: String,
      default: 'banana',
      required: true,
    }
  },
}
```

获取props对象下的内容，同时解析每个属性的前置注释，上述代码会转化成：

```md
## props 

#### apple 

类型： String 

备注：  这是苹果

 

#### banana 

类型： String 

required： true

备注：  这是香蕉
```

设置了vue组件下会转化成：

```md
<vtmd-head2 content="props"/> 

<vtmd-props
  name="apple" 
  type="String" 
/> 

<vtmd-notes 
 txt=" 这是苹果"
/> 

 

<vtmd-props
  name="banana" 
  type="String" 
  required="true" 
/> 

<vtmd-notes 
 txt=" 这是香蕉"
/> 
```

> props为数组形式则不会解析注释

**data**

```js
export default {
  data() {
    return {
      apple: 'apple', // 这是苹果
      banana: 1, // 这是香蕉
      fruits: { // 这是水果
        peach: 'peach',
      }
    }
  },
}
```

遍历所有data返回对象的属性，获取每个属性的后置注释，上述代码会转化成：

```md
## data 

#### apple 

类型： String 

备注：  这是苹果

 

#### banana 

类型： Number 

备注：  这是香蕉

 

#### fruits 

类型： Object 

备注：  这是水果
```

设置了vue组件下会转化成：

```md
<vtmd-head2 content="data"/> 

<vtmd-props
  name="apple" 
  type="String" 
/> 

<vtmd-notes 
 txt=" 这是苹果"
/> 

 

<vtmd-props
  name="banana" 
  type="Number" 
/> 

<vtmd-notes 
 txt=" 这是香蕉"
/> 

 

<vtmd-props
  name="fruits" 
  type="Object" 
/> 

<vtmd-notes 
 txt=" 这是水果"
/> 
```

**methods**

```js
export default {
  methods: {
    /**
     * 吃
     * @param {String} name - 水果名字
     * @param {String} color - 水果颜色
     * @returns {String} 返回水果名字
     */
    eat(name, color) {
      return name;
    }
  },
}
```

遍历methods下所有的方法，解析每个方法的前置注释，上述代码会转化成：

```md
## methods 

### eat  (name, color)  → {String} 

吃

**参数** 

| 参数 | 类型 | 说明
| ---- | ---- | ---- | 
| name | String | 水果名字 
| color | String | 水果颜色 

**返回值** 

| 类型 | 说明
| ---- | ---- | 
| String |  返回水果名字
```

设置了vue组件下会转化成：

```md
<vtmd-head2 content="methods"/> 

<vtmd-method-name
name="eat" 
  params="name, color"
  returns="String " 
/> 

<vtmd-notes 
 txt="吃"
/> 

**参数** 

| 参数 | 类型 | 说明
| ---- | ---- | ---- | 
| name | String | 水果名字 
| color | String | 水果颜色 

**返回值** 

| 类型 | 说明
| ---- | ---- | 
| String | 返回水果名字
```

**computed**

```js
computed: {
  // 价格
  // @returns {Number} 返回的价格
  price() {
    
  },
  ...mapState({
    // 重量
    weight: state => state.weight,
    // 颜色
    color: state => state.color,
  }),
},
```

遍历computed下所有的方法，解析每个方法的前置注释，同时支持配合vuex的展开运算符，上述代码会转化成：

```md
## computed 

### price  → {Number} 

 价格

 

### weight

 重量

 

### color

 颜色
```

设置了vue组件下会转化成：

```md
<vtmd-head2 content="computed"/> 

<vtmd-method-name
name="price" 
  returns="Number " 
/> 

<vtmd-notes 
 txt=" 价格"
/> 

**返回值** 

| 类型 | 说明
| ---- | ---- | 
| Number | 返回的价格 

 

<vtmd-method-name
name="weight" 
/> 

<vtmd-notes 
 txt=" 重量"
/> 

 

<vtmd-method-name
name="color" 
/> 

<vtmd-notes 
 txt=" 颜色"
/> 
```

**filters**

```js
filters: {
  /**
   * 带上单位
   * @param {Number} value - 重量g
   * @returns {String} -重量
   */
  weight(value) {
    if (value >= 1000) {
      return `${value / 1000}kg`
    }
    return `${value}g`
  }
},
```

解析同methods，上述代码会转化成：

```md
## filters 

### weight  (value)  → {String} 

带上单位

**参数** 

| 参数 | 类型 | 说明
| ---- | ---- | ---- | 
| value | Number | 重量g 

**返回值** 

| 类型 | 说明
| ---- | ---- | 
| String | -重量 
```

设置了vue组件下会转化成：

```md
<vtmd-head2 content="filters"/> 

<vtmd-method-name
name="weight" 
  params="value"
  returns="String " 
/> 

<vtmd-notes 
 txt="带上单位"
/> 

**参数** 

| 参数 | 类型 | 说明
| ---- | ---- | ---- | 
| value | Number | 重量g 

**返回值** 

| 类型 | 说明
| ---- | ---- | 
| String | -重量 
```

**watch**

```js
watch: {
  // 监听颜色变化
  color() {
    return this.color;
  }
}
```

解析同methods，上述代码会转化成：

```md
## watch 

### color

 监听颜色变化
```

设置了vue组件下会转化成：

```md
<vtmd-head2 content="watch"/> 

<vtmd-method-name
name="color" 
/> 

<vtmd-notes 
 txt=" 监听颜色变化"
/> 
```