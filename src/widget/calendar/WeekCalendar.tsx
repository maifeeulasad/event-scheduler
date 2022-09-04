import React, { useMemo } from 'react';
import moment, { Moment } from 'moment';

import styles from './WeekCalendar.module.scss';
import { CustomLink } from '../link/CustomLink';

interface IHeaderData {
  day: number;
  weekday: string;
}

interface ICellEntry {
  time: string;
  header: IHeaderData;
  data: IWorkshop[];
}

const CellEntry = ({ time, data, header }: ICellEntry) => {
  const filteredData = data.filter(
    (datum) =>
      (datum.day as Moment).date() === header.day && datum.begin === time,
  );
  return (
    <td>
      {filteredData.map((datum) => (
        <div className={styles.itemWrap}>
          <div className={styles.itemDate}>{(datum.day as Moment).format('DD-MM-yyyy')}</div>
          <div className={styles.item}>
            <CustomLink
              classes={styles.itemLink}
              target={`/conference/${datum.conferenceId}`}
              text={datum.title}
            />
          </div>
        </div>
      ))}
    </td>
  );
};

interface IHourEntry {
  time: string;
  headers: IHeaderData[];
  data: IWorkshop[];
}

const HourEntry = ({ time, headers, data }: IHourEntry) => (
  <tr>
    <td className={styles.cellFirst}>{time}</td>
    {headers.map((header) => (
      <CellEntry data={data} header={header} time={time} />
    ))}
  </tr>
);

interface IWorkshop {
  begin: string;
  end: string;
  day: string | moment.Moment;
  title: string;
  conferenceId?: string;
}

interface IWeekCalendar {
  data: IWorkshop[];
}

const WeekCalendar = ({ data }: IWeekCalendar) => {
  const hours = useMemo(
    () => [...new Set(data.map((datum) => datum.begin))],
    [data],
  );

  const sortedData = useMemo(
    () =>
      data
        .map((datum) => ({ ...datum, day: moment(datum.day, 'YYYY-MM-DD') }))
        .sort((left, right) => (left.day < right.day ? -1 : 1)),
    [data],
  );

  const headers: IHeaderData[] = useMemo(() => {
    const smallestDay = sortedData[0].day.clone();
    const smallestDate = smallestDay.date();
    return [
      ...Array.from({ length: 7 }, (_, i) => ({
        day: i + smallestDate,
        weekday: smallestDay.add(1, 'days').format('dddd'),
      })),
    ];
  }, [sortedData]);

  return (
    <div className={styles.calendar}>
      <table className={styles.offset}>
        <thead>
          <tr>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th className={styles.cellFirst} />
            {headers.map((header) => (
              <th>{`${header.day}, ${header.weekday.substring(0, 3)}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <HourEntry time={hour} headers={headers} data={sortedData} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { WeekCalendar };
