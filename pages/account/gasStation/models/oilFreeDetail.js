import { gasstationMonitorDetail } from '@/services/account';

const initState = () => ({
    listData: [],
    total: 0,
    pageNum: 1,
    pageSize: 10,
    searchFormData: {}
});

export default {
    namespace: 'oilFreeDetail',
    state: initState(),
    effects: {
        *updateStateCall(action, { call, put }) {
            yield put({
                type: 'updateState',
                payload: action.payload
            });
        },
        *queryList({ payload }, { call, put, select }) { // 列表查询
            const oilFreeDetail = yield select(state => state.oilFreeDetail);
            const { pageNum, pageSize, searchFormData } = oilFreeDetail;
            const params = {
                pageNum,
                pageSize,
                ...searchFormData,
                ...payload,
            };
            const data = yield call(gasstationMonitorDetail, params);
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