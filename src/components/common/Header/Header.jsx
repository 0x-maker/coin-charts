import React, { Component, Fragment } from 'react';
import { Container, Navbar } from 'reactstrap';
import { Timeline, Close, Menu, MailOutline } from '@material-ui/icons';
import { ROUTE_HOME } from 'components/RootRoutes';
import { Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { FormattedMessage } from 'react-intl';
import { APP_MAIL, APP_NAME } from 'constants.js';
import { ThemeConsumer } from 'components/theme/Theme';
import ThemeSwitcher from 'components/theme/ThemeSwitcher';
import './Header.css';

const DURATION = 150;

class Header extends Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: false
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    const { collapsed } = this.state;
    return (
      <Fragment>
        <Navbar className="app-header" fixed="top" light>
          <Container >
            <Link to={ROUTE_HOME} className="mr-auto navbar-brand">
              <div className="logo">
               <img src="https://i.ibb.co/nB1xBPp/artopia-icon-transparent.png" height="30" width="30"></img>  {APP_NAME}
              </div>
            </Link>

            <ThemeConsumer>
              <ThemeSwitcher />
            </ThemeConsumer>
            {!collapsed ?
              <Menu onClick={this.toggleNavbar} className="mr-2 ml-3 ml-sm-5" />
              :
              <Close onClick={this.toggleNavbar} className="mr-2 ml-3 ml-sm-5" />}
          </Container >
        </Navbar>

        <Transition in={collapsed} timeout={DURATION}>
          {(state) => (
            <div className={`anim-bg anim-nav anim-nav-${state}`}>
              <Container className="text-right">
                <nav>
                  <a href={`mailto:${APP_MAIL}`} title="Reach Out">
                    <MailOutline />&nbsp;<FormattedMessage id="app.mail-us" defaultMessage="Reach out" />
                  </a>
                </nav>
              </Container >
            </div>
          )}
        </Transition>
      </Fragment>
    );
  }
}

export default Header;
