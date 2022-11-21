import React, { Fragment } from 'react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { injectIntl } from 'react-intl';
import ChartTooltip from './ChartTooltip';
import { FormattedMessage } from 'react-intl';
import './Chart.css';

const caseGridColor = (theme) => theme === 'dark' ? '#333333' : '#ebebeb';

const prepareData = (data, formater) => {
  let array = [];
  if (data && data.length) {
    data.forEach(({ priceUsd: price, time }) => {
      array.push({
        price: parseFloat(price, 10),
        date: formater(time)
      })
    });
  }
  return array;
}

const Chart = (props) => {
  const {
    data,
    intl: { formatDate, formatTime, formatNumber },
    selected,
    loading,
    context: {
      theme
    }
  } = props;

  let formater;

  if (selected.key === '1day') {
    formater = (val) => formatTime(val, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour12: false
    });
  } else {
    formater = (val) => formatDate(val, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  const chartData = prepareData(data, formater);
  const gridStrokeColor = caseGridColor(theme);
  return (
    chartData ?
      <Fragment>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} >
            <Line strokeWidth="2" dot={false} type="linear" dataKey="price" name="Price" stroke={'#0098ff'} />
            <CartesianGrid stroke={gridStrokeColor} strokeDasharray="10 1" />
            <XAxis type="category" dataKey="date" name="Date" />
            <YAxis tickFormatter={formatNumber} type="number" dataKey="price" name="Price" />
            <Tooltip content={<ChartTooltip />} />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
        {chartData && !chartData.length && !loading ?
          <div className="empty-chart">
            <FormattedMessage id="chart.empty-period"
              defaultMessage="Empty data for period" />&nbsp;{selected.label}
          </div>
          : null}
      </Fragment>
      :
      null
  )
};

export default injectIntl(Chart);
