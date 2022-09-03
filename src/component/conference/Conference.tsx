/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Conference.module.scss';

interface ILeftMenu {
  menuItems: string[]
  selectedMenu: string
  setSelectedMenu: (menuItem: string) => void
}

const LeftMenu = ({ menuItems, selectedMenu, setSelectedMenu }: ILeftMenu) => {
  const onClickMenuItem = (menuItem: string) => setSelectedMenu(menuItem);
  return (
    <div className="m-8 w-2/5">
      {
            menuItems.map((menuItem) => (
              <div
                className={`${styles.menuItem} ${menuItem === selectedMenu ? styles.selected : ''}`}
                onClick={() => onClickMenuItem(menuItem)}
              >
                {menuItem}
              </div>
            ))
        }
    </div>
  );
};

const OrganizerContent = () => <div>Organizer</div>;
const SpeakersContent = () => <div>Speakers</div>;
const LocationContent = () => <div>Location</div>;
const ScheduleContent = () => <div>Schedule</div>;
const SponsorsContent = () => <div>Sponsors</div>;

interface IRightContent {
  selectedMenu: string
}

const RightContent = ({ selectedMenu }: IRightContent) => (
  <div className="m-8 w-3/5">
    {selectedMenu === 'Organizer' && <OrganizerContent />}
    {selectedMenu === 'Speakers' && <SpeakersContent />}
    {selectedMenu === 'Location' && <LocationContent />}
    {selectedMenu === 'Schedule' && <ScheduleContent />}
    {selectedMenu === 'Sponsors' && <SponsorsContent />}
  </div>
);

const Conference = () => {
  const { conferenceId } = useParams();

  const menuItems = ['Organizer', 'Speakers', 'Location', 'Schedule', 'Sponsors'];
  const [selectedMenu, setSelectedMenu] = useState(menuItems[0]);

  return (
    <div>
      conference: {conferenceId}
      <div className="flex">
        <LeftMenu
          menuItems={menuItems}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />
        <RightContent selectedMenu={selectedMenu} />
      </div>
    </div>
  );
};

export { Conference };
