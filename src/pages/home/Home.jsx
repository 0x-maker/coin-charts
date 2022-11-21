import React, { Component, Fragment } from 'react';
import TrackerWrapper from 'components/tracker/TrackerWrapper';
import PageMeta from './PageMeta';

class Home extends Component {
  render() {
    return (
      <Fragment>
        <PageMeta />
        <TrackerWrapper />
      </Fragment>
    )
  }
}

export default Home;
