/* eslint-disable react-native/no-inline-styles */

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Fragment, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

dayjs.extend(customParseFormat);

const ymdFormat = 'YYYY-MM-DD';

const baseDayObject = dayjs();

const centerItemIndex = 1;

type MarkedDayTheme = {
  dotColor?: ViewStyle['backgroundColor'];
  selectedDotColor?: ViewStyle['backgroundColor'];
};

type MarkedDayProps = { date: string } & MarkedDayTheme;

type WeeklyCalendarTheme = {
  calendarBackgroundColor?: ViewStyle['backgroundColor'];
  monthTextColor?: TextStyle['color'];
  prevTextColor?: TextStyle['color'];
  nextTextColor?: TextStyle['color'];
  dayHeaderTextColor?: TextStyle['color'];
  dayBackgroundColor?: ViewStyle['backgroundColor'];
  dayBorderColor?: ViewStyle['borderColor'];
  dayTextColor?: TextStyle['color'];
  todayBackgroundColor?: ViewStyle['backgroundColor'];
  todayBorderColor?: ViewStyle['borderColor'];
  todayTextColor?: TextStyle['color'];
  selectedDayBackgroundColor?: ViewStyle['backgroundColor'];
  selectedDayBorderColor?: ViewStyle['borderColor'];
  selectedDayTextColor?: TextStyle['color'];
  dotColor?: ViewStyle['backgroundColor'];
  selectedDotColor?: ViewStyle['backgroundColor'];
};

const defaultTheme: Required<WeeklyCalendarTheme> = {
  calendarBackgroundColor: '#ffffff',
  monthTextColor: '#000000',
  prevTextColor: '#000000',
  nextTextColor: '#000000',
  dayHeaderTextColor: '#000000',
  dayBackgroundColor: 'transparent',
  dayBorderColor: 'transparent',
  dayTextColor: '#000000',
  todayBackgroundColor: 'transparent',
  todayBorderColor: '#000000',
  todayTextColor: '#000000',
  selectedDayBackgroundColor: '#000000',
  selectedDayBorderColor: '#000000',
  selectedDayTextColor: '#ffffff',
  dotColor: '#000000',
  selectedDotColor: '#ffffff',
};

type MonthComponentProps = {
  theme: Required<WeeklyCalendarTheme>;
  weekFirstDate: string;
  weekLastDate: string;
};

function MonthComponent({ theme, weekFirstDate }: MonthComponentProps) {
  const weekFirstDayObject = dayjs(weekFirstDate, ymdFormat);

  return (
    <Text
      style={{
        fontSize: 16,
        fontWeight: 300,
        marginVertical: 10,
        color: theme.monthTextColor,
      }}
    >
      {weekFirstDayObject.format('MMM YYYY')}
    </Text>
  );
}

type PrevComponentProps = {
  theme: Required<WeeklyCalendarTheme>;
};

function PrevComponent({ theme }: PrevComponentProps) {
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ color: theme.prevTextColor }}>prev</Text>
    </View>
  );
}

type NextComponentProps = {
  theme: Required<WeeklyCalendarTheme>;
};

function NextComponent({ theme }: NextComponentProps) {
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ color: theme.nextTextColor }}>next</Text>
    </View>
  );
}

type DayHeaderComponentProps = {
  dayOfWeek: string;
  theme: Required<WeeklyCalendarTheme>;
};

function DayHeaderComponent({ dayOfWeek, theme }: DayHeaderComponentProps) {
  return (
    <View style={{ width: 32 }}>
      <Text
        style={{
          fontSize: 13,
          textAlign: 'center',
          color: theme.dayHeaderTextColor,
        }}
      >
        {dayOfWeek}
      </Text>
    </View>
  );
}

type DayComponentProps = {
  date: string;
  isSelected: boolean;
  isToday: boolean;
  markedDayTheme?: MarkedDayTheme;
  theme: Required<WeeklyCalendarTheme>;
};

