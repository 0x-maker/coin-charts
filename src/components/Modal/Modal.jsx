import React from 'react';
import { Modal as ReactStrapModal, ModalBody } from 'reactstrap';
import Close from '@material-ui/icons/Close';
import './Modal.css';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this._toggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ isOpen: nextProps.show })
  }

  componentDidMount() {
    this.setState({ isOpen: this.props.show })
  }

  _toggle() {
    const { onToggle } = this.props;
    const { isOpen } = this.state;

    this.setState({
      isOpen: !isOpen
    });

    if (typeof onToggle === 'function') {
      onToggle(!isOpen);
    }
  }

  render() {
    const { isOpen } = this.state;
    const { children, context: { theme }, className } = this.props;
    return (

      <ReactStrapModal isOpen={isOpen} toggle={this.toggle} className={(className ? className : '') + `theme-${theme}`}>
        <div className="modal-close" onClick={this.toggle}>
          <Close />
        </div>
        <ModalBody>
          {children}
        </ModalBody>
      </ReactStrapModal>
    );
  }
}

export default Modal;
