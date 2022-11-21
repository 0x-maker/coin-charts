import React, { Fragment } from "react";
import { Button } from "reactstrap";
import { FormattedMessage } from "react-intl";
import {
  CHANGELLY_REF_ID,
  CHANGELLY_EXANGE_URL,
  CHANGELLY_EXANGE_AMOUNT,
} from "constants.js";

const Exchange = ({ currency, type }) => {
  const exhangeHandler = (e, currency, direction = "buy") => {
    e.preventDefault();
    e.stopPropagation();
    currency = currency !== "BTC" ? currency.toLowerCase() : "eth";
    const exchangeCurrenciesUrl =
      direction === "buy"
        ? `from=btc&to=${currency}`
        : `from=${currency}&to=btc`;
    const url = `${CHANGELLY_EXANGE_URL}/?${exchangeCurrenciesUrl}&ref_id=${CHANGELLY_REF_ID}&amount=${CHANGELLY_EXANGE_AMOUNT}`;

    window.open(url, "_blank");
  };

  return type === "link" ? (
    <Fragment>
      <Button
        onClick={(e) => exhangeHandler(e, currency, "buy")}
        size="sm"
        color="link"
      >
        <FormattedMessage id="app.buy" defaultMessage="Buy" />
      </Button>
      {type === "link" ? <span className="divider">/</span> : null}
      <Button
        onClick={(e) => exhangeHandler(e, currency, "sell")}
        size="sm"
        color="link"
      >
        <FormattedMessage id="app.sell" defaultMessage="Sell" />
      </Button>
    </Fragment>
  ) : (
    <Fragment>
      <Button
        onClick={(e) => exhangeHandler(e, currency, "buy")}
        color="success"
        className="mr-3"
      >
        <FormattedMessage id="app.buy" defaultMessage="Buy" />
      </Button>
      <Button
        onClick={(e) => exhangeHandler(e, currency, "sell")}
        color="danger"
      >
        <FormattedMessage id="app.sell" defaultMessage="Sell" />
      </Button>
    </Fragment>
  );
};

export default Exchange;