function DayComponent({ date, isSelected, isToday, markedDayTheme, theme }: DayComponentProps) {
  const dayObject = dayjs(date);

  return (
    <View
      style={[
        {
          width: 32,
          height: 32,
          alignItems: 'center',
          backgroundColor: theme.dayBackgroundColor,
          borderColor: theme.dayBorderColor,
          borderRadius: 16,
          borderWidth: 1,
        },
        isToday
          ? {
              backgroundColor: theme.todayBackgroundColor,
              borderColor: theme.todayBorderColor,
            }
          : undefined,
        isSelected
          ? {
              backgroundColor: theme.selectedDayBackgroundColor,
              borderColor: theme.selectedDayBorderColor,
            }
          : undefined,
      ]}
    >
      <Text
        style={[
          {
            fontSize: 16,
            fontWeight: 300,
            marginTop: 5,
            color: theme.dayTextColor,
          },
          isToday
            ? {
                color: theme.todayTextColor,
              }
            : undefined,
          isSelected
            ? {
                color: theme.selectedDayTextColor,
              }
            : undefined,
        ]}
      >
        {dayObject.format('D')}
      </Text>
      {markedDayTheme !== undefined && (
        <View
          style={[
            {
              width: 4,
              height: 4,
              borderRadius: 2,
              margin: 1,
              backgroundColor: markedDayTheme.dotColor ?? theme.dotColor,
            },
            isSelected
              ? {
                  backgroundColor: markedDayTheme.selectedDotColor ?? theme.selectedDotColor,
                }
              : undefined,
          ]}
        />
      )}
    </View>
  );
}

export type WeeklyCalendarProps = {
  dayComponent?: (props: DayComponentProps) => ReactNode;
  dayHeaderComponent?: (props: DayHeaderComponentProps) => ReactNode;
  initialDate?: string;
  markedDays?: MarkedDayProps[];
  monthComponent?: (props: MonthComponentProps) => ReactNode;
  nextComponent?: (props: NextComponentProps) => ReactNode;
  onDayPress?: (date: string) => void;
  prevComponent?: (props: PrevComponentProps) => ReactNode;
  selectedDate?: string;
  theme?: WeeklyCalendarTheme;
};

