// @flow

import { Component, Element } from 'react';
import { allDates } from './calendarData';
import range from './lib/range';

function selectedDate(value) {
  const date = (Date.parse(value) && new Date(value)) || new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function startDate({ value }) {
  const date = selectedDate(value);

  return {
    month: date.getMonth() + 1,
    year: date.getFullYear()
  };
}

type Props = { value: string };
type State = { month: number, year: number };

export default class SlimProto<T> extends Component<void, Props & T, State> {
  state = startDate(this.props);

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.value !== nextProps.value) {
      this.setState(startDate(nextProps));
    }
  }

  props: Props & T;

  previousYear = () => {
    this.setState(({ year }) => ({ year: year - 1 }));
  };

  nextYear = () => {
    this.setState(({ year }) => ({ year: year + 1 }));
  };

  previousMonth = () => {
    this.setState(({ month, year }) => {
      if (month === 1) {
        return { month: 12, year: year - 1 };
      }
      return { month: month - 1, year };
    });
  };

  nextMonth = () => {
    this.setState(({ month, year }) => {
      if (month === 12) {
        return { month: 1, year: year + 1 };
      }
      return { month: month + 1, year };
    });
  };

  selected() {
    return selectedDate(this.props.value);
  }

  rows() {
    const { month, year } = this.state;
    const { buckets } = allDates(month, year);
    const rowCount = Math.ceil(buckets.length / 7);

    return range(1, rowCount).map((n) => {
      const start = 7 * (n - 1);

      return {
        columns: buckets.slice(start, start + 7)
      };
    });
  }

  render(): ?Element<*> {
    return null;
  }
}
