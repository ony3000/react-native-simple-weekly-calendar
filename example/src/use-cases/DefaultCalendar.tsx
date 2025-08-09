import dayjs from 'dayjs';
import { useState } from 'react';
import { WeeklyCalendar } from 'react-native-simple-weekly-calendar';

export function DefaultCalendar() {
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

  return <WeeklyCalendar selectedDate={selectedDate} onDayPress={setSelectedDate} />;
}
