# umi解析细节

> umi解析只支持components模式

如果是解析umi可以在命令行带上`--umi`

```
npx vtmd --umi
```

umi默认使用的是约定式路由，常规文件如下：

```bash
├── /pages/
│   └── /apple/
│       ├── index.js
│       ├── map.js
│       ├── model.js
│   └── /banana/
│       ├── index.js
│       ├── map.js
│       ├── model.js
│       ├── /components/
│           ├── compontent.js
│   └── /peach/
│       ├── index.js
│       ├── map.js
│       ├── /models/
│           ├── model1.js
│           ├── model2.js
```

一个页面中会带有 `index.js` `map.js` `model.js` 或者 文件夹 `models` `components`, vtmd 会解析这几种文件（夹）

## index.js

`index.js`为页面组件，同时支持`index.jsx`。vtmd会解析导出的类组件或者函数组件的头部注释作为主注释

```js
/**
 * @title 组件
 * @version v1.1.0
 **/
export default class Component extends react.Component {}
```

或者

```js
/**
 * @title 函数组件
 * @version v1.1.0
 **/
export default function Component(props) {}
```

同时也支持导出变量

```js
/**
 * @title 组件
 * @version v1.1.0
 **/
class Component extends react.Component {}

export default Component;
```

同时再支持antd Form组件

```js
/**
 * @title 组件
 * @version v1.1.0
 **/
class Component extends react.Component {}

export default Form.create()(Component);
```

同时再再支持dav connect

```js
/**
 * @title 组件
 * @version v1.1.0
 **/
class Component extends react.Component {}

export default connect(({ global }) => ({ global }))(Form.create()(Component));
```

甚至把他们组合起来

```js
/**
 * @title 组件
 * @version v1.1.0
 **/
class Component extends react.Component {}

export default connect(({ global }) => ({ global }))(Form.create()(Form.create()(Component)));
```

反正能想到的我都支持了，随你怎么导出。

### state

在class中，vtmd会查找`constructor`构造函数，找出`this.state`, 解析所有的属性以及右侧的单行注释

```js
class Component extends react.Component {
    constructor() {
        this.state = {
            a: 'a', // 只是a
            b: 'b', // 只是b
        }
    }
}
```

也支持state属性(不是特别建议，有未知bug)

```js
class Component extends react.Component {
    state = {
        a: 'a', // 只是a
        b: 'b', // 只是b
    }
}
```

### props

vtmd会搜寻所有的称述语句找出`defaultProps` 和 `propTypes` 解析出所有的props属性以及它的默认值

```js
Component.propTypes = {
    a: PropTypes.string,
    b: PropTypes.number,
};

Component.defaultProps = {
    a: 'a'
};

```

### methods

vtmd会解析class中所有的方法

```js
class Component extends react.Component {

    /**
     * 获取列表
     * @param {Number} page - 页码
     * @param {Number} size - 每页个数
     * @returns {Array} 数据
     **/
    getList(page, size) {
        // ...
        return list;
    }
}
```

同时也支持属性

```js
class Component extends react.Component {

    /**
     * 获取列表
     * @param {Number} page - 页码
     * @param {Number} size - 每页个数
     * @returns {Array} 数据
     **/
    getList = (page, size) => {
        // ...
        return list;
    }
}
```

但是这些方法中会过滤掉react的生命周期（感觉没什么必要）

## map.js

map.js会存放一些table form的配置，所以vtmd会查找文件中所有导出的内容

```js

// filter
export function listFilter(_self) {
    return [];
}

// table
export function listColumn(_self) {
    return [];
}
```

## model.js

vtmd会查找`model.js` 以及model文件夹下所有的js文件，非js文件或文件夹会忽略。再解析导出的对象，对象的头注释作为主注释。

```js
// 注释
export default { 
    namespace: 'space',
    state: {},
    effects: {},
    reducers: {},
}
```

### namespace

直接获取`namespace`属性的值

### state

state可以是一个对象，解析规则同index.js的state

```js
export default { 
    state: {
        a: 'a', // 只是a
        b: 'b', // 只是b
    },
}
```

同时state也可以是函数的返回值

```js
const initState = () => ({
    a: 'a', // 只是a
    b: 'b', // 只是b
});

export default { 
    state: initState(),
}
```

支持变量、函数、箭头函数等等，该有的形式我都支持了！

```js
const initState1 = () => ({
    a: 'a', // 只是a
    b: 'b', // 只是b
});

const initState2 = () => {
    return {
        a: 'a', // 只是a
        b: 'b', // 只是b
    }
};

const initState3 = function() {
    return {
        a: 'a', // 只是a
        b: 'b', // 只是b
    }
};

function initState4() {
    return {
        a: 'a', // 只是a
        b: 'b', // 只是b
    }
};
```

### effects

获取导出对象中的`effects`属性，解析出该属性下的所有方法，解析规则同index.js 的methods

```js
export default { 
    effects: {

        // 获取列表
        getList() {
            // ...
            return list;
        }
    },
}
```

## components

由于怕与全局公用组件`components/*/*.js`产生混淆，无法分别到底是全局公用组件还是页面的私有组件，页面的私有组件只针对于components文件夹下的js文件`components/*.js`。

解析的规则同index.js