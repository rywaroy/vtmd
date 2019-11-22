import React from 'react';
import { Chart, Geom, Tooltip as Tool } from 'bizcharts';
import { TfIcon, CurrencyFormatter } from '../../../components';
import styles from '../index.less';
import { cols1, cols2, cols3 } from '../map';
import { Tooltip } from 'antd';


export default class CardsData extends React.Component {

    getIcon=(val) => {
    	let iconName = '';
    	val = val ? Number(val) : 0;
    	if (val > 1){
    		iconName = 'increase';
    	} else if (val === 1){
    		iconName = 'chiping';
    	} else {
    		iconName = 'decline';
    	}
    	return iconName;
    }

    render() {
        const { cardsData, totalRecharge, totalGas, totalSales } = this.props.home;

    	return (
    		<div className={styles.cardWrapper}>
    			<div className="bor-r-gray card">
    				<h3>充值总额<Tooltip title="充值总额：指划拨给企业的总金额。"><TfIcon type="info"/></Tooltip></h3>
                    <CurrencyFormatter className="number">{cardsData.rechargeMoney || 0}</CurrencyFormatter>
    				<div className="charts iconWrapper">
                        <Chart padding={['auto', 0, 'auto', 0]} height={40} data={totalRecharge} scale={cols1} forceFit>
                            <Tool
                                crosshairs={{
                                    type: 'y'
                                }}
                            />
                            <Geom type="interval" position="statDate*number" />
                        </Chart>
    				</div>
    				<div className="tip">
    					<span className="mr10">昨日充值</span><CurrencyFormatter className="number">{cardsData.avgOilSaleMoney || 0}</CurrencyFormatter>
    				</div>
    			</div>
                <div className="bor-r-gray card">
                    <h3>销售总额<Tooltip title="销售总额：指司机加油实付金额的累计金额。"><TfIcon type="info"/></Tooltip></h3>
                    <CurrencyFormatter className="number">{cardsData.invoiceOilConsumeMoneyGrand || 0}</CurrencyFormatter>
                    <div className="charts">
                        <Chart padding={['auto', 0, 'auto', 0]} height={40} data={totalSales} scale={cols3} forceFit>
                            <Tool
                                crosshairs={{
                                    type: 'y'
                                }}
                            />
                            <Geom type="interval" position="statDate*number" />
                        </Chart>
                    </div>
    				<div className="tip">
    					 <span className="mr10">昨日销售额</span><span className="number">{cardsData.invoiceOilConsumeMoney || 0}</span>
    				</div>
                </div>
    			<div className="bor-r-gray card">
    				<h3>加油总量<Tooltip title="加油总量：指所有司机的总加油量。"><TfIcon type="info"/></Tooltip></h3>
    				<CurrencyFormatter className="number">{cardsData.oilSaleMl || 0}</CurrencyFormatter>
    				<div className="charts">
                        <Chart padding={['auto', 0, 'auto', 0]} height={40} data={totalGas} scale={cols2} forceFit>
                            <Tool
                                crosshairs={{
                                    type: 'y'
                                }}
                            />
                            <Geom type="interval" position="statDate*number" />
                        </Chart>
    				</div>
    				<div className="tip iconWrapper">
    					{/* <span>月同比{(cardsData.mlMonthRingRatio || 0) * 100}％<TfIcon type={this.getIcon(cardsData.mlMonthRingRatio)}/></span>
    					<span className="ml20">日同比{(cardsData.mlDailyRingRatio * 100 || 0)}％<TfIcon type={this.getIcon(cardsData.mlDailyRingRatio)}/></span> */}
    				</div>
    			</div>
                <div className="bor-r-gray card">
                    <div className="cardBox">
                        <h3>企业数量<Tooltip title="企业数量：指入驻油链平台的企业数量。"><TfIcon type="info"/></Tooltip></h3>
                        <div className="cardBoxNumber iconWrapper">
                            <p className="number">{cardsData.organizationCnt || 0}</p>
                            <span>本月新增 {cardsData.organizationIncreCnt || 0} { cardsData.organizationIncreCnt && <TfIcon type="increase"></TfIcon>} </span>
                        </div>
                        <div className="line"></div>
                    </div>
                    <div className="cardBox">
                        <h3>司机数量<Tooltip title="司机数量：指入驻油链平台的司机数量。"><TfIcon type="info"/></Tooltip></h3>
                        <div className="cardBoxNumber iconWrapper">
                            <p className="number">{cardsData.driverCnt || 0}</p>
                            <span>本月新增 {cardsData.driveIncreCnt || 0} { cardsData.driveIncreCnt && <TfIcon type="increase"></TfIcon> } </span>
                        </div>
                    </div>
                </div>
    		</div>
    	);
    }
}

