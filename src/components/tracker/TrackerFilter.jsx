import React, { PureComponent } from 'react';
import { FormGroup, Input } from 'reactstrap';
import Search from '@material-ui/icons/Search';

class TrackerFilter extends PureComponent {
  constructor() {
    super();
    this.state = {
      input: '',
    };
    this.onChange = this._onChnage.bind(this);
  }

  _onChnage(e) {
    const { onChageSearch } = this.props;
    this.setState({
      input: e.target.value,
    });
    onChageSearch(e.target.value);
  }

  render() {
    const { input } = this.state;
    return (
      <FormGroup className="input-icon">
        <Input value={input} placeholder="Search by name" onChange={this.onChange} />
        <Search className="icon" />
      </FormGroup>
    )
  }
}

export default TrackerFilter;
