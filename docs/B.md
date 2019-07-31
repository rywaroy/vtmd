# B 

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

 

<vtmd-head2 content="watch"/> 

<vtmd-method-name
  name="color" 
/> 

<vtmd-notes 
 txt=" 监听颜色变化"
/> 

 

