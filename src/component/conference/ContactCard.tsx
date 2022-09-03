import React from 'react';
import styles from './ContactCard.module.scss'

interface IContactCard {
  name: string
  aboutShort: string
  image: {
    url: string
  }
}

const ContactCard = ({ name, aboutShort, image }: IContactCard) => (
  <div className={`flex ${styles.contactWrap}`}>
    <img className="w-12 h-12 m-4" src={image.url} alt={name} />
    <div>

      <h1>{name}</h1>
      <div>{aboutShort}</div>
    </div>
  </div>
);

export { ContactCard };
export type { IContactCard as IContact };
