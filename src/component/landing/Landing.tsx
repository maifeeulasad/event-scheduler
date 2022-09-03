/* eslint-disable max-len */
import React from 'react';
import Button from 'antd/lib/button';
import { ArrowRightOutlined } from '@ant-design/icons';
import { gql, useQuery } from '@apollo/client';

import imageLeft from './image-left.svg';
import imageRight from './image-right.svg';
import { CustomCalendar } from '../../widget/calendar/CustomCalendar';
import { NavBar } from '../nav/NavBar';
import { CustomLoader } from '../../widget/loader/CustomLoader';

import styles from './Landing.module.scss';

const LandingStatic = () => (
  <div className="h-screen">
    <NavBar />
    <div className="container">
      <div className="text-right">
        <h1>React</h1>
        <h1>Conference</h1>
      </div>
      <div className="flex">
        <img src={imageLeft} className="h-14" alt="icon" />
        <div className="w-1/3">
          <div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam
          </div>
          <Button
            type="primary"
            shape="round"
            icon={<ArrowRightOutlined />}
            className="yellow-500"
          >
            Buy Ticket
          </Button>
        </div>
        <img src={imageRight} className="h-20" alt="icon" />
      </div>
    </div>
  </div>
);

// not possible to query using date
// https://github.com/ReactFinland/graphql-api/blob/master/server/schema/Conference.ts#L97

const GetConferences = gql`
  {
    conferences {
      id
      year
      workshops {
        begin
        end
        day
        title
      }
    }
  }
`;

const LandingCalendar = () => {
  // const { loading, data } = useQuery(GetConferences, {
  //   variables: { yearInput: '2022' },
  // });
  const { loading, data } = useQuery(GetConferences);
  return loading ? (
    <CustomLoader />
  ) : (
    <div className="h-screen">
      <div className="p-12">
        <div className="p-12">
          <div className={styles.calendarTitle}>Event Schedule</div>
          <div className={styles.calendarSubTitle}>Lorem uis diam turpis quam id fermentum.In quis diam turpis quam id fermentum.</div>
        </div>
        <div className="p-12">
          <CustomCalendar calendarData={data} />
        </div>
      </div>
    </div>
  );
};

const Landing = () => (
  <>
    <LandingStatic />
    <LandingCalendar />
  </>
);

export { Landing };
