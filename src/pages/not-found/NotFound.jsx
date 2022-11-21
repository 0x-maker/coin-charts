import React, { Component, Fragment } from 'react';
import { Container } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import Helmet from 'react-helmet';

class NotFound extends Component {
    render() {
        return (
            <Fragment>
                <Helmet
                    title="Page Not Found" />
                <Container className="text-center">
                    <h3>404 | <FormattedMessage id="app.page-not-found" defaultMessage="Page Not Found" /></h3>
                </Container>
            </Fragment>
        )
    }
}

export default NotFound;