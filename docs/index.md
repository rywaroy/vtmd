# index 

<vtmd-file-box filename="index.js"><vtmd-head2 content="methods"/> 

<vtmd-block> 
<vtmd-method-name
  name="_getDateRange" 
/> 

</vtmd-block>

</vtmd-file-box>

<vtmd-file-box filename="model.js"><vtmd-head2 content="home" border="0"/> 

<vtmd-head2 content="state"/> 

<vtmd-block> 
<vtmd-props
  name="cardsData" 
/> 

<vtmd-notes 
 txt=" 卡片数据"
/> 

 
</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="oilRanking" 
/> 

<vtmd-notes 
 txt=" 排名数据"
/> 

 
</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="trendData" 
/> 

<vtmd-notes 
 txt=" 趋势数据"
/> 

 
</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="rankTab" 
/> 

<vtmd-notes 
 txt=" 当前活动tab（sale:'销售额'；dirver:'企业/车队数量'）"
/> 

 
</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="dateRange" 
/> 

<vtmd-notes 
 txt=" 日期范围"
/> 

 
</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="dayType" 
/> 

<vtmd-notes 
 txt=" 日期类型 weekly monthly yearly"
/> 

 
</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="totalRecharge" 
/> 

<vtmd-notes 
 txt=" 充值总额"
/> 

 
</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="totalSales" 
/> 

<vtmd-notes 
 txt=" 销售总额"
/> 

 
</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="totalGas" 
/> 

<vtmd-notes 
 txt=" 加油总量"
/> 

 
</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="oilSaleMoney" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="organizationCnt" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="channel" 
/> 

<vtmd-notes 
 txt=" 合作渠道"
/> 

 
</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="payment" 
/> 

<vtmd-notes 
 txt=" 付款方式"
/> 

 
</vtmd-block>

<vtmd-block> 
<vtmd-props
  name="allConsumeMoney" 
/> 

<vtmd-notes 
 txt=" 总销售额"
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
  name="queryCardsData" 
/> 

<vtmd-notes 
 txt=" 查询卡片数据"
/> 

 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="queryOilPageOrder" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="queryTrend" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="queryHomepageTrend" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="queryHomepagePayType" 
/> 

</vtmd-block>

</vtmd-file-box>

<vtmd-file-box filename="map.js"> 
<vtmd-head2 content="map"/> 

<vtmd-block> 
<vtmd-method-name
  name="cols1" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="cols2" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="cols3" 
/> 

</vtmd-block>

</vtmd-file-box>

<vtmd-file-box filename="components/CardsData.js"><vtmd-head2 content="methods"/> 

<vtmd-block> 
<vtmd-method-name
  name="getIcon" 
/> 

</vtmd-block>

</vtmd-file-box>

<vtmd-file-box filename="components/StationCarousel.js"><vtmd-head2 content="methods"/> 

<vtmd-block> 
<vtmd-method-name
  name="prev" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="next" 
/> 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="_grouping" 
/> 

<vtmd-notes 
 txt=" 分成3个一组，以便轮播翻页"
/> 

 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="drawCharts" 
/> 

<vtmd-notes 
 txt=" 画图表"
/> 

 

</vtmd-block>

</vtmd-file-box>

<vtmd-file-box filename="components/StationStatistics.js"></vtmd-file-box>

<vtmd-file-box filename="components/TrendRankingTabs.js"><vtmd-head2 content="methods"/> 

<vtmd-block> 
<vtmd-method-name
  name="_queryData" 
/> 

<vtmd-notes 
 txt=" 请求数据"
/> 

 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="onTabChange" 
/> 

<vtmd-notes 
 txt=" tab选择变化"
/> 

 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="radioChange" 
/> 

<vtmd-notes 
 txt=" 时间段选择变化"
/> 

 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="dateChange" 
/> 

<vtmd-notes 
 txt=" 日期选择变化"
/> 

 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="drawChartsDom" 
/> 

<vtmd-notes 
 txt=" 绘制图表"
/> 

 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="linkOrder" 
/> 

<vtmd-notes 
 txt="跳转到订单详情"
/> 

 

</vtmd-block>

<vtmd-block> 
<vtmd-method-name
  name="linkCustomer" 
/> 

<vtmd-notes 
 txt="跳转到企业客户"
/> 

 

</vtmd-block>

</vtmd-file-box>

