import React from 'react';
import { connect } from 'dva';

import CardsData from './components/CardsData';
import TrendRankingTabs from './components/TrendRankingTabs';
// import StationCarousel from './components/StationCarousel';
import StationStatistics from './components/StationStatistics';
import styles from './index.less';
import moment from 'moment';

class Index extends React.Component {

    _getDateRange = (flag) => {
        let dateRange = [moment(), moment()];
        switch (flag) {
        case 'weekly':
            dateRange = { startDate: moment().startOf('week'), endDate: moment().endOf('week') };
            break;
        case 'monthly':
            dateRange = { startDate: moment().startOf('month'), endDate: moment().endOf('month') };
            break;
        case 'yearly':
            dateRange = { startDate: moment().startOf('year'), endDate: moment().endOf('year') };
            break;
        }
        return {
            startDate: dateRange.startDate.format('YYYY-MM-DD'),
            endDate: dateRange.endDate.format('YYYY-MM-DD'),
        };
    };

    render() {
        return (
            <div className={styles.HomeWrapper}>
                <CardsData {...this.props}/>
                <TrendRankingTabs {...this.props} getDateRange={this._getDateRange}/>
                {/* <StationCarousel {...this.props}/> */}
                <StationStatistics {...this.props}/>
            </div>
        );
    }

    componentDidMount() {
        const { dispatch, home: { dateRange } } = this.props;

        dispatch({ type: 'home/queryCardsData' });
        dispatch({ type: 'home/queryOilPageOrder', payload: dateRange });
        dispatch({ type: 'home/queryTrend', payload: dateRange });
        dispatch({ type: 'home/queryHomepageTrend' });
        dispatch({ type: 'home/queryHomepagePayType', payload: dateRange });
    }
}

export default connect(({ home, global }) => ({ home, global }))(Index);
