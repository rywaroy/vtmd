import { queryCompaniesList, getAccountConsume, exportAccountAggregation } from '@/services/account';

const initState = () => ({
    listData: [],
    total: 0,
    pageNum: 1,
    pageSize: 10,
    searchFormData: {}, // 搜索条件
    depositAmount: 0, // 充值金额
    oilConsumeCnt: 0, // 订单总数
    oilConsumeMl: 0, // 加油升数
    oilConsumeMoney: 0, // 消费总金额
    totalAmount: 0, // 账户余额
    field: null,
    seq: null,
});

export default {
    namespace: 'accountEnterprise',
    state: initState(),
    effects: {
        *updateStateCall(action, { call, put }) {
            yield put({
                type: 'updateState',
                payload: action.payload
            });
        },
        *queryList({ payload }, { call, put, select }) { // 列表查询
            const accountEnterprise = yield select(state => state.accountEnterprise);
            let { pageNum, pageSize, searchFormData, field, seq } = accountEnterprise;
            let params = {
                pageNum,
                pageSize,
                field,
                seq,
                ...searchFormData,
                ...payload,
            };
            const data = yield call(queryCompaniesList, params);
            if (data && data.code === 0) {
                yield put({
                    type: 'updateState',
                    payload: {
                        listData: data.data || [],
                        total: data.count
                    }
                });
            }
        },
        *getAccountConsume({ payload }, { call, put }) {
            const data = yield call(getAccountConsume, payload);
            if (data && data.code === 0) {
                const { depositAmount, oilConsumeCnt, oilConsumeMl, oilConsumeMoney, totalAmount } = data.data;
                yield put({
                    type: 'updateState',
                    payload: {
                        depositAmount, // 充值金额
                        oilConsumeCnt, // 订单总数
                        oilConsumeMl, // 加油升数
                        oilConsumeMoney, // 消费总金额
                        totalAmount,
                    }
                });
            }
        },
        // 导出
        *exportAccount({ payload }, { call, select }) {
            const accountEnterprise = yield select(state => state.accountEnterprise);
            yield call(exportAccountAggregation, {
                ...payload,
                pageNum: accountEnterprise.pageNum
            });
        }
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload };
        },
        resetState(state, { payload }) {
            return { ...initState() };
        }
    },
};