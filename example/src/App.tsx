import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CalendarWithCustomComponents } from './use-cases/CalendarWithCustomComponents';
import { CalendarWithInitialDate } from './use-cases/CalendarWithInitialDate';
import { CalendarWithMarkedDates } from './use-cases/CalendarWithMarkedDates';
import { DefaultCalendar } from './use-cases/DefaultCalendar';
import { ThemedCalendar } from './use-cases/ThemedCalendar';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.calendarSection}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Default Calendar</Text>
          </View>
          <DefaultCalendar />
        </View>
        <View style={styles.calendarSection}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Calendar with initial date</Text>
          </View>
          <CalendarWithInitialDate />
        </View>
        <View style={styles.calendarSection}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Calendar with marked dates</Text>
          </View>
          <CalendarWithMarkedDates />
        </View>
        <View style={styles.calendarSection}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Themed Calendar</Text>
          </View>
          <ThemedCalendar />
        </View>
        <View style={styles.calendarSection}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Calendar with custom components</Text>
          </View>
          <CalendarWithCustomComponents />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  calendarSection: {
    paddingVertical: 16,
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 4,
  },
});
