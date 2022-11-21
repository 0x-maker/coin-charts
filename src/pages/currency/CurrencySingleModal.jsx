import React from 'react';
import Loader from 'components/common/Loader/Loader';
import TrackerItemFull from 'components/tracker/TrackerItemFull';
import Modal from 'components/Modal/Modal';
import { ThemeConsumer } from 'components/theme/Theme';

const CurrencySingleModal = (props) => {
  const { match: { params: { code } }, history } = props;
  const back = () => {
    history.goBack();
  };
  return (

    <ThemeConsumer>
      <Modal show={true} onToggle={back}>
        {code ? <TrackerItemFull id={code} /> : <Loader />}
      </Modal>
    </ThemeConsumer>
  )
}

export default CurrencySingleModal;
