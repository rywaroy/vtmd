import React from 'react';
import { Table } from 'antd';
import { listFilterOil, listColumnOil } from '../map';
import { ListFilter } from '@/components';
import { Global_Pagination } from '@/lib/enum';

class OilFreeDetail extends React.Component {

    searchHandel = (searchFormData) => {
        this.queryList({ pageNum: 1, searchFormData });
    }

    /**
	 * 查询列表
	 * @param {Object} params - 查询参数对象
	 */
    queryList(params = {}) {
	    this.props.dispatch({
	        type: 'oilFreeDetail/updateStateCall',
	        payload: { ...params },
	    }).then(() => {
	        this.props.dispatch({ type: 'oilFreeDetail/queryList' });
	    });
    }

    /**
	 * 页码切换
	 * @param {Number} page - 页码
	 */
    onPageChange = (page) => {
	    this.queryList({ pageNum: page });
    }

    /**
	 * 页码变化
	 * @param {Number} current - 当前页数
	 * @param {Number} size - 分页尺寸
	 */
    onShowSizeChange = (current, size) => {
	    this.queryList({ pageNum: current, pageSize: size });
    }

    componentDidMount() {
        this.queryList();
    }

    render() {
        const { oilFreeDetail } = this.props;
	    const {
	        total,
	        pageNum,
            pageSize,
            listData,
	    } = oilFreeDetail;
	    const pagination = {
	        ...Global_Pagination,
	        total,
	        current: pageNum,
	        pageSize,
	        onChange: this.onPageChange,
	        onShowSizeChange: this.onShowSizeChange
        };

        return (
            <div className="padding20">
                <ListFilter filters={listFilterOil(this)} onSearch={this.searchHandel} />
                <Table className="mt10" columns={listColumnOil(this)} dataSource={listData} pagination={pagination} rowKey={r => r.id}/>
            </div>
        );
    }
}

export default OilFreeDetail;