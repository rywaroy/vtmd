import React from 'react';
import { Table } from 'antd';
import { listFilterGas, listColumnGas, modalFormGas } from '../map';
import { ListFilter, GenerateModal } from '@/components';
import { Global_Pagination } from '@/lib/enum';

class GasStationAccount extends React.Component {

    searchHandel = (searchFormData) => {
        this.queryList({ pageNum: 1, searchFormData });
        this.props.dispatch({
            type: 'gasStationAccount/gasstationMonitorStat',
            payload: searchFormData
        });
    }

    /**
	 * 查询列表
	 * @param {Object} params - 查询参数对象
	 */
    queryList(params = {}) {
	    this.props.dispatch({
	        type: 'gasStationAccount/updateStateCall',
	        payload: { ...params },
	    }).then(() => {
	        this.props.dispatch({ type: 'gasStationAccount/queryList' });
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
     * 打开结算弹窗
     * @param {Number} id - id
     */
    openModal = stationId => {
        this.props.dispatch({
            type: 'gasStationAccount/updateState',
            payload: {
                settleVisible: true,
                settleModalKey: Math.random(),
                stationId,
            }
        });
    }

    /**
     * 关闭弹窗
     */
    closeModal() {
        this.props.dispatch({
            type: 'gasStationAccount/updateState',
            payload: {
                settleVisible: false,
            }
        });
    }

    /**
     * 结算
     */
    settle = values => {
        this.props.dispatch({
            type: 'gasStationAccount/add',
            payload: values
        }).then(res => {
            if (res) {
                this.closeModal();
                this.queryList();
            }
        });
    }

    componentDidMount() {
        this.queryList();
        this.props.dispatch({
            type: 'gasStationAccount/gasstationMonitorStat'
        });
    }

    render() {
        const { gasStationAccount } = this.props;
	    const {
	        total,
	        pageNum,
            pageSize,
            listData,
            settleVisible,
            settleModalKey,
            warnCnt,
	    } = gasStationAccount;
	    const pagination = {
	        ...Global_Pagination,
	        total,
	        current: pageNum,
	        pageSize,
	        onChange: this.onPageChange,
	        onShowSizeChange: this.onShowSizeChange
        };
        const modalProps = {
            width: 500,
        	visible: settleVisible,
        	title: '添加结算油费',
        	modalKey: settleModalKey,
        	modalForm: modalFormGas(this),
        	onCancel: () => {
                this.closeModal();
        	},
        	onOk: this.settle,
        };

        return (
            <div className="bg-w">
	            <div className="padding20">
	                <ListFilter filters={listFilterGas(this)} onSearch={this.searchHandel} />
                    <div className="header-statistic bt">
                        <div><span>警戒数量：</span><span className="header-statistic-content">{warnCnt}</span></div>
                    </div>
	                <Table className="mt10" columns={listColumnGas(this)} dataSource={listData} pagination={pagination} rowKey={r => r.id}/>
	            </div>
                <GenerateModal {...modalProps}/>
	        </div>

        );
    }
}

export default GasStationAccount;