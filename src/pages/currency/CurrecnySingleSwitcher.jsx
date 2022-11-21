import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CurrencySingleModal from './CurrencySingleModal';
import CurrencySingle from './CurrencySingle';
import Home from 'pages/home/Home';
import NotFound from 'pages/not-found/NotFound';
import { ROUTE_CURRENCY_SINGLE, ROUTE_NOT_FOUND } from 'components/RootRoutes';

class CurrencySingleSwitcher extends Component {
  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    // set previousLocation if props.location is not modal
    if (
      nextProps.history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const { location } = this.props;

    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    );
    return (
      <Fragment>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path='/' component={Home} />
          <Route path={ROUTE_CURRENCY_SINGLE} component={CurrencySingle} />
          <Route path={ROUTE_NOT_FOUND} component={NotFound} />
          <Redirect from='*' exact to={ROUTE_NOT_FOUND} component={NotFound} />
        </Switch>
        {isModal ? <Route path={ROUTE_CURRENCY_SINGLE} component={CurrencySingleModal} /> : null}
      </Fragment>
    )
  }
}

export default CurrencySingleSwitcher;
