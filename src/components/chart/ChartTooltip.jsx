import React from 'react';
import { injectIntl } from 'react-intl';

const ChartTooltip = (props) => {
  const { payload, intl: { formatNumber } } = props;
  return (
    payload ?
      <div className="custom-tooltip">
        {payload.map(item => {
          return (
            <div key={item.dataKey}>
              {item.payload.date}
              <div>
                Price: <span style={{ color: item.color }}>
                  {formatNumber(item.payload.price)}
                </span>
              </div>
            </div>
          )
        })}
      </div >
      :
      null
  )
}

export default injectIntl(ChartTooltip);