export function WeeklyCalendar({
  dayComponent,
  dayHeaderComponent,
  initialDate,
  markedDays: markedDayProps = [],
  monthComponent,
  nextComponent,
  onDayPress,
  prevComponent,
  selectedDate,
  theme,
}: WeeklyCalendarProps) {
  const { width: windowWidth } = useWindowDimensions();

  const flatListRef = useRef<FlatList<string> | null>(null);
  const [weekOffset, setWeekOffset] = useState(0);
  const refinedBaseDayObject = useMemo(() => {
    const maybeInitialDayObject = dayjs(initialDate, ymdFormat);

    return maybeInitialDayObject.isValid() ? maybeInitialDayObject : baseDayObject;
  }, [initialDate]);
  const refinedMarkedDayThemeDict = useMemo(() => {
    const dict: Record<string, MarkedDayTheme | undefined> = {};

    markedDayProps.forEach(({ date, ...themeProps }) => {
      const maybeDayObject = dayjs(date, ymdFormat);

      if (maybeDayObject.isValid() && dict[date] === undefined) {
        dict[date] = themeProps;
      }
    });

    return dict;
  }, [markedDayProps]);
  const refinedTheme = useMemo(() => {
    const themeProps = {
      ...defaultTheme,
    };

    (Object.keys(themeProps) as (keyof typeof themeProps)[]).forEach((key) => {
      if (theme?.[key]) {
        themeProps[key] = theme[key];
      }
    });

    return themeProps;
  }, [theme]);

  const todayDate = dayjs().format(ymdFormat);
  const visibleWeekFirstDayObject = refinedBaseDayObject.add(weekOffset, 'week').startOf('week');
  const visibleWeekLastDayObject = refinedBaseDayObject.add(weekOffset, 'week').endOf('week');

  const monthComponentProps: MonthComponentProps = {
    theme: refinedTheme,
    weekFirstDate: visibleWeekFirstDayObject.format(ymdFormat),
    weekLastDate: visibleWeekLastDayObject.format(ymdFormat),
  };
  const prevComponentProps: PrevComponentProps = {
    theme: refinedTheme,
  };
  const nextComponentProps: NextComponentProps = {
    theme: refinedTheme,
  };

  return (
    <View style={{ backgroundColor: refinedTheme.calendarBackgroundColor }}>
      <View style={{ paddingHorizontal: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 6,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setWeekOffset((prevOffset) => prevOffset - 1);
            }}
          >
            {prevComponent ? (
              prevComponent(prevComponentProps)
            ) : (
              <PrevComponent {...prevComponentProps} />
            )}
          </TouchableOpacity>
          {monthComponent ? (
            monthComponent(monthComponentProps)
          ) : (
            <MonthComponent {...monthComponentProps} />
          )}
          <TouchableOpacity
            onPress={() => {
              setWeekOffset((prevOffset) => prevOffset + 1);
            }}
          >
            {nextComponent ? (
              nextComponent(nextComponentProps)
            ) : (
              <NextComponent {...nextComponentProps} />
            )}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 6 }}>
          {[...Array(7)].map((_, dayIndex) => {
            const displayDayObject = visibleWeekFirstDayObject.add(dayIndex, 'day');
            const dayHeaderComponentProps: DayHeaderComponentProps = {
              dayOfWeek: displayDayObject.format('ddd'),
              theme: refinedTheme,
            };

            return (
              <Fragment key={dayIndex}>
                {dayHeaderComponent ? (
                  dayHeaderComponent(dayHeaderComponentProps)
                ) : (
                  <DayHeaderComponent {...dayHeaderComponentProps} />
                )}
              </Fragment>
            );
          })}
        </View>
      </View>
      <ScrollView scrollEnabled={false} style={{ flexShrink: 0 }}>
        <FlatList
          ref={flatListRef}
          data={['left', 'center', 'right']}
          keyExtractor={(value) => value}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 8 }}
          renderItem={({ index: weekIndex }) => {
            const relativeWeekIndex = weekIndex - centerItemIndex;
            const weekFirstDayObject = visibleWeekFirstDayObject.add(relativeWeekIndex, 'week');

            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: windowWidth,
                  paddingHorizontal: 20,
                }}
              >
                {[...Array(7)].map((_, dayIndex) => {
                  const displayDayObject = weekFirstDayObject.add(dayIndex, 'day');
                  const displayDate = displayDayObject.format(ymdFormat);
                  const markedDayTheme = refinedMarkedDayThemeDict[displayDate];
                  const isToday = displayDate === todayDate;
                  const isSelected = displayDate === selectedDate;
                  const dayComponentProps: DayComponentProps = {
                    date: displayDate,
                    isSelected,
                    isToday,
                    markedDayTheme,
                    theme: refinedTheme,
                  };

                  return (
                    <TouchableOpacity
                      key={dayIndex}
                      onPress={() => {
                        onDayPress?.(displayDate);
                      }}
                    >
                      {dayComponent ? (
                        dayComponent(dayComponentProps)
                      ) : (
                        <DayComponent {...dayComponentProps} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          }}
          getItemLayout={(_, index) => ({
            length: windowWidth,
            offset: windowWidth * index,
            index,
          })}
          initialScrollIndex={centerItemIndex}
          onMomentumScrollEnd={(event) => {
            const offsetX = event.nativeEvent.contentOffset.x;
            const index = Math.round(offsetX / windowWidth);
            const delta = index - centerItemIndex;

            if (delta !== 0) {
              setWeekOffset((prevOffset) => prevOffset + delta);
              flatListRef.current?.scrollToIndex({ index: centerItemIndex, animated: false });
            }
          }}
        />
      </ScrollView>
    </View>
  );
}
