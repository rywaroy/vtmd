import React from 'react';
import { connect } from 'dva';
import { Button, Table } from 'antd';
import { listFilter, listColumn } from './map';
import { ListFilter, SubHeader } from '@/components';
import { Global_Pagination } from '@/lib/enum';

/**
 * @title 司机
 */
class Dirver extends React.Component {

    searchHandel = (searchFormData) => {
        this.queryList({ pageNum: 1, searchFormData });
    };

    /**
     * 查询列表
     * @param {Object} params - 查询参数对象
     */
    queryList(params = {}) {
        this.props.dispatch({
            type: 'accountDriver/updateStateCall',
            payload: { ...params },
        }).then(() => {
            this.props.dispatch({ type: 'accountDriver/queryList' });
        });
    }

    /**
     * 页码切换
     * @param {Number} page - 页码
     */
    // onPageChange = (page) => {
    //     this.queryList({ pageNum: page });
    // }

    /**
     * 页码变化
     * @param {Number} current - 当前页数
     * @param {Number} size - 分页尺寸
     */
    // onShowSizeChange = (current, size) => {
    //     this.queryList({ pageNum: current, pageSize: size });
    // }

    /**
     * 导出
     */
    exportDriver = () => {
        this.listFilter.getForm().validateFields((error, searchFormData) => {
            if (error) {
                return;
            }
            this.props.dispatch({
                type: 'accountDriver/exportDriver', payload: {
                    ...searchFormData,
                }
            });
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
                totalAmount: 1,
                consumeAmount: 2,
                consumeCnt: 3,
            };
            payload.field = map[sorter.columnKey];
            payload.seq = sorter.order === 'descend' ? 2 : 1;
        }
        this.queryList(payload);
    };

    componentWillUnmount() {
        this.props.dispatch({ type: 'accountDriver/resetState' });
    }

    componentDidMount() {
        this.queryList();
    }

    render() {
        const listFilters = listFilter(this);
        const { accountDriver } = this.props;
        const {
            total,
            pageNum,
            pageSize,
        } = accountDriver;
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
                <SubHeader title="司机账户">
                    <Button type="primary" onClick={this.exportDriver}>导出</Button>
                </SubHeader>
                <div className="padding20">
                    <ListFilter filters={listFilters} onSearch={this.searchHandel} ref={el => this.listFilter = el}/>
                    <Table className="mt10" columns={listColumn(this)} dataSource={accountDriver.listData} pagination={pagination} rowKey={r => r.partyId} onChange={this.onChange}/>
                </div>
            </div>
        );
    }
}

export default connect(({ accountDriver }) => ({ accountDriver }))(Dirver);
