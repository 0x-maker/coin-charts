import React, { PureComponent } from 'react';
import Loader from 'components/common/Loader/Loader';
import Select from 'react-select';
import { API_URL_COINCAP } from 'constants.js';

const prepareCurrencies = (list) => list.map(({ rateUsd, symbol: label, currencySymbol }) => ({ value: parseFloat(rateUsd, 10), label }));

class CurrencySelector extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currenciesDisplay: [],
      loading: true,
    };
    this._fetchData();
  }

  handleChange = (selectedOption) => {
    const { onChange } = this.props;
    this.setState({ selectedOption });
    let val;
    if (selectedOption && selectedOption.value) {
      val = {
        key: selectedOption.label,
        coef: selectedOption.value,
      }
    } else {
      val = null;
    }
    onChange(val);
  }

  _fetchData() {
    fetch(`${API_URL_COINCAP}/rates`)
      .then(resp => resp.json())
      .then(resp => {
        const { data } = resp;
        const rates = [
          {
            id: "american-usd",
            rateUsd: "1",
            symbol: "USD",
          },
          ...data
        ];
        const currenciesDisplay = prepareCurrencies(rates);
        return this.setState({
          loading: false,
          currenciesDisplay,
          selectedOption: currenciesDisplay[0],
        });
      })
      .catch(function (error) {
        console.log('Request failed', error);
      });
  }

  render() {
    const { loading, currenciesDisplay, selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    return (
      <div className="currency-selector">
        {!loading ?
          <Select
            name="form-field-name"
            value={value}
            clearable={false}
            onChange={this.handleChange}
            options={currenciesDisplay}
            placeholder="Currency"
          />
          :
          <Loader />
        }
      </div>
    )
  }
}

export default CurrencySelector;
