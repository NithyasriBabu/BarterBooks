/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { DarkTheme, LightTheme } from "../constants/Themes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import { Colors } from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import AddBookScreen from "../screens/AddBookScreen";
import BarCodeScannerScreen from "../screens/BarcodeScannerScreen";
import BookPreviewScreen from "../screens/BookPreviewScreen";
import BookListScreen from "../screens/BookListScreen";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../../types";
import LinkingConfiguration from "./LinkingConfiguration";
import AddToCollectionScreen from "../screens/AddToCollectionScreen";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : LightTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ScanBook"
        component={BarCodeScannerScreen}
        options={{ title: "Scan Your Book", headerBackTitleVisible: true }}
      />
      <Stack.Screen
        name="AddToCollection"
        component={AddToCollectionScreen}
        options={{
          title: "Add Book To Your Collection",
          headerBackTitleVisible: true,
        }}
      />
      <Stack.Screen
        name="BookPreview"
        component={BookPreviewScreen}
        options={{
          title: "Book Preview",
          headerBackTitleVisible: true,
        }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="AddBook"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="BookList"
        component={BookListScreen}
        options={({ navigation }: RootTabScreenProps<"BookList">) => ({
          title: "Book List",
          tabBarIcon: ({ color }) => (
            <TabBarMaterialIcon name="bookshelf" color={color} />
          ),
        })}
      />
      <BottomTab.Screen
        name="AddBook"
        component={AddBookScreen}
        options={({ navigation }: RootTabScreenProps<"AddBook">) => ({
          title: "Add Book",
          tabBarIcon: ({ color }) => (
            <TabBarAwesomeIcon name="book" color={color} />
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.push("ScanBook")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <MaterialCommunityIcons
                name="barcode-scan"
                size={25}
                style={{ marginRight: 15 }}
                color={Colors[colorScheme].text}
              />
            </Pressable>
          ),
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarAwesomeIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

function TabBarMaterialIcon(props: {
  name: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  color: string;
}) {
  return (
    <MaterialCommunityIcons size={30} style={{ marginBottom: -3 }} {...props} />
  );
}
