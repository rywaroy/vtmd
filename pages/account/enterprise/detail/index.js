import React from 'react';
import { connect } from 'dva';
import { Table, Modal, Button } from 'antd';
import { SubHeader, ListFilter, ToggleCiphertext } from '@/components';
import { listFilters, listColumn } from './map';
import { Global_Pagination } from '@/lib/enum';


class enterpriseDetail extends React.Component {
    searchHandel = (searchForm) => {
        let { transactionsTime } = searchForm;
        if (transactionsTime.length > 0) {
            searchForm.gmtStart = transactionsTime[0].format('YYYY-MM-DD');
            searchForm.gmtEnd = transactionsTime[1].format('YYYY-MM-DD');
        }
        delete searchForm.transactionsTime;
        this.queryList({ pageNum: 1, searchForm });
    };

    // 查询列表
    queryList = (params) => {
        this.props.dispatch({
            type: 'enterpriseDetail/updateStateCall',
            payload: params
        }).then(() => {
            this.props.dispatch({ type: 'enterpriseDetail/queryList' });
        });
    };

    // 页码切换
    onPageChange = (page) => {
        this.queryList({ pageNum: page });
    };

    // 页码变化
    onShowSizeChange = (current, size) => {
        this.queryList({ pageNum: current, pageSize: size });
    };

    componentWillUnmount() {
        this.props.dispatch({ type: 'enterpriseDetail/resetState' });
    }

    render() {
        const { enterpriseDetail } = this.props;
        const { total, pageNum, pageSize, consumableBalance, accountList } = enterpriseDetail;
        const pagination = {
            ...Global_Pagination,
            total,
            current: pageNum,
            pageSize,
            onChange: this.onPageChange,
            onShowSizeChange: this.onShowSizeChange
        };

        return (
            <div className="bg-w">
                <SubHeader title="账户明细"/>
                <div className="header-statistic">
                    <ToggleCiphertext
                        label="退款总金额"
                        className="toggleCiphertext"
                        value={consumableBalance}
                        defaultOpen={true}
                    />
                </div>
                <div className="padding20">
                    <ListFilter filters={listFilters(this)} onSearch={this.searchHandel}/>
                    <Table scroll={{ x: 2000 }} columns={listColumn(this)} dataSource={accountList} pagination={pagination} rowKey={r => r.id}/>
                </div>
            </div>
        );
    }
}

export default connect(({ enterpriseDetail }) => ({ enterpriseDetail }))(enterpriseDetail);
