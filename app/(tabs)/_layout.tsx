import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="imageTab"
        options={{
          title: "Image",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "image" : "image-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="entertainment"
        options={{
          title: "Entertainment",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "camera" : "camera"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
