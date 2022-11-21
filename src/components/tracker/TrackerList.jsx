import React from 'react';
import TrackerItem from './TrackerItem';
import { FormattedMessage } from 'react-intl';
import VirtualList from 'react-virtual-list';
import { isMobileView } from 'utils.js';

const List = ({ virtual, currency }) => {
  const { style, items } = virtual;
  return (
    <div style={style}>
      {
        items.map(item => (
          <TrackerItem
            key={item.id}
            item={item}
            currency={currency}
          />
        ))
      }
    </div>
  )
};

const TrackerVirtualList = VirtualList()(List);

const TrackerList = (props) => {
  const { list, currency } = props;
  const itemHeight = isMobileView() ? 360 : 50;
  return (
    list && list.length ?
      <div className="mb-3">
        <TrackerVirtualList
          items={list}
          itemHeight={itemHeight}
          currency={currency}
        />
      </div>
      :
      <div className="px-2 py-3">
        <FormattedMessage
          id="app.list-empty"
          defaultMessage="No results" />
      </div>
  )
}

export default TrackerList;
