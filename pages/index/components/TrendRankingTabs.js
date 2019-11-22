import React from 'react';
import { Chart, Geom, Axis, Tooltip, } from 'bizcharts';
import { Tabs, Radio, DatePicker } from 'antd';
import styles from '../index.less';
import moment from 'moment';
import { CurrencyFormatter } from '../../../components';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
const TabPane = Tabs.TabPane;

export default class TrendRankingTabs extends React.Component {

    // 请求数据
    _queryData = () => {
        const { dateRange } = this.props.home;
        const { userName = '' } = this.props.global.userInfo;
        this.props.dispatch({ type: 'home/queryTrend', payload: dateRange }); // 获取趋势数据
        this.props.dispatch({ type: 'home/queryOilPageOrder', payload: dateRange }); // 获取排名数据
        this.props.dispatch({ type: 'home/queryHomepagePayType', payload: dateRange });

        // 埋点
        window.BossService && window.BossService.trace('首页-报表-查询人员', JSON.stringify({ userName }));
    };

    // tab选择变化
    onTabChange = (key) => {
        this.props.dispatch({ type: 'home/updateState', payload: { rankTab: key } });
    };

    // 时间段选择变化
    radioChange = (e) => {
        const params = this.props.getDateRange(e.target.value);
        this.props.dispatch({
            type: 'home/updateStateCall',
            payload: {
                dayType: e.target.value,
                dateRange: params,
            }
        }).then(() => {
            this._queryData();
        });
    };

    // 日期选择变化
    dateChange = (date, dateString) => {
        this.props.dispatch({
            type: 'home/updateStateCall',
            payload: {
                dayType: '',
                dateRange: { startDate: dateString[0], endDate: dateString[1] },
            }
        }).then(() => {
            this._queryData();
        });
    };

    // 绘制图表
    drawChartsDom = (data1, position, x, y, tip, cols = {}) => {
        const scale = {
            statDate: {
                type: 'time',
                range: [0.01, 0.99],
            },
            oilSaleMoney: {
                type: 'log',
            },
            organizationCnt: {
                type: 'log',
            },
        };
        return (
            <Chart height={260} data={data1} scale={scale} forceFit padding={[20, 30, 40, 'auto']}>
                <Axis name={x}/>
                <Axis name={y}/>
                <Tooltip itemTpl={`<li><span style="background-color:{color}" class="g2-tooltip-marker"></span>${tip}&nbsp;&nbsp;{value}</li>`}/>
                <Geom type="line" position={position} size={2}/>
                <Geom
                    type="point"
                    position={position}
                    size={4}
                    shape={'circle'}
                    style={{
                        stroke: '#fff',
                        lineWidth: 1
                    }}
                />
            </Chart>
        );
    };

    /**
     * 跳转到订单详情
     */
    linkOrder = () => {
        const { dateRange } = this.props.home;
        this.props.history.push({
            pathname: '/order/list',
            query: {
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                status: '已支付',
            }
        });
    }

    /**
     * 跳转到企业客户
     */
    linkCustomer = () => {
        const { dateRange } = this.props.home;
        this.props.history.push({
            pathname: '/customer/company/list',
            query: {
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
            }
        });
    }

    render() {
        const { trendData, oilRanking, rankTab, dayType, dateRange, oilSaleMoney, organizationCnt } = this.props.home;
        // 图表
        const chartsDom = this.drawChartsDom(trendData, 'statDate*oilSaleMoney', 'statDate', 'oilSaleMoney', '销售额');
        const chartsDom2 = this.drawChartsDom(trendData, 'statDate*organizationCnt', 'statDate', 'organizationCnt', '企业数量');
        return (
            <div className={`bor-r-gray ${styles.tabWrapper}`}>
                <div className="formWrapper">
                    <RadioGroup value={dayType} onChange={this.radioChange}>
                        <RadioButton value="weekly">本周</RadioButton>
                        <RadioButton value="monthly">本月</RadioButton>
                        <RadioButton value="yearly">全年</RadioButton>
                    </RadioGroup>
                    <RangePicker value={[dateRange.startDate ? moment(dateRange.startDate) : null, dateRange.endDate ? moment(dateRange.endDate) : null]} onChange={this.dateChange} style={{ marginLeft: '12px' }}/>
                </div>
                <Tabs activeKey={rankTab} onChange={this.onTabChange}>
                    <TabPane tab="销售额" key="sale">
                        <div className="flex tabChilrenWrapper">
                            <div className="chartsWrapper">
                                <h3>销售额趋势 <span className="chartsWrapperSubtitle" onClick={this.linkOrder}>（销售额：<CurrencyFormatter>{oilSaleMoney}</CurrencyFormatter>）</span></h3>
                                <span className="unit">元</span>
                                {chartsDom}
                            </div>
                            <div className="rankingWrapper">
                                <h3>销售额趋势</h3>
                                {
                                    oilRanking.map((item, index) =>
                                        <div key={`rank${index}`} className="rankingLine">
                                            <span className={index > 2 ? 'grayIcon' : 'blurIcon'}>{index + 1}</span>
                                            <a href="javascript:;" className="rankingTitle ellipsis" title={item.companyName}>{item.companyName}</a>
                                            <CurrencyFormatter className="number">{item.oilSaleMoney}</CurrencyFormatter>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="企业数量" key="driver">
                        <div className="flex tabChilrenWrapper">
                            <div className="chartsWrapper">
                                <h3>企业数量<span className="chartsWrapperSubtitle" onClick={this.linkCustomer}>（数量：{organizationCnt}）</span></h3>
                                <span className="unit">个</span>
                                {chartsDom2}
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}

