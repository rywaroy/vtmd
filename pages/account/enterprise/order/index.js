import React from 'react';
import { connect } from 'dva';
import { Button, Table } from 'antd';
import { listFilter, listColumn } from './map';
import { ListFilter, SubHeader, CurrencyFormatter } from '@/components';
import { Global_Pagination } from '@/lib/enum';

class EnterpriseDetail extends React.Component {

    /**
     * 筛选
     * @param {Object} searchFormData - 筛选参数对象
     */
    searchHandel = (searchFormData) => {
        const formatSearchFormData = this.getFormatFormData(searchFormData);
        this.queryList({ pageNum: 1, searchFormData: formatSearchFormData });
    }

    /**
     * 处理筛选数据
     * @param {Object} searchFormData - 筛选参数对象
     * @returns {Object} searchFormData - 筛选参数对象
     */
    getFormatFormData(searchFormData) {
        const { price, time } = searchFormData;
        if (price && price.length > 0) {
            searchFormData.minConsumeMoney = price[0];
            searchFormData.maxConsumeMoney = price[1];
            delete searchFormData.price;
        }

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
            type: 'accountEnterpriseDetail/updateStateCall',
            payload: { ...params },
        }).then(() => {
            this.props.dispatch({ type: 'accountEnterpriseDetail/queryList' });
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

    /**
     * 导出
     */
    exportAccountDetail = () => {
        this.listFilter.getForm().validateFields((error, searchFormData) => {
            if (error) {
                return;
            }
            const formatSearchFormData = this.getFormatFormData(searchFormData);
            this.props.dispatch({ type: 'accountEnterpriseDetail/exportAccountDetail', payload: {
                ...formatSearchFormData,
                departmentId: this.props.accountEnterpriseDetail.departmentId
            } });
        });
    }

    componentWillUnmount() {
        this.props.dispatch({ type: 'accountEnterpriseDetail/resetState' });
    }


  	render() {
	    const listFilters = listFilter(this);
	    const { accountEnterpriseDetail } = this.props;
	    const {
	        total,
	        pageNum,
            pageSize,
            depositAmount, // 充值金额
	        oilConsumeCnt, // 消费订单数
	        oilConsumeMl, // 加油升数
            oilConsumeMoney, // 消费总金额
            totalAmount,
            depositEntityName,
	    } = accountEnterpriseDetail;
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
	            <SubHeader title={`企业订单　　${depositEntityName}`}>
	                <Button type="primary" onClick={this.exportAccountDetail}>导出</Button>
	            </SubHeader>
	            <div className="header-statistic">
	                <div><span>充值总金额：</span><span ><CurrencyFormatter className="header-statistic-content">{depositAmount}</CurrencyFormatter></span></div>
	                <div><span>消费总金额：</span><CurrencyFormatter className="header-statistic-content">{oilConsumeMoney}</CurrencyFormatter></div>
	                <div><span>订单总数：</span><span className="header-statistic-content">{oilConsumeCnt}</span></div>
	                <div><span>加油总量（L）:</span><span className="header-statistic-content">{oilConsumeMl}</span></div>
                    <div><span>账户余额：</span><CurrencyFormatter className="header-statistic-content">{totalAmount}</CurrencyFormatter></div>
	            </div>
	            <div className="padding20">
	                <ListFilter filters={listFilters} onSearch={this.searchHandel} ref={el => this.listFilter = el}/>
	                <Table className="mt10" scroll={{ x: 1000 }} columns={listColumn(this)} dataSource={accountEnterpriseDetail.listData} pagination={pagination} rowKey={r => r.id}/>
	            </div>
	        </div>
	    );
  	}
}

export default connect(({ accountEnterpriseDetail }) => ({ accountEnterpriseDetail }))(EnterpriseDetail);