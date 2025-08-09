/* eslint-disable react-native/no-inline-styles, react/no-unstable-nested-components */

import Ionicons from '@expo/vector-icons/Ionicons';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Text, View } from 'react-native';
import { WeeklyCalendar } from 'react-native-simple-weekly-calendar';

const dayOfWeekNameDict: Record<string, string> = {
  Sun: '일',
  Mon: '월',
  Tue: '화',
  Wed: '수',
  Thu: '목',
  Fri: '금',
  Sat: '토',
};

export function CalendarWithCustomComponents() {
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));

  return (
    <WeeklyCalendar
      theme={{
        prevTextColor: 'orange',
        nextTextColor: 'orange',
        dayHeaderTextColor: '#888888',
      }}
      selectedDate={selectedDate}
      onDayPress={setSelectedDate}
      monthComponent={({ theme, weekFirstDate, weekLastDate }) => {
        const weekFirstDayObject = dayjs(weekFirstDate);
        const weekLastDayObject = dayjs(weekLastDate);

        return (
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 16,
              fontFamily: 'System',
              fontWeight: 300,
              margin: 10,
              color: theme.monthTextColor,
            }}
          >
            {weekFirstDayObject.format('YYYY년 M월')}
            {!weekFirstDayObject.isSame(weekLastDayObject, 'month') &&
              ` / ${weekLastDayObject.format('M월')}`}
          </Text>
        );
      }}
      prevComponent={({ theme }) => (
        <View style={{ padding: 10 }}>
          <Ionicons name="chevron-back" size={20} color={theme.prevTextColor} />
        </View>
      )}
      nextComponent={({ theme }) => (
        <View style={{ padding: 10 }}>
          <Ionicons name="chevron-forward" size={20} color={theme.nextTextColor} />
        </View>
      )}
      dayHeaderComponent={({ dayOfWeek, theme }) => (
        <View style={{ width: 32 }}>
          <Text
            style={{
              fontSize: 13,
              textAlign: 'center',
              color: theme.dayHeaderTextColor,
            }}
          >
            {dayOfWeekNameDict[dayOfWeek]}
          </Text>
        </View>
      )}
    />
  );
}
