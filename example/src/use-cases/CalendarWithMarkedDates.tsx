import dayjs from 'dayjs';
import { useState } from 'react';
import { WeeklyCalendar } from 'react-native-simple-weekly-calendar';

const now = dayjs();

export function CalendarWithMarkedDates() {
  const [selectedDate, setSelectedDate] = useState(now.format('YYYY-MM-DD'));

  return (
    <WeeklyCalendar
      markedDays={[
        {
          date: now.add(-4, 'day').format('YYYY-MM-DD'),
          dotColor: 'orange',
        },
        {
          date: now.add(-2, 'day').format('YYYY-MM-DD'),
          dotColor: 'orange',
        },
        {
          date: now.add(2, 'day').format('YYYY-MM-DD'),
          dotColor: 'skyblue',
        },
        {
          date: now.add(4, 'day').format('YYYY-MM-DD'),
          dotColor: 'skyblue',
        },
      ]}
      selectedDate={selectedDate}
      onDayPress={setSelectedDate}
    />
  );
}
