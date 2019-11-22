import React from 'react';
import { connect } from 'dva';
import { Button, Table } from 'antd';
import { listFilter, listColumn } from './map';
import { ListFilter, SubHeader, CurrencyFormatter } from '@/components';
import { Global_Pagination } from '@/lib/enum';

class Enterprise extends React.Component {

    /**
     * 筛选
     * @param {Object} searchFormData - 筛选参数对象
     */
    searchHandel = (searchFormData) => {
        const formatSearchFormData = this.getFormatFormData(searchFormData);
        this.queryList({ pageNum: 1, searchFormData: formatSearchFormData });
        this.props.dispatch({
            type: 'accountEnterprise/getAccountConsume',
            payload: formatSearchFormData
        });
    };

    /**
     * 处理筛选数据
     * @param {Object} searchFormData - 筛选参数对象
     * @returns {Object} searchFormData - 筛选参数对象
     */
    getFormatFormData(searchFormData) {
        let { time } = searchFormData;

        if (time && time.length > 0) {
            searchFormData.startTime = time[0].format('YYYY-MM-DD');
            searchFormData.endTime = time[1].format('YYYY-MM-DD');
            delete searchFormData.time;
        }
        return searchFormData;
    }

    /**
     * 查询列表
     * @param {Object} params - 查询参数对象
     */
    queryList(params = {}) {
        this.props.dispatch({
            type: 'accountEnterprise/updateStateCall',
            payload: { ...params },
        }).then(() => {
            this.props.dispatch({ type: 'accountEnterprise/queryList' });
        });
    }

    /**
     * 导出
     */
    exportAccount = () => {
        this.listFilter.getForm().validateFields((error, searchFormData) => {
            if (error) {
                return;
            }
            const formatSearchFormData = this.getFormatFormData(searchFormData);
            this.props.dispatch({ type: 'accountEnterprise/exportAccount', payload: formatSearchFormData });
        });
    };

    /**
     * 监听表格变化
     */
    onChange = (pagination, filters, sorter) => {
        const { current, pageSize } = pagination;
        const payload = {
            pageNum: current,
            pageSize,
            field: null,
            seq: null,
        };
        if (sorter.columnKey) {
            const map = {
                depositAmount: 1,
                oilConsumeMoney: 2,
                totalAmount: 3,
                oilConsumeCnt: 4
            };
            payload.field = map[sorter.columnKey];
            payload.seq = sorter.order === 'descend' ? 2 : 1;
        }
        this.queryList(payload);
    };

    componentDidMount() {
        this.props.dispatch({
            type: 'accountEnterprise/queryList',
        });
        this.props.dispatch({
            type: 'accountEnterprise/getAccountConsume',
        });
    }

    componentWillUnmount() {
        this.props.dispatch({ type: 'accountEnterprise/resetState' });
    }

    render() {
        const listFilters = listFilter(this);
        const { accountEnterprise } = this.props;
        const {
            total,
            pageNum,
            pageSize,
            depositAmount, // 充值金额
            oilConsumeCnt, // 订单总数
            oilConsumeMl, // 加油升数
            oilConsumeMoney, // 消费总金额
            totalAmount,
        } = accountEnterprise;
        const pagination = {
            ...Global_Pagination,
            total,
            current: pageNum,
            pageSize,
            // onChange: this.onPageChange,
            // onShowSizeChange: this.onShowSizeChange
        };

        return (
            <div className="bg-w">
                <SubHeader title="企业账户">
                    <Button type="primary" onClick={this.exportAccount}>导出</Button>
                </SubHeader>
                <div className="header-money bb">
                    <div className="header-money-item">
                        <h3 className="header-money-title">充值总金额</h3>
                        <div className="header-money-number">
                            <CurrencyFormatter className="number">{depositAmount}</CurrencyFormatter>
                        </div>
                    </div>
                    <div className="header-money-item">
                        <h3 className="header-money-title">消费总金额</h3>
                        <div className="header-money-number">
                            <CurrencyFormatter className="number">{oilConsumeMoney}</CurrencyFormatter>
                        </div>
                    </div>
                    <div className="header-money-item">
                        <h3 className="header-money-title">订单总数</h3>
                        <div className="header-money-number">{oilConsumeCnt}</div>
                    </div>
                    <div className="header-money-item">
                        <h3 className="header-money-title">加油总量（L）</h3>
                        <div className="header-money-number">{oilConsumeMl}</div>
                    </div>
                    <div className="header-money-item">
                        <h3 className="header-money-title">账户余额</h3>
                        <div className="header-money-number">
                            <CurrencyFormatter className="number">{totalAmount}</CurrencyFormatter>
                        </div>
                    </div>
                </div>
                <div className="padding20">
                    <ListFilter filters={listFilters} onSearch={this.searchHandel} ref={el => this.listFilter = el}/>
                    <Table className="mt10" columns={listColumn(this)} dataSource={accountEnterprise.listData} pagination={pagination} rowKey={r => r.departmentId} onChange={this.onChange}/>
                </div>
            </div>
        );
    }
}

export default connect(({ accountEnterprise }) => ({ accountEnterprise }))(Enterprise);
