# account-enterprise-detail 

<vtmd-file-box filename="index.js"><vtmd-head2 content="methods"/> 

<vtmd-block> 
<vtmd-method-name
  name="searchHandel" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="queryList" 
/> 

<vtmd-notes 
 txt=" 查询列表"
/> 

 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="onPageChange" 
/> 

<vtmd-notes 
 txt=" 页码切换"
/> 

 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="onShowSizeChange" 
/> 

<vtmd-notes 
 txt=" 页码变化"
/> 

 

</vtmd-block>

</vtmd-file-box>

<vtmd-file-box filename="model.js"><vtmd-head2 content="enterpriseDetail" border="0"/> 

<vtmd-head2 content="state"/> 

<vtmd-block> 
<vtmd-props
  name="companyPartyId" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="accountList" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="searchForm" 
/> 

<vtmd-notes 
 txt=" 搜索条件"
/> 

 
</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="total" 
/> 

<vtmd-notes 
 txt=" 列表总数"
/> 

 
</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="pageNum" 
/> 

<vtmd-notes 
 txt=" 页码"
/> 

 
</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="pageSize" 
/> 

<vtmd-notes 
 txt=" 每页条数"
/> 

 
</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="consumableBalance" 
/> 

<vtmd-notes 
 txt=" 可消费余额"
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
  name="queryStastics" 
/> 

<vtmd-notes 
 txt=" 查询可消费余额"
/> 

 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="queryList" 
/> 

<vtmd-notes 
 txt=" 查询列表"
/> 

 

</vtmd-block>

</vtmd-file-box>

<vtmd-file-box filename="map.js"> 
<vtmd-head2 content="map"/> 

<vtmd-block> 
<vtmd-method-name
  name="listFilters" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="listColumn" 
/> 

</vtmd-block>

</vtmd-file-box>

