import React from 'react';
import { Route } from 'react-router-dom';
import CurrencySingleSwitcher from '../pages/currency/CurrecnySingleSwitcher';

export const ROUTE_HOME = '/';
export const ROUTE_NOT_FOUND = '/not-found';
export const ROUTE_CURRENCY_SINGLE = '/currency/:code';

const RootRoutes = _ => (
  <main>
    <Route component={CurrencySingleSwitcher} />
  </main>
)

export default RootRoutes;
