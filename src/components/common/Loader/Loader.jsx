import React, { Fragment } from 'react';
import Loop from '@material-ui/icons/Loop';
import { FormattedMessage } from 'react-intl';
import './Loader.css';

const Loader = () => {
  return (
    <Fragment>
      <div className="overlay"></div>
      <div className="text-primary text-center loader">
        <Loop className="anim-spinner" />
        <div>
          <FormattedMessage id="app.loading" defaultMessage="LOADING" />
        </div>
      </div>
    </Fragment>
  )
}

export default Loader;
