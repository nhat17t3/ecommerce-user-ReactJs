import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import MainHeader from '../header';
import Footer2 from '../footer';

const Layout = (props) => {


  return (
    <Fragment>
      <MainHeader />
      {props.children}
      <Footer2></Footer2>
    </Fragment>
  );
};

export default Layout;
