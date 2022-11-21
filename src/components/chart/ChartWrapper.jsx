import React, { PureComponent } from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import Loader from 'components/common/Loader/Loader';
import Chart from './Chart';
import { ThemeConsumer } from 'components/theme/Theme';
import { appedUrlParams } from 'utils.js';
import { API_URL_COINCAP } from 'constants.js';
import { CHART_DATES } from './constants';

class ChartWrapper extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selected: CHART_DATES[CHART_DATES.length - 1]
    };
  }

  componentDidMount() {
    this.getChartData(CHART_DATES[CHART_DATES.length - 1]);
  }

  getChartData = (item) => {
    const { id } = this.props;
    this.setState({ loading: true, selected: item });
    const params = item.params();
    const url = appedUrlParams(`${API_URL_COINCAP}/assets/${id}/history`, params);
    fetch(url)
      .then(resp => resp.json())
      .then(resp => {
        const { data } = resp;
        return this.setState({ data, loading: false });
      })
      .catch(function (error) {
        console.log('Request failed', error);
      });
  }

  render() {
    const { selected, loading, data } = this.state;
    return (
      <div className="loader-wrapper mb-3">
        <div className="clearfix">
          <Nav pills className="mb-2 float-right">
            {CHART_DATES.map((navItem) =>
              <NavItem key={navItem.key}>
                <NavLink href="#" active={navItem.key === selected.key} onClick={this.getChartData.bind(this, navItem)}>{navItem.label}</NavLink>
              </NavItem>)}
          </Nav>
        </div>
        <ThemeConsumer>
          <Chart data={data} selected={selected} loading={loading} />
        </ThemeConsumer>
        {loading ? <Loader /> : null}
      </div>
    )
  }
}

export default ChartWrapper;
