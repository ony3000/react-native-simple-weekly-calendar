import { useState } from 'react';
import { WeeklyCalendar } from 'react-native-simple-weekly-calendar';

export function CalendarWithInitialDate() {
  const [selectedDate, setSelectedDate] = useState('2025-08-01');

  return (
    <WeeklyCalendar
      initialDate="2025-07-31"
      selectedDate={selectedDate}
      onDayPress={setSelectedDate}
    />
  );
}
