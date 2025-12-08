import 'dayjs/locale/ru';
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Calendar, EventRenderer } from "react-native-big-calendar";


export default function Tab() {
  const [events] = useState([
    {
      id: 1,
      title: "Евгений Аврамов",
      start: new Date(2025, 11, 8, 6, 30),
      end: new Date(2025, 11, 8, 8, 0),
      color: "#4caf50",
    },
    {
      id: 2,
      title: "Никита Белянин",
      start: new Date(2025, 11, 8, 8, 0),
      end: new Date(2025, 11, 8, 9, 30),
      color: "#4caf50",
    },
    {
      id: 3,
      title: "Евгений Аврамов",
      start: new Date(2025, 11, 8, 9, 30),
      end: new Date(2025, 11, 8, 11, 0),
      color: "#4caf50",
    },
    {
      id: 4,
      title: "Никита Белянин",
      start: new Date(2025, 11, 8, 11, 0),
      end: new Date(2025, 11, 8, 12, 30),
      color: "#4caf50",
    },
    {
      id: 5,
      title: "Евгений Аврамов",
      start: new Date(2025, 11, 8, 12, 30),
      end: new Date(2025, 11, 8, 14, 0),
      color: "#4caf50",
    },
    {
      id: 6,
      title: "Никита Белянин",
      start: new Date(2025, 11, 8, 14, 0),
      end: new Date(2025, 11, 8, 15, 30),
      color: "#4caf50",
    },
    {
      id: 7,
      title: "Никита Белянин",
      start: new Date(2025, 11, 8, 15, 30),
      end: new Date(2025, 11, 8, 17, 0),
      color: "#4caf50",
    },
    {
      id: 8,
      title: "Никита Белянин",
      start: new Date(2025, 11, 8, 17, 0),
      end: new Date(2025, 11, 8, 18, 30),
      color: "#4caf50",
    },
    {
      id: 9,
      title: "Никита Белянин",
      start: new Date(2025, 11, 8, 18, 30),
      end: new Date(2025, 11, 8, 20, 0),
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

  const renderEvent: EventRenderer = (event, touchableOpacityProps) => (
    <TouchableOpacity {...touchableOpacityProps}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ fontSize: 12, color: "#fff" }}>
          {event.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <Calendar
        locale="ru"
        mode="3days"
        events={events}
        height={700}
        hourRowHeight={60}
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
    </View>
  );
}
