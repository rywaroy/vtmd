import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import { SubHeader } from '@/components';
import GasStationAccount from './components/GasStationAccount';
import OilFreeDetail from './components/OilFreeDetail';

const { TabPane } = Tabs;

class GasStation extends React.Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'gasStationAccount/queryGasStationList'
        });
    }

    componentWillUnmount() {
        this.props.dispatch({ type: 'gasStationAccount/resetState' });
        this.props.dispatch({ type: 'oilFreeDetail/resetState' });
    }

    render() {
        return (
            <div className="bg-w">
	            <SubHeader title="加油站账户" />
	            <div className="padding20">
                    <Tabs defaultActiveKey={'加油站账户'} animated={false} onChange={this.tabChange}>
                        <TabPane tab="加油站账户" key="加油站账户">
                            <GasStationAccount {...this.props} />
                        </TabPane>
                        <TabPane tab="结算油费添加明细" key="结算油费添加明细">
                            <OilFreeDetail {...this.props} />
                        </TabPane>
                    </Tabs>
	            </div>
	        </div>
        );
    }
}

export default connect(({ gasStationAccount, oilFreeDetail }) => ({ gasStationAccount, oilFreeDetail }))(GasStation);