# vtmd

> .vue文件 / umi 转化成说明文档，配合vuepress使用，因懒惰而进步！

## 安装

```
npm i vtmd -D
```

## 使用

创建`vtmd.config.js`文件

```js
module.exports = {
  entry: 'components',
  compontent: true,
  output: 'docs',
};
```

执行命令

```
npx vtmd --component --config vtmd.config.js
```

或者指定文件

```
npx vtmd components/A components/B.vue
```

> 文件后缀可不带.vue，会自动检测添加

假如不配置config，会默认查找当前目录下的`vtmd.config.js`文件，没有该文件则会使用默认配置

**配置参数说明**

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | :--- |
| entry | string | src | 入口文件夹，该文件夹内所有vue文件都将被执行转化 |
| compontent | boolean | false | 是否使用vue组件 |
| ignore | string、array | null | 需要忽略的文件夹 |
| output | string | doc | 生成的目标文件夹 |
| target | array | [] | 指定vue文件的路径 |

配置了`compontent: true`可以使用vue组件来自定义样式。使用`--component`,默认的配置参数`compontent`会变成`true`，同时vtmd会在`docs/.vuepress/components`文件夹下生成vue组件：

* `VtmdHead2.vue` - 改写 h2 组件

* `VtmdHead3.vue` - 改写 h3 组件

* `VtmdMethodName.vue` - methods、computed、filters、watch 方法名组件

* `VtmdNotes.vue` - 注释组件

* `VtmdProps.vue` - props data 的属性名组件

* `VtmdBlock.vue` - 块组件

* `VtmdFileBox.vue` - 文件容器组件


改写以上组件就可以自定义样式。请确保配合使用[vuepress](https://vuepress.vuejs.org/zh/guide/)，否则vue组件将无法正常展示。

> `--component` 会覆盖原来的组件，请谨慎使用

### 注释规范

* `@version` - 版本号
* `@author` - 作者
* `@param` - 参数
* `@returns` - 返回参数
* `@intro` - 介绍
* `@url` - 地址
* `@image` - 图片
* `@txt` - 文本
* `@title` - 标题

> 注释中不带有@ 自动当做正常文本处理，带上@txt

在代码中，块级注释和行级注释是等同的

```js
/**
 * @intro 这是介绍
 * @version 1.1.1
 * @author zhangzhihao
 * @url www.3zsd.com
 * @image ./images/1.jpeg
 * @param {string} apple - name.
 * @param {string} banana - name.
 * @returns {Number} Sum of a and b
 * 文本
 * 文本2
 */
```

等同于

```js
 // @intro 这是介绍
 // @version 1.1.1
 // @author zhangzhihao
 // @url www.3zsd.com
 // @image ./images/1.jpeg
 // @param {string} apple - name.
 // @param {string} banana - name.
 // @returns {Number} Sum of a and b
 // 文本
 // 文本2
```

最后会转化成

```md
> 这是介绍

版本号: 1.1.1 

作者: zhangzhihao

地址: www.3zsd.com

图片: ![](./images/1.jpeg)

文本2

**参数** 

| 参数 | 类型 | 说明
| ---- | ---- | ---- | 
| apple | string | name. 
| banana | string | name. 

**返回值** 

| 类型 | 说明
| ---- | ---- | 
| Number | Sum of a and b 
```

设置了vue组件下会转化成：

```md
::: tip 介绍
这是介绍
:::
<vtmd-notes 
 version="1.1.1"
 versionCn="版本号"
 author="zhangzhihao"
 authorCn="作者"
 url="www.3zsd.com"
 urlCn="地址"
 image="./images/1.jpeg"
 imageCn="图片"
 txt="文本2"
/> 

**参数** 

| 参数 | 类型 | 说明
| ---- | ---- | ---- | 
| apple | string | name. 
| banana | string | name. 

**返回值** 

| 类型 | 说明
| ---- | ---- | 
| Number | Sum of a and b 
```

[vue文件解析细节](docs/Vue.md)
[umi解析细节](docs/Umi.md)