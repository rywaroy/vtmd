import { gasstationMonitorList, gasstationMonitorStat, gasstationMonitorIncreaseAmount } from '@/services/account';
import { queryGasStationChoiceList } from '@/services/finance';

const initState = () => ({
    listData: [],
    total: 0,
    pageNum: 1,
    pageSize: 10,
    stationId: null, // 添加油费的油站id
    gasStationList: [],
    warnCnt: 0, // 警戒数量
    searchFormData: {},
    settleVisible: false,
    settleModalKey: Math.random(),
});

export default {
    namespace: 'gasStationAccount',
    state: initState(),
    effects: {
        *updateStateCall(action, { call, put }) {
            yield put({
                type: 'updateState',
                payload: action.payload
            });
        },
        *queryList({ payload }, { call, put, select }) { // 列表查询
            const gasStationAccount = yield select(state => state.gasStationAccount);
            const { pageNum, pageSize, searchFormData } = gasStationAccount;
            const params = {
                pageNum,
                pageSize,
                ...searchFormData,
                ...payload,
            };
            const data = yield call(gasstationMonitorList, params);
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

        /* 查询加油站名称列表*/
        * queryGasStationList({ payload }, { call, put }) {
            const data = yield call(queryGasStationChoiceList, payload);
            if (data && data.code === 0) {
                yield put({
                    type: 'updateState',
                    payload: {
                        gasStationList: data.data || [],
                    },
                });
            }
        },

        *gasstationMonitorStat({ payload }, { call, put, select }) {
            const data = yield call(gasstationMonitorStat, payload);
            if (data && data.code === 0) {
                yield put({
                    type: 'updateState',
                    payload: {
                        warnCnt: data.data.warnCnt,
                    },
                });
            }
        },

        /**
         * 添加油费
         */
        *add({ payload }, { call, put }) {
            const data = yield call(gasstationMonitorIncreaseAmount, payload);
            if (data && data.code === 0) {
                return true;
            }
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