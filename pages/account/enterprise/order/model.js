import { queryCompaniesDetailList, getOrderConsume, exportComsumeDetail } from '@/services/account';

const initState = () => ({
    listData: [],
    total: 0,
    pageNum: 1,
    pageSize: 10,
    searchFormData: {}, // 搜索条件
    depositAmount: 0, // 充值金额
    oilConsumeCnt: 0, // 消费订单数
    oilConsumeMl: 0, // 加油升数
    oilConsumeMoney: 0, // 消费总金额
    totalAmount: 0, // 账户余额
    departmentId: null, // 承运商id
    depositEntityName: '', // 公司名称
});

export default {
    namespace: 'accountEnterpriseDetail',
    state: initState(),
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                if (pathname === '/account/enterprise/order') {
                    dispatch({
                        type: 'updateStateCall',
                        payload: {
                            departmentId: query.departmentId,
                            depositEntityName: query.depositEntityName,
                        }
                    }).then(() => {
                        dispatch({
                            type: 'getAccountConsume'
                        });
                        dispatch({
                            type: 'queryList'
                        });
                    });
                }
            });
        },
    },
    effects: {
        *updateStateCall(action, { call, put }) {
            yield put({
                type: 'updateState',
                payload: action.payload
            });
        },
        *getAccountConsume({ payload }, { call, put, select }) {
            const accountEnterpriseDetail = yield select(state => state.accountEnterpriseDetail);
            const data = yield call(getOrderConsume, { departmentId: accountEnterpriseDetail.departmentId });
            if (data && data.code === 0) {
                const { depositAmount, oilConsumeCnt, oilConsumeMl, oilConsumeMoney, totalAmount } = data.data;
                yield put({
                    type: 'updateState',
                    payload: {
                        depositAmount, // 充值金额
                        oilConsumeCnt, // 消费订单数
                        oilConsumeMl, // 加油升数
                        oilConsumeMoney, // 消费总金额
                        totalAmount,
                    }
                });
            }
        },
        *queryList({ payload }, { call, put, select }) { // 列表查询
            const accountEnterpriseDetail = yield select(state => state.accountEnterpriseDetail);
            let { pageNum, pageSize, searchFormData, departmentId } = accountEnterpriseDetail;
            let params = {
                pageNum,
                pageSize,
                departmentId,
                ...searchFormData,
                ...payload,
            };
            const data = yield call(queryCompaniesDetailList, params);
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
        // 导出
        *exportAccountDetail({ payload }, { call, select }) {
            const accountEnterpriseDetail = yield select(state => state.accountEnterpriseDetail);
            const { departmentId, pageNum } = accountEnterpriseDetail;
            yield call(exportComsumeDetail, {
                payload,
                departmentId,
                pageNum,
            });
        },
    },
    reducers: {
        updateState(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
        resetState(state, { payload }) {
            return { ...initState() };
        }
    },
};
