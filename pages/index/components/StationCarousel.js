import React from 'react';
import { Chart, Geom, Tooltip, Coord, Legend, Guide } from 'bizcharts';
import { Carousel } from 'antd';
import styles from '../index.less';
import { TfIcon } from '../../../components';
import { moneyFormater } from '../../../lib/utils';
// import DataSet from '@antv/data-set';
// const { DataView } = DataSet;
const { Html } = Guide;

export default class StationCarousel extends React.Component {

    prev = () => {
    	this.Carousel.prev();
    }

    next = () => {
    	this.Carousel.next();
    }

    // 分成3个一组，以便轮播翻页
    _grouping = (stationList) => {
    	var result = [];
    	for (var i = 0; i < stationList.length; i += 3) {
    		result.push(stationList.slice(i, i + 3));
    	}
    	return result;
    }

    // 画图表
    drawCharts = (data) => {
    	const htmlTip = `<div class='tc'><p>销售额</p><p>${moneyFormater(data.oilSaleMoney)}</p></div>`;
    	const list = data && data.sellDTOS ? data.sellDTOS : [];
    	return (
    		<Chart height={window.innerHeight / 3} data={list} padding={[0, 130, 0, 'auto']} forceFit>
    			<Coord type={'theta'} radius={0.75} innerRadius={0.6} />
    			<Legend
    				position="right"
    				offsetY={-window.innerHeight / 5 + 120}
    				offsetX={0}
    			/>
    			<Tooltip showTitle={false} />
    			<Guide>
    				<Html
    					position={['50%', '50%']}
    					html={htmlTip}
    					alignX="middle"
    					alignY="middle"
    				/>
    			</Guide>
    			<Geom
    				type="intervalStack"
    				position="oilRate"
    				color="gasOilName"
    				tooltip={[
    					'gasOilName*oilRate*oilMoney',
    					(gasOilName, oilRate, oilMoney) => {
    						oilRate = `${oilRate * 100 }%`;
    						return {
    							name: gasOilName,
    							value: `${oilRate } ${ moneyFormater(oilMoney)}`,
    						};
    					}
    				]}
    				style={{
    					lineWidth: 1,
    					stroke: '#fff'
    				}}
    			>
    			</Geom>
    		</Chart>
    	);
    }

    render() {
    	const { oilRanking, rankTab } = this.props.home;
    	const isShow = rankTab === 'sale' && oilRanking.length > 0; // 轮播区块是否展示
    	return (
    		<div className={`bor-r-gray ${styles.carouselWrapper} ${isShow ? '' : 'hide'}`}>
    			<TfIcon type="arrow_left" style={{ top: window.innerHeight / 6 }} className={`prevArrow ${oilRanking.length > 3 ? '' : 'hide'}`} onClick={this.prev} />
    			<TfIcon type="arrow_right" style={{ top: window.innerHeight / 6 }} className={`nextArrow ${oilRanking.length > 3 ? '' : 'hide'}`} onClick={this.next} />
    			<div className="contentWrapper">
    				{/* 当有值时在渲染组件，否则图形画布样式错乱 */}
    				{
    					isShow
    						?
    						<Carousel ref={(el) => { this.Carousel = el; }} dots={false} forceFit>
    							{
    								this._grouping(oilRanking).map((item, index) => {
    									return (
    										<div key={`chartP${ index}`}>
    											<div className="flex">
    												{
    													item.map((ele, i) => {
    														return (
    															<div key={`chart${ index }${i}`}>
    																<h3>{ele.companyName}</h3>
    																{this.drawCharts(ele)}
    															</div>
    														);
    													})
    												}
    											</div>
    										</div>
    									);
    								})
    							}
    						</Carousel>
    						:
    						''
    				}
    			</div>
    		</div>
    	);
    }
}

