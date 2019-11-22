# account-enterprise 

<vtmd-file-box filename="index.js"><vtmd-head2 content="methods"/> 

<vtmd-block> 
<vtmd-method-name
  name="searchHandel" 
  params="searchFormData"
/> 

<vtmd-notes 
 txt="筛选"
/> 

**参数** 

| 参数 | 类型 | 说明
| ---- | ---- | ---- | 
| searchFormData | Object | 筛选参数对象 

 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="getFormatFormData" 
  params="searchFormData"
  returns="Object " 
/> 

<vtmd-notes 
 txt="处理筛选数据"
/> 

**参数** 

| 参数 | 类型 | 说明
| ---- | ---- | ---- | 
| searchFormData | Object | 筛选参数对象 

**返回值** 

| 类型 | 说明
| ---- | ---- | 
| Object | searchFormData - 筛选参数对象 

 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="queryList" 
  params="params"
/> 

<vtmd-notes 
 txt="查询列表"
/> 

**参数** 

| 参数 | 类型 | 说明
| ---- | ---- | ---- | 
| params | Object | 查询参数对象 

 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="exportAccount" 
/> 

<vtmd-notes 
 txt="导出"
/> 

 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="onChange" 
/> 

<vtmd-notes 
 txt="监听表格变化"
/> 

 

</vtmd-block>

</vtmd-file-box>

<vtmd-file-box filename="model.js"><vtmd-head2 content="accountEnterprise" border="0"/> 

<vtmd-head2 content="state"/> 

<vtmd-block> 
<vtmd-props
  name="listData" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="total" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="pageNum" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="pageSize" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="searchFormData" 
/> 

<vtmd-notes 
 txt=" 搜索条件"
/> 

 
</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="depositAmount" 
/> 

<vtmd-notes 
 txt=" 充值金额"
/> 

 
</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="oilConsumeCnt" 
/> 

<vtmd-notes 
 txt=" 订单总数"
/> 

 
</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="oilConsumeMl" 
/> 

<vtmd-notes 
 txt=" 加油升数"
/> 

 
</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="oilConsumeMoney" 
/> 

<vtmd-notes 
 txt=" 消费总金额"
/> 

 
</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="totalAmount" 
/> 

<vtmd-notes 
 txt=" 账户余额"
/> 

 
</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="field" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="seq" 
/> 

</vtmd-block>

<vtmd-head2 content="effects"/> 

<vtmd-block> 
<vtmd-method-name
  name="updateStateCall" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="queryList" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="getAccountConsume" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="exportAccount" 
/> 

<vtmd-notes 
 txt=" 导出"
/> 

 

</vtmd-block>

</vtmd-file-box>

<vtmd-file-box filename="map.js"> 
<vtmd-head2 content="map"/> 

<vtmd-block> 
<vtmd-method-name
  name="listFilter" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="listColumn" 
/> 

</vtmd-block>

</vtmd-file-box>

