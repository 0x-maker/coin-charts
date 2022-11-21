import { SYMBOL_EMPTY } from "constants.js";
import { pickSvgUrl } from "icons.js";
import isEqual from "lodash/isEqual";
import isNumber from "lodash/isNumber";
import { Component } from "react";
import { FormattedMessage, FormattedNumber, injectIntl } from "react-intl";
import { Link } from "react-router-dom";
import { Badge } from "reactstrap";
import Exchange from "../Exchange";
import AnimateRow from "./AnimateRow";
import { pickCap24hrChangeColor } from "./utils";

class TrackerItem extends Component {
  shouldComponentUpdate(nextProps) {
    const { item, currency } = this.props;
    return (
      item.symbol !== nextProps.item.symbol ||
      item.changePercent24Hr !== nextProps.item.changePercent24Hr ||
      currency.coef !== nextProps.currency.coef ||
      item.priceUsd !== nextProps.item.priceUsd ||
      !isEqual(item, nextProps.item)
    );
  }

  render() {
    const {
      item,
      currency,
      intl: { formatNumber },
    } = this.props;

    const {
      priceUsd,
      id,
      symbol,
      name,
      marketCapUsd,
      volumeUsd24Hr,
      maxSupply,
      changePercent24Hr: changePercent24HrOriginal,
    } = item || {};

    const changePercent24Hr = pickCap24hrChangeColor(
      changePercent24HrOriginal,
      formatNumber
    );

    return (
      <Link
        className="app-table-row"
        to={{
          pathname: `/currency/${id}`,
          state: { modal: true },
        }}
        key={`link-${id}`}
      >
        <AnimateRow value={priceUsd} key={`anim-${id}`} />
        <div className="app-table-col app-table-col-size-name">
          <div className="d-flex align-items-center">
            <img
              src={pickSvgUrl(symbol)}
              alt={`Logo ${name}`}
              width={32}
              height={32}
              className="mr-2"
            />
            <div className="text-left">
              <div className="item-badge">
                <Badge color="secondary">{symbol}</Badge>
              </div>
              <div className="item-name">{name}</div>
            </div>
          </div>
        </div>
        <div className="app-table-col text-right app-table-col-size-mktcap">
          <span className="d-inline-block text-label d-sm-none mr-1">
            <FormattedMessage id="app.market-cap" defaultMessage="Market Cap" />
            :
          </span>
          {formatNumber(marketCapUsd * currency.coef, {
            currency: currency.key,
            style: "currency",
            currencyDisplay: "symbol",
          })}
        </div>
        <div className="app-table-col text-right">
          <span className="d-inline-block text-label d-sm-none mr-1">
            <FormattedMessage id="app.price" defaultMessage="Price" />:
          </span>
          {isNumber(priceUsd) && priceUsd !== 0
            ? formatNumber(priceUsd * currency.coef, {
                currency: currency.key,
                style: "currency",
                currencyDisplay: "symbol",
                maximumFractionDigits: 8,
              })
            : SYMBOL_EMPTY}
        </div>
        <div className="app-table-col text-right">
          <span className="d-inline-block text-label d-sm-none mr-1">
            <FormattedMessage
              id="app.volume24"
              defaultMessage="Volume (24hr)"
            />
            :
          </span>
          {isNumber(volumeUsd24Hr) ? (
            <FormattedNumber value={volumeUsd24Hr} />
          ) : (
            SYMBOL_EMPTY
          )}
        </div>
        <div className="app-table-col text-right app-table-col-size-maxSupply">
          <span className="d-inline-block text-label d-sm-none mr-1">
            <FormattedMessage
              id="app.circulating-supply"
              defaultMessage="Circulating Supply"
            />
            :
          </span>
          {isNumber(maxSupply) ? (
            <FormattedNumber value={maxSupply} />
          ) : (
            SYMBOL_EMPTY
          )}
        </div>
        <div className="app-table-col text-right app-table-col-size-cap24hrChange">
          <span className="d-inline-block text-label d-sm-none mr-1">
            <FormattedMessage
              id="app.change24"
              defaultMessage="Change (24hr)"
            />
            :
          </span>
          {changePercent24Hr}
        </div>
        <div className="app-table-col text-right app-table-col-size-buttons pr-0">
          <span className="d-inline-block text-label d-sm-none mr-1">
            <FormattedMessage id="app.trade" defaultMessage="Trade" />:
          </span>
          <Exchange currency={symbol} type="link" />
        </div>
      </Link>
    );
  }
}

export default injectIntl(TrackerItem);
