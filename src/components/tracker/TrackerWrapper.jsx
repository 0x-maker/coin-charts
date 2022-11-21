import React, { Component, Fragment } from "react";
import TrackerList from "./TrackerList";
import TrackerHeader from "./TrackerHeader";
import { Container, Row, Col } from "reactstrap";
import CurrencySelector from "./CurrencySelector";
import Loader from "components/common/Loader/Loader";
import { withRouter } from "react-router";
import TrackerFilter from "./TrackerFilter";
import filter from "lodash/filter";
import orderByFunc from "lodash/orderBy";
import { API_URL_COINCAP, COINS_LIMIT } from "constants.js";
import { subscribeToSocketPrices } from "../Socket";
import { scrollToTop } from "utils.js";
import { parseFloatNumber, parseIntNumber } from "./utils";
import isNull from "lodash/isNull";
import "./Tracker.css";

const mapCoinProps = (item) => {
  const supply = parseFloatNumber(item.supply);
  const maxSupply =
    item.maxSupply && !isNull(item.supply)
      ? parseFloatNumber(item.maxSupply)
      : supply;
  const priceUsd = parseFloatNumber(item.priceUsd);
  const changePercent24Hr = parseFloatNumber(item.changePercent24Hr);
  const volumeUsd24Hr = parseFloatNumber(item.volumeUsd24Hr);
  const marketCapUsd = parseFloatNumber(item.marketCapUsd);
  const vwap24Hr = parseFloatNumber(item.vwap24Hr);
  const rank = parseIntNumber(item.rank);
  return {
    ...item,
    changePercent24Hr,
    marketCapUsd,
    maxSupply,
    priceUsd,
    rank,
    supply,
    volumeUsd24Hr,
    vwap24Hr,
  };
};

const formatDataValues = (data) => data.map(mapCoinProps);

const updateCoinById = (list, findId, values) => {
  let newList = [...list];
  const index = newList.findIndex(({ id }) => id === findId);

  if (index >= 0) {
    newList[index] = mapCoinProps({
      ...newList[index],
      ...values,
    });
  }
  return newList;
};

class TrackerWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
      dataOriginal: [],
      currency: {
        key: "USD",
        coef: 1,
      },
      selectedPage: 0,
      orderBy: {
        field: null,
        order: "asc",
      },
    };
    this.fetchData();
  }

  updateTrades = (updates) => {
    const { data: list } = this.state;
    let newList = [...list];

    Object.keys(updates).forEach((key) => {
      newList = updateCoinById(newList, key, { priceUsd: updates[key] });
    });

    this.setState({
      data: newList,
    });
  };

  subsribeToUpdates = () => {
    subscribeToSocketPrices((prices) => {
      this.updateTrades(JSON.parse(prices));
    });
  };

  async fetchData() {
    try {
      const { data } = await fetch(
        `${API_URL_COINCAP}/assets?limit=${COINS_LIMIT}`
      ).then((resp) => resp.json());

      this.subsribeToUpdates();
      const formattedData = formatDataValues(data);
      return this.setState({
        data: formattedData,
        dataOriginal: formattedData,
        loading: false,
      });
    } catch (error) {
      console.log("Request failed", error.message);
    }
  }

  onChangeSort = (mode) => {
    const { data, orderBy } = this.state;
    const order = orderBy.order === "asc" ? "desc" : "asc";
    const sortedData = orderByFunc(data, mode, order);
    scrollToTop();
    this.setState({
      data: sortedData,
      orderBy: {
        order: order,
        field: mode,
      },
    });
  };

  onChangeCurrency = (currency) => {
    this.setState({
      currency: currency,
    });
  };

  onChageSearch = (query) => {
    const searchQuery = query ? query.toLowerCase() : "";
    const { dataOriginal, orderBy } = this.state;
    let filteredData = filter(dataOriginal, (item) => {
      return item.name && item.name.toLowerCase().indexOf(searchQuery) >= 0;
    });

    if (orderBy && orderBy.field) {
      filteredData = orderByFunc(filteredData, orderBy.field, orderBy.order);
    }

    this.setState({
      data: filteredData,
    });
    scrollToTop();
  };

  render() {
    const { loading, data, orderBy, currency } = this.state;
    return (
      <div className="loader-wrapper app-h">
        {!loading ? (
          <Fragment>
            <div className="tracker-sticky-header">
              <Container>
                <Row className="mb-1">
                  <Col xs={12} sm={4} lg={3}>
                    <TrackerFilter onChageSearch={this.onChageSearch} />
                  </Col>
                  <Col>
                    <CurrencySelector onChange={this.onChangeCurrency} />
                  </Col>
                </Row>

                <TrackerHeader
                  orderBy={orderBy}
                  onChangeSort={this.onChangeSort}
                />
              </Container>
            </div>
            <Container className="tracker-wrapper">
              <TrackerList list={data} currency={currency} />
            </Container>
          </Fragment>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default withRouter(TrackerWrapper);
