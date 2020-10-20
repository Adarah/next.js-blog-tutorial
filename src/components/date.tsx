import React from 'react';
import { parseISO, format } from 'date-fns';

export default function Date({ dateString }: DateProps): JSX.Element {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>;
}

interface DateProps {
  dateString: string;
}
