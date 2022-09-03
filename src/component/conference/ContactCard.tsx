import React from 'react';
import styles from './ContactCard.module.scss';

import defaultImage from './404.png';

interface IContactCard {
  name: string
  aboutShort: string
  image: {
    url: string
  }
}

const ContactCard = ({ name, aboutShort, image }: IContactCard) => (
  <div className={`flex ${styles.contactWrap}`}>
    <img
      loading="lazy"
      className="w-12 h-12 m-4"
      src={image.url || defaultImage}
      alt={name}
    />
    <div>
      <h1>{name}</h1>
      <div>{aboutShort}</div>
    </div>
  </div>
);

export { ContactCard };
export type { IContactCard as IContact };
