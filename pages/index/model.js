import { queryCardsData, queryOilPageOrder, queryTrend, queryHomepageTrend, queryTrendTotal, queryHomepagePayType } from '../../services/home';
import { isReqSuccess } from '../../lib/utils';
import moment from 'moment';

export default {
    namespace: 'home',
    state: {
        cardsData: {}, // 卡片数据
        oilRanking: [], // 排名数据
        trendData: [], // 趋势数据

        rankTab: 'sale', // 当前活动tab（sale:'销售额'；dirver:'企业/车队数量'）
        dateRange: { startDate: moment().startOf('month').format('YYYY-MM-DD'), endDate: moment().endOf('month').format('YYYY-MM-DD') }, // 日期范围
        dayType: 'monthly', // 日期类型 weekly monthly yearly
        totalRecharge: [], // 充值总额
        totalSales: [], // 销售总额
        totalGas: [], // 加油总量
        oilSaleMoney: 0,
        organizationCnt: 0,
        channel: [], // 合作渠道
        payment: [], // 付款方式
        allConsumeMoney: 0, // 总销售额

    },
    effects: {
        *updateStateCall({ payload }, { put }) {
            yield put({
                type: 'updateState',
                payload,
            });
        },
        // 查询卡片数据
        * queryCardsData({ payload }, { call, put }) {
            const data = yield call(queryCardsData, payload);
            if (isReqSuccess(data)) {
                yield put({
                    type: 'updateState',
                    payload: {
                        cardsData: data.data || {},
                    },
                });
            }
        },
        * queryOilPageOrder({ payload }, { call, put }) {
            let data = yield call(queryOilPageOrder, payload);
            if (isReqSuccess(data)) {
                yield put({
                    type: 'updateState',
                    payload: {
                        oilRanking: data.data || [],
                    },
                });
            }
        },
        * queryTrend({ payload }, { call, put }) {
            const data = yield call(queryTrend, payload);
            const tatal = yield call(queryTrendTotal, payload);
            if (isReqSuccess(data) && isReqSuccess(tatal)) {
                if (data.data.length === 0) {
                    data.data.push({
                        statDate: payload.startDate
                    });
                }
                yield put({
                    type: 'updateState',
                    payload: {
                        trendData: data.data || [],
                        oilSaleMoney: tatal.data[0].oilSaleMoney || 0,
                        organizationCnt: tatal.data[0].organizationCnt || 0,
                    },
                });
            }
        },
        * queryHomepageTrend({ payload }, { call, put }) {
            const data = yield call(queryHomepageTrend, payload);
            if (isReqSuccess(data)) {
                const totalRecharge = [];
                const totalSales = [];
                const totalGas = [];
                for (const item of data.data) {
                    totalRecharge.push({
                        statDate: item.statDate,
                        number: Number(item.rechargeMoney),
                    });
                    totalSales.push({
                        statDate: item.statDate,
                        number: Number(item.oilSaleMoney),
                    });
                    totalGas.push({
                        statDate: item.statDate,
                        number: Number(item.oilSaleMl),
                    });
                }
                yield put({
                    type: 'updateState',
                    payload: {
                        totalRecharge,
                        totalSales,
                        totalGas,
                    },
                });
            }
        },
        *queryHomepagePayType({ payload }, { call, put }) {
            const data = yield call(queryHomepagePayType, payload);
            if (isReqSuccess(data)) {
                const channel = [];
                const payment = [];
                for (const item of data.data) {
                    if (item.dataType === '合作渠道') {
                        channel.push(item);
                    }
                    if (item.dataType === '付款方式') {
                        payment.push(item);
                    }
                }
                yield put({
                    type: 'updateState',
                    payload: {
                        channel,
                        payment,
                    },
                });
            }
        }
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload };
        },
    },
};
