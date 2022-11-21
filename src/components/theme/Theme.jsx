import React, { Component } from 'react';

export const ThemeContext = React.createContext();

export const ThemeConsumer = ({ children, ...rest }) => {
  return (
    <ThemeContext.Consumer>
      {(context) => {
        return React.cloneElement(children, {
          context
        });
      }}
    </ThemeContext.Consumer>
  )
}

class ThemeProvider extends Component {
  constructor(props) {
    super(props);
    this.setTheme = this._setTheme.bind(this);
    this.state = {
      theme: this.initTheme(),
      setTheme: this.setTheme
    };
  }

  _setTheme = (name) => {
    const options = {
      theme: name
    };

    localStorage.setItem('options', JSON.stringify(options));
    this.setState(options);
  }

  initTheme = () => {
    const options = JSON.parse(localStorage.getItem('options'));
    let theme;
    if (options && options.theme) {
      theme = options.theme;
    } else {
      theme = 'dark';
      this.setTheme(theme);
    }
    return theme;
  }

  render() {
    const { children } = this.props;
    return (
      <ThemeContext.Provider value={this.state} >
        {children}
      </ThemeContext.Provider>
    )
  }
}

export default ThemeProvider;
