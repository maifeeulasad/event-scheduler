/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import styles from './Conference.module.scss';
import {
  getConferenceSpeakers,
  getConferenceLocations,
} from '../../services/conference-service';
import { CustomLoader } from '../../widget/loader/CustomLoader';
import { ContactCard, IContact } from './ContactCard';
import { LocationCard, ILocation } from './LocationCard';
import { CustomLink } from '../../widget/link/CustomLink';
import { NavBar } from '../nav/NavBar';

interface ILeftMenu {
  menuItems: string[];
  selectedMenu: string;
  setSelectedMenu: (menuItem: string) => void;
}

const LeftMenu = ({ menuItems, selectedMenu, setSelectedMenu }: ILeftMenu) => {
  const onClickMenuItem = (menuItem: string) => setSelectedMenu(menuItem);
  return (
    <div className="m-8 w-1/5">
      {menuItems.map((menuItem) => (
        <div
          className={`${styles.menuItem} ${
            menuItem === selectedMenu ? styles.selected : ''
          }`}
          onClick={() => onClickMenuItem(menuItem)}
        >
          {menuItem}
        </div>
      ))}
    </div>
  );
};

const OrganizerContent = () => <div>Organizer</div>;

interface ISpeakerConference {
  conference: {
    speakers: IContact[];
  };
}

interface ISpeakersContent {
  conferenceId: string;
}

const SpeakersContent = ({ conferenceId }: ISpeakersContent) => {
  const { loading, data } = useQuery<ISpeakerConference>(
    getConferenceSpeakers(),
    {
      variables: { id: conferenceId },
    },
  );

  return loading ? (
    <CustomLoader />
  ) : (
    <div>
      {data?.conference.speakers.map((speaker) => (
        <ContactCard
          name={speaker.name}
          aboutShort={speaker.aboutShort}
          image={speaker.image}
        />
      ))}
    </div>
  );
};

interface ILocationConference {
  conference: {
    locations: ILocation[];
  };
}

interface ILocationContent {
  conferenceId: string;
}

const LocationContent = ({ conferenceId }: ILocationContent) => {
  const { loading, data } = useQuery<ILocationConference>(
    getConferenceLocations(),
    {
      variables: { id: conferenceId },
    },
  );

  return loading ? (
    <CustomLoader />
  ) : (
    <div>
      {data?.conference.locations.map((location) => (
        <LocationCard
          address={location.address}
          city={location.city}
          image={location.image}
          country={location.country}
        />
      ))}
    </div>
  );
};

const ScheduleContent = () => (
  <div>
    <CustomLink target="/" text="Avaiable @ Home" />
  </div>
);
const SponsorsContent = () => <div>Sponsors</div>;

interface IRightContent {
  selectedMenu: string;
  conferenceId: string;
}

const RightContent = ({ selectedMenu, conferenceId }: IRightContent) => (
  <div className="m-8 w-4/5">
    {selectedMenu === 'Organizer' && <OrganizerContent />}
    {selectedMenu === 'Speakers' && (
      <SpeakersContent conferenceId={conferenceId} />
    )}
    {selectedMenu === 'Location' && (
      <LocationContent conferenceId={conferenceId} />
    )}
    {selectedMenu === 'Schedule' && <ScheduleContent />}
    {selectedMenu === 'Sponsors' && <SponsorsContent />}
  </div>
);

const Conference = () => {
  const { conferenceId } = useParams();
  if (!conferenceId) {
    return <CustomLoader />;
  }

  const menuItems = [
    'Organizer',
    'Speakers',
    'Location',
    'Schedule',
    'Sponsors',
  ];
  const [selectedMenu, setSelectedMenu] = useState(menuItems[1]);

  return (
    <>
      <NavBar />
      conference: {conferenceId}
      <div className="flex">
        <LeftMenu
          menuItems={menuItems}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
        <RightContent selectedMenu={selectedMenu} conferenceId={conferenceId} />
      </div>
    </>
  );
};

export { Conference };
