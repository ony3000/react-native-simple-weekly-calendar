import dayjs from 'dayjs';
import { useState } from 'react';
import { WeeklyCalendar } from 'react-native-simple-weekly-calendar';

const now = dayjs();

const daisyUIRetroTheme = {
  base100: '#ece3ca',
  baseContent: '#793205',
  primary: '#ff9fa0',
  primaryContent: '#801518',
  accent: '#d08700',
  accentContent: '#793205',
  neutral: '#56524c',
  neutralContent: '#d4d0d1',
};

export function ThemedCalendar() {
  const [selectedDate, setSelectedDate] = useState(now.format('YYYY-MM-DD'));

  return (
    <WeeklyCalendar
      markedDays={[
        {
          date: now.add(-4, 'day').format('YYYY-MM-DD'),
          dotColor: 'orange',
          selectedDotColor: 'cornflowerblue',
        },
        {
          date: now.add(-2, 'day').format('YYYY-MM-DD'),
          dotColor: 'orange',
        },
        {
          date: now.add(2, 'day').format('YYYY-MM-DD'),
        },
        {
          date: now.add(4, 'day').format('YYYY-MM-DD'),
          selectedDotColor: 'cornflowerblue',
        },
      ]}
      theme={{
        calendarBackgroundColor: daisyUIRetroTheme.base100,
        monthTextColor: daisyUIRetroTheme.baseContent,
        prevTextColor: daisyUIRetroTheme.accent,
        nextTextColor: daisyUIRetroTheme.accent,
        dayHeaderTextColor: daisyUIRetroTheme.neutral,
        dayBackgroundColor: 'transparent',
        dayBorderColor: 'transparent',
        dayTextColor: daisyUIRetroTheme.baseContent,
        todayBackgroundColor: 'transparent',
        todayBorderColor: daisyUIRetroTheme.primary,
        todayTextColor: daisyUIRetroTheme.baseContent,
        selectedDayBackgroundColor: daisyUIRetroTheme.primary,
        selectedDayBorderColor: daisyUIRetroTheme.primary,
        selectedDayTextColor: daisyUIRetroTheme.primaryContent,
        dotColor: daisyUIRetroTheme.baseContent,
        selectedDotColor: '#ffffff',
      }}
      selectedDate={selectedDate}
      onDayPress={setSelectedDate}
    />
  );
}
