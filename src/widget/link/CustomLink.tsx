import React from 'react';
import { Link } from 'react-router-dom';

interface ICustomLinkProps {
  classes?: string;
  text: string | React.ReactNode;
  target: string;
}

const CustomLink = ({ classes, text, target }: ICustomLinkProps) => (
  <Link
    to={target}
    className={
      classes ||
      'no-underline block mt-4 lg:inline-block lg:mt-0 text-slate-900 hover:text-slate-400 mr-4'
    }
  >
    {text}
  </Link>
);

export { CustomLink };
