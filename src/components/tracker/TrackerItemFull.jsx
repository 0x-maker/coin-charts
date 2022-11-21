import React, { PureComponent, Fragment } from 'react';
import { Container, Card, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap';
import { pickSvgUrl } from 'icons.js';
import ChartWrapper from 'components/chart/ChartWrapper';
import { injectIntl, FormattedNumber, FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';
import { API_URL_COINCAP, SYMBOL_EMPTY } from 'constants.js';
import { ROUTE_HOME } from '../RootRoutes';
import Helmet from 'react-helmet';
import Loader from 'components/common/Loader/Loader';
import Exchange from '../Exchange';
import { ThemeConsumer } from 'components/theme/Theme';
import isNumber from 'lodash/isNumber';
import isNaN from 'lodash/isNaN';

class TrackerItemFull extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      item: null,
      loading: true
    }
  }

  componentDidMount() {
    const { id, history } = this.props;
    fetch(`${API_URL_COINCAP}/assets/${id}`)
      .then(resp => resp.json())
      .then(resp => {
        const { data } = resp;
        if (data && data.name) {
          return this.setState({ item: data, loading: false });
        } else {
          history.replace(ROUTE_HOME);
        }
      })
      .catch(function(error) {
        console.log('Request failed', error);
      });
  }

  render() {
    const { item, loading } = this.state;
    const { intl: { formatNumber } } = this.props;
    const marketCapUsd = item && parseFloat(item.marketCapUsd);
    const volumeUsd24Hr = item && parseFloat(item.volumeUsd24Hr);
    return (
      <Container className="full-item loader-wrapper py-sm-2">
        {!loading && item ?
          <Fragment>
            <Helmet
              title={item.name} />

            <Row>
              <Col className="mr-3" xs={12} sm={3}>
                <img className="mb-3 logo-img md" src={pickSvgUrl(item.symbol)} alt={`Logo ${item.name}`} />
              </Col>
              <Col className="py-2">
                <h1>{item.name}</h1>
                <h4>
                  <FormattedNumber value={item.supply} />
                  &nbsp;
                  <small>
                    <FormattedMessage id="app.сirculating-btc-supply"
                      defaultMessage="Circulating BTC Supply" />
                  </small>
                </h4>
              </Col>
            </Row>

            <Row className="mb-5">
              <Col xs={12} sm={4} className="mb-2">
                <Card>
                  <CardBody>
                    <CardTitle>
                      <FormattedMessage id="app.current-value"
                        defaultMessage="Current Value" />
                    </CardTitle>
                    <CardText>
                      <FormattedNumber value={item.priceUsd} />&nbsp;({formatNumber(item.changePercent24Hr / 100, { style: 'percent' })})
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col xs={12} sm={4} className="mb-2">
                <Card>
                  <CardBody>
                    <CardTitle>
                      <FormattedMessage id="app.market-cap"
                        defaultMessage="Market Cap" />
                    </CardTitle>
                    <CardText>
                      {isNumber(marketCapUsd) && !isNaN(marketCapUsd) ? <FormattedNumber value={marketCapUsd} /> : SYMBOL_EMPTY}
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col xs={12} sm={4} className="mb-2">
                <Card>
                  <CardBody>
                    <CardTitle>
                      <FormattedMessage id="app.24htVoume"
                        defaultMessage="24hr Volume" />
                    </CardTitle>
                    <CardText>
                      {isNumber(volumeUsd24Hr) && !isNaN(volumeUsd24Hr) ? <FormattedNumber value={volumeUsd24Hr} /> : SYMBOL_EMPTY}
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <ThemeConsumer>
              <ChartWrapper id={item.id} />
            </ThemeConsumer>

            <div className="text-right item-footer">
              <Exchange currency={item.symbol.toLowerCase()} type="primary" />
            </div>

          </Fragment>
          :
          <Loader />}
      </Container>
    )
  }
}

export default withRouter(injectIntl(TrackerItemFull));
