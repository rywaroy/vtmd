import React from 'react';
import { Chart, Geom, Tooltip, Coord, Legend, Guide } from 'bizcharts';
import styles from '../index.less';
import { moneyFormater } from '@/lib/utils';

const { Html } = Guide;

export default class StationStatistics extends React.Component {
    render() {
        const { channel = [], payment = [], rankTab } = this.props.home;
        const payAllConsumeMoney = (payment[0] && payment[0].allConsumeMoney) || 0;
        const channelAllConsumeMoney = (channel[0] && channel[0].allConsumeMoney) || 0;
        const channelHtmlTip = `<div class='tc'><p>销售额</p><p>${moneyFormater(payAllConsumeMoney)}</p></div>`;
        const payHtmlTip = `<div class='tc'><p>销售额</p><p>${moneyFormater(channelAllConsumeMoney)}</p></div>`;
        return (
            <div className={`bor-r-gray clearfix ${styles.carouselWrapper} ${rankTab === 'sale' ? '' : 'hide'}`}>
                <div className={styles.carouselItem}>
                    <h3 className={styles.carouselTitle}>合作渠道</h3>
                    <Chart height={window.innerHeight / 3} data={channel} padding={[0, 130, 0, 'auto']} forceFit>
                        <Coord type={'theta'} radius={0.75} innerRadius={0.6}/>
                        <Legend
                            position="right"
                            offsetY={-window.innerHeight / 5 + 120}
                            offsetX={0}
                        />
                        <Tooltip showTitle={false}/>
                        <Guide>
                            <Html
                                position={['50%', '50%']}
                                html={channelHtmlTip}
                                alignX="middle"
                                alignY="middle"
                            />
                        </Guide>
                        <Geom
                            type="intervalStack"
                            position="consumeRate"
                            // color={['consumeType', ['#ff0000', '#00ff00']]}
                            color="consumeType"
                            tooltip={[
                                'consumeType*consumeRate*consumeMoney',
                                (consumeType, consumeRate, consumeMoney) => {
                                    consumeRate = `${consumeRate * 100 }%`;
                                    return {
                                        name: consumeType,
                                        value: `${consumeRate}　　${moneyFormater(consumeMoney)}`,
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
                </div>
                <div className={styles.carouselItem}>
                    <h3 className={styles.carouselTitle}>付款方式</h3>
                    <Chart height={window.innerHeight / 3} data={payment} padding={[0, 130, 0, 'auto']} forceFit>
                        <Coord type={'theta'} radius={0.75} innerRadius={0.6}/>
                        <Legend
                            position="right"
                            offsetY={-window.innerHeight / 5 + 120}
                            offsetX={0}
                        />
                        <Tooltip showTitle={false}/>
                        <Guide>
                            <Html
                                position={['50%', '50%']}
                                html={payHtmlTip}
                                alignX="middle"
                                alignY="middle"
                            />
                        </Guide>
                        <Geom
                            type="intervalStack"
                            position="consumeRate"
                            color="consumeType"
                            tooltip={[
                                'consumeType*consumeRate*consumeMoney',
                                (consumeType, consumeRate, consumeMoney) => {
                                    consumeRate = `${consumeRate * 100 }%`;
                                    return {
                                        name: consumeType,
                                        value: `${consumeRate}　　${moneyFormater(consumeMoney)}`,
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
                </div>
            </div>
        );
    }
}
