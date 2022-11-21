import React, { PureComponent, Fragment } from 'react';
import Switch from '@material-ui/core/Switch';
import { FormattedMessage } from 'react-intl';

class ThemeSwitcher extends PureComponent {

  state = {
    checked: false
  };

  onChange = event => {
    const checked = event.target.checked;
    const { context: { setTheme } } = this.props;
    if (typeof setTheme === 'function') {
      const theme = checked ? 'dark' : 'light';
      setTheme(theme);
    }
    this.setState({ checked: checked });
  };

  componentDidMount() {
    const { context: { theme } } = this.props;
    if (theme === 'dark') {
      this.setState({
        checked: true
      });
    }
  }

  render() {
    const { checked } = this.state;
    return (
      <Fragment>
        <div className="font-xs d-none d-sm-inline-block">
          <FormattedMessage id="app.view.day"
            defaultMessage="Day View" />
        </div>
        <Switch
          color="primary"
          onChange={this.onChange}
          checked={checked}
        />
        <div className="font-xs d-none d-sm-inline-block">
          <FormattedMessage id="app.view.night"
            defaultMessage="Night View" />
        </div>
      </Fragment>
    )
  }
}

export default ThemeSwitcher;
