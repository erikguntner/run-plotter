import React, { Component } from 'react';
import { connect } from 'react-redux';
import DistanceChart from './DistanceChart';
import WeeklyChart from './WeeklyChart';
import Donut from './Donut';
import Stats from './Stats';
import { getWeeklyRuns } from '../../actions/runLog';

import styles from '../../stylesheets/Dashboard.module.scss';

class StatsContainer extends Component {
  componentDidMount() {
    this.props.getWeeklyRuns();
  }

  render() {
    const { thisWeeksRuns, weeklyTotals } = this.props;

    return (
      <>
        <section className={styles.row}>
          <Stats weeklyTotals={weeklyTotals} />
          <div className={styles.row}>
            <WeeklyChart thisWeeksRuns={thisWeeksRuns} />
            <Donut />
          </div>
        </section>
        <section className={styles.chart}>
          <DistanceChart />
        </section>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getWeeklyRuns: () => dispatch(getWeeklyRuns()),
});

const mapStateToProps = store => ({
  thisWeeksRuns: store.runLog.thisWeeksRuns,
  weeklyTotals: store.runLog.weeklyTotals,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatsContainer);
