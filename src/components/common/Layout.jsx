import React from 'react';

const Layout = (props) => {
  const { context: { theme }, children } = props;
  return (
    <div className={`app-main theme-${theme}`}>
      {children}
    </div>
  )
}

export default Layout;
