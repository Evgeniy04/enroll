import { useContentInsets } from '@/hooks/useContentInsets';
import useScreenHeight from '@/hooks/useScreenHeight';
import 'dayjs/locale/ru';
import { Stack } from 'expo-router';
import { useColorScheme } from 'nativewind';
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Calendar as EventCalendar, EventRenderer, PartialTheme } from "react-native-big-calendar";
import { Event, EVENTS } from './test-store';

export const Home = () => {
  const { colorScheme } = useColorScheme();

  const screenHeight = useScreenHeight();
  const { top: topHeaderHeight, bottom: bottomTabBarHeight} = useContentInsets();
  
  // 46 - константа для корректировки высоты календаря
  const sceneHeight = screenHeight - topHeaderHeight - bottomTabBarHeight + 46;

  const [events] = useState<Event[]>(EVENTS);

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
  };

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
    <>
      <Stack.Screen options={{ title: "Главная" }} />
      <EventCalendar
        locale="ru"
        theme={themes[colorScheme ?? 'light']}
        mode="3days"
        events={events}
        height={sceneHeight}
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
    </>
  );
}
