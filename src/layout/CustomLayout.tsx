/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { CustomLink } from '../widget/link/CustomLink';

import logo from './icon.svg';

const NavBar = () => (
  <nav className="navbar navbar-expand-md bg-light w-screen">
    <div className="container">
      <nav className="flex items-center justify-between flex-grow p-2">
        <img src={logo} className="animate-spin h-10" alt="icon" />
        <CustomLink target="about" text="About us" />
        <CustomLink target="we" text="What We do" />
        <CustomLink target="work" text="Our Work" />
        <CustomLink target="blog" text="Blog" />
        <CustomLink target="hi" text="Say hi" />
      </nav>
    </div>
  </nav>
);

const CustomHeader = () => (
  <NavBar />
);
interface ICustomLayoutProps {
  children: any
}

// eslint-disable-next-line react/prefer-stateless-function
class CustomLayout extends React.Component<ICustomLayoutProps> {
  render() {
    const { children } = this.props;

    return (
      <>
        <CustomHeader />
        {children}
      </>
    );
  }
}

export { CustomLayout };
