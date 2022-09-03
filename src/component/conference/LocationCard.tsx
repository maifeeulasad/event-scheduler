import React from 'react';
import styles from './ContactCard.module.scss';

import defaultImage from './404.png';

interface ILocationCard {
  address: string;
  city: string;
  image: {
    url: string;
  };
  country: {
    name: string;
  };
}

const LocationCard = ({ address, city, image, country }: ILocationCard) => (
  <div className={`flex ${styles.contactWrap}`}>
    <img
      loading="lazy"
      className="w-12 h-12 m-4"
      src={image.url || defaultImage}
      alt={`${country.name}-${city}`}
    />
    <div>
      <h1>{address}</h1>
      <div>{`${city},${country.name}`}</div>
    </div>
  </div>
);

export { LocationCard };
export type { ILocationCard as ILocation };
