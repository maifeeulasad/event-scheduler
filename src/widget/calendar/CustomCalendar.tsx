import React, { useMemo } from 'react';

import { WeekCalendar } from './WeekCalendar';

interface IWorkshop {
  begin: string
  end: string
  day: string
  conferenceId?: string
  title: string
}

interface IConference {
  id: string
  year: string
  workshops: IWorkshop[]
}

interface IConferences {
  conferences: IConference[]
}

interface ICustomCalendar {
  calendarData: IConferences;
}

const CustomCalendar = ({ calendarData }: ICustomCalendar) => {
  const data = useMemo(() => {
    const conference2022 = calendarData.conferences.filter((conference) => conference.year === '2022').flat();
    const workshopsWithId: IWorkshop[] = [];
    conference2022.forEach((conference) => {
      conference.workshops.forEach((workshop) => {
        workshopsWithId.push({ ...workshop, conferenceId: conference.id });
      });
    });
    return workshopsWithId;
  }, [calendarData]);

  return <WeekCalendar data={data} />;
};

export { CustomCalendar };
