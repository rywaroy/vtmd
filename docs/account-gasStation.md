# account-gasStation 

<vtmd-file-box filename="index.js"></vtmd-file-box>

<vtmd-file-box filename="models/gasStationAccount.js"><vtmd-head2 content="gasStationAccount" border="0"/> 

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
  name="stationId" 
/> 

<vtmd-notes 
 txt=" 添加油费的油站id"
/> 

 
</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="gasStationList" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="warnCnt" 
/> 

<vtmd-notes 
 txt=" 警戒数量"
/> 

 
</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="searchFormData" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="settleVisible" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="settleModalKey" 
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
  name="queryGasStationList" 
/> 

<vtmd-notes 
 txt=" 查询加油站名称列表"
/> 

 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="gasstationMonitorStat" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="add" 
/> 

<vtmd-notes 
 txt="添加油费"
/> 

 

</vtmd-block>

</vtmd-file-box>

<vtmd-file-box filename="models/oilFreeDetail.js"><vtmd-head2 content="oilFreeDetail" border="0"/> 

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

</vtmd-file-box>

<vtmd-file-box filename="map.js"> 
<vtmd-head2 content="map"/> 

<vtmd-block> 
<vtmd-method-name
  name="listFilterGas" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="listColumnGas" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="modalFormGas" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="listFilterOil" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="listColumnOil" 
/> 

</vtmd-block>

</vtmd-file-box>

<vtmd-file-box filename="components/GasStationAccount.js"><vtmd-head2 content="methods"/> 

<vtmd-block> 
<vtmd-method-name
  name="searchHandel" 
/> 

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
  name="onPageChange" 
  params="page"
/> 

<vtmd-notes 
 txt="页码切换"
/> 

**参数** 

| 参数 | 类型 | 说明
| ---- | ---- | ---- | 
| page | Number | 页码 

 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="onShowSizeChange" 
  params="current, size"
/> 

<vtmd-notes 
 txt="页码变化"
/> 

**参数** 

| 参数 | 类型 | 说明
| ---- | ---- | ---- | 
| current | Number | 当前页数 
| size | Number | 分页尺寸 

 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="openModal" 
  params="id"
/> 

<vtmd-notes 
 txt="打开结算弹窗"
/> 

**参数** 

| 参数 | 类型 | 说明
| ---- | ---- | ---- | 
| id | Number | id 

 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="closeModal" 
/> 

<vtmd-notes 
 txt="关闭弹窗"
/> 

 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="settle" 
/> 

<vtmd-notes 
 txt="结算"
/> 

 

</vtmd-block>

</vtmd-file-box>

<vtmd-file-box filename="components/OilFreeDetail.js"><vtmd-head2 content="methods"/> 

<vtmd-block> 
<vtmd-method-name
  name="searchHandel" 
/> 

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
  name="onPageChange" 
  params="page"
/> 

<vtmd-notes 
 txt="页码切换"
/> 

**参数** 

| 参数 | 类型 | 说明
| ---- | ---- | ---- | 
| page | Number | 页码 

 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="onShowSizeChange" 
  params="current, size"
/> 

<vtmd-notes 
 txt="页码变化"
/> 

**参数** 

| 参数 | 类型 | 说明
| ---- | ---- | ---- | 
| current | Number | 当前页数 
| size | Number | 分页尺寸 

 

</vtmd-block>

</vtmd-file-box>

