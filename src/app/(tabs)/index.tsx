import useScreenHeight from '@/hooks/useScreenHeight';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useHeaderHeight } from '@react-navigation/elements';
import 'dayjs/locale/ru';
import { useColorScheme } from 'nativewind';
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Calendar, EventRenderer, PartialTheme } from "react-native-big-calendar";

const HomeScreen = () => {
  const { colorScheme } = useColorScheme();
  const screenHeight = useScreenHeight();

  const calendarHeight =        // Подсчет высоты календаря
    screenHeight                // Высота всего экрана
    - useBottomTabBarHeight()   // Высота панели вкладок
    - useHeaderHeight()         // Высота заголовка экрана
    + 46;                       // Константа для корректировки высоты календаря

  const [events] = useState([
    {
      id: 1,
      title: "Евгений Аврамов",
      start: new Date(2025, 11, 10, 6, 30),
      end: new Date(2025, 11, 10, 8, 0),
      color: "#4caf50",
    },
    {
      id: 2,
      title: "Никита Белянин",
      start: new Date(2025, 11, 10, 8, 0),
      end: new Date(2025, 11, 10, 9, 30),
      color: "#4caf50",
    },
    {
      id: 3,
      title: "Евгений Аврамов",
      start: new Date(2025, 11, 10, 9, 30),
      end: new Date(2025, 11, 10, 11, 0),
      color: "#4caf50",
    },
    {
      id: 4,
      title: "Никита Белянин",
      start: new Date(2025, 11, 10, 11, 0),
      end: new Date(2025, 11, 10, 12, 30),
      color: "#4caf50",
    },
    {
      id: 5,
      title: "Евгений Аврамов",
      start: new Date(2025, 11, 10, 12, 30),
      end: new Date(2025, 11, 10, 14, 0),
      color: "#4caf50",
    },
    {
      id: 6,
      title: "Никита Белянин",
      start: new Date(2025, 11, 10, 14, 0),
      end: new Date(2025, 11, 10, 15, 30),
      color: "#4caf50",
    },
    {
      id: 7,
      title: "Никита Белянин",
      start: new Date(2025, 11, 10, 15, 30),
      end: new Date(2025, 11, 10, 17, 0),
      color: "#4caf50",
    },
    {
      id: 8,
      title: "Никита Белянин",
      start: new Date(2025, 11, 10, 17, 0),
      end: new Date(2025, 11, 10, 18, 30),
      color: "#4caf50",
    },
    {
      id: 9,
      title: "Никита Белянин",
      start: new Date(2025, 11, 10, 18, 30),
      end: new Date(2025, 11, 10, 20, 0),
      color: "#4caf50",
    },
    {
      id: 10,
      title: "Никита Белянин",
      start: new Date(2025, 11, 9, 18, 30),
      end: new Date(2025, 11, 9, 20, 0),
      color: "#ff4d00ff",
    },
  ]);

  const themes: Record<string, PartialTheme> = {
    default: {},
    dark: {
      palette: {
        primary: {
          main: '#6185d0',
          contrastText: '#000',
        },
        gray: {
          '100': '#333',
          '200': '#666',
          '300': '#888',
          '500': '#aaa',
          '800': '#ccc',
        },
      },
    },
  } as const

  const renderEvent: EventRenderer = (event, touchableOpacityProps) => (
    <TouchableOpacity {...touchableOpacityProps} key={touchableOpacityProps.key}>
      <View className='flex-1 justify-center'>
        <Text className='text-xs color-white'>
          {event.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Calendar
      locale="ru"
      theme={themes[colorScheme ?? 'light']}
      mode="3days"
      events={events}
      height={calendarHeight}
      eventCellStyle={(event) => ({
        backgroundColor: event.start <= new Date() && event.end >= new Date() ? '#06cdecff' : event.color,
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        borderTopWidth: 1,
        borderColor: "#000",
      })}
      renderEvent={renderEvent}
      onPressEvent={(e) => {
        console.log("Нажали на событие:", e);
      }}
      onPressCell={(date) => {
        console.log("Свободное время:", date);
      }}
    />
  );
}

export default HomeScreen;