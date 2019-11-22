import { queryDriverAccount, exportDriverAccount } from '@/services/account';

const initState = () => ({
    listData: [],
    total: 0,
    pageNum: 1,
    pageSize: 10,
    field: null,
    seq: null,
});

export default {
    namespace: 'accountDriver',
    state: initState(),
    effects: {
        *updateStateCall(action, { call, put }) {
            yield put({
                type: 'updateState',
                payload: action.payload
            });
        },
        *queryList({ payload }, { call, put, select }) {// 列表查询
            const accountDriver = yield select(state => state.accountDriver);
            let { pageNum, pageSize, searchFormData, field, seq } = accountDriver;
            let params = {
                pageNum,
                pageSize,
                field,
                seq,
                ...searchFormData,
                ...payload,
            };
            const data = yield call(queryDriverAccount, params);
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
        *exportDriver({ payload }, { call, select }) {
            const accountDriver = yield select(state => state.accountDriver);
            yield call(exportDriverAccount, {
                ...payload,
                pageNum: accountDriver.pageNum,
                pageSize: accountDriver.pageSize,
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