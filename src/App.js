import React, { Component } from 'react';
import RootRoutes from 'components/RootRoutes';
import Header from 'components/common/Header/Header';
import Footer from 'components/common/Footer/Footer';
import Helmet from 'react-helmet';
import { APP_TITLE_PREFFIX } from 'constants.js';
import ThemeProvider, { ThemeConsumer } from 'components/theme/Theme';
import Layout from 'components/common/Layout';
import './assets/main.css';
import './assets/bootstrap.css';

class App extends Component {
  render() {
    return (
      <ThemeProvider>
        <ThemeConsumer>
          <Layout>
            <Helmet titleTemplate={`%s | ${APP_TITLE_PREFFIX}`} />
            <Header />
            <RootRoutes />
            <Footer />
          </Layout>
        </ThemeConsumer>
      </ThemeProvider>
    );
  }
}

export default App;
