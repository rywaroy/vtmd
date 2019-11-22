import { getEnterpriseBalance, queryAccoutDetailList } from '@/services/account';

const initState = () => ({
    companyPartyId: '',
    accountList: [],
    searchForm: {}, // 搜索条件
    total: 0, // 列表总数
    pageNum: 1, // 页码
    pageSize: 10, // 每页条数
    consumableBalance: 0, // 可消费余额
});

export default {
    namespace: 'enterpriseDetail',
    state: initState(),
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname, query }) => {
                const { departmentId } = query;
                if (pathname === '/account/enterprise/detail') {
                    if (departmentId) {
                        dispatch({ type: 'updateStateCall', payload: { companyPartyId: departmentId } }).then(() => {
                            dispatch({ type: 'queryList' });
                            dispatch({ type: 'queryStastics' });
                        });
                    }
                }
            });
        }
    },
    effects: {
        * updateStateCall({ payload }, { call, put, select }) {
            yield put({
                type: 'updateState',
                payload
            });
        },

        /* 查询可消费余额*/
        * queryStastics({ payload }, { call, put, select }) {
            const enterpriseDetail = yield select(state => state.enterpriseDetail);
            let { companyPartyId } = enterpriseDetail;
            const data = yield call(getEnterpriseBalance, { companyPartyId });
            if (data && data.code === 0) {
                const consumableBalance = (data.data || {}).consumableBalance || 0;
                yield put({
                    type: 'updateState',
                    payload: {
                        consumableBalance
                    }
                });
            }
        },

        /* 查询列表*/
        * queryList({ payload }, { call, put, select }) {// 列表查询
            const enterpriseDetail = yield select(state => state.enterpriseDetail);
            let { companyPartyId, pageNum, pageSize, searchForm } = enterpriseDetail;
            let params = {
                companyPartyId,
                pageNum,
                pageSize,
                ...searchForm,
                ...payload,
            };
            const data = yield call(queryAccoutDetailList, params);
            if (data && data.code === 0) {
                yield put({
                    type: 'updateState',
                    payload: {
                        accountList: data.data || [],
                        total: data.count
                    }
                });
            }
        },
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload };
        },
        resetState(state, { payload }) {
            return { ...initState() };
        }
    }
};
