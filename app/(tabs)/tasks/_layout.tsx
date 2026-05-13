import { Stack } from "expo-router";

export default function TasksLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#000",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="notes"
        options={{
          title: "Notes List",
        }}
      />
      <Stack.Screen
        name="add"
        options={{
          title: "Add Notes",
        }}
      />
      <Stack.Screen
        name="edit"
        options={{
          title: "Edit Details",
        }}
      />
      <Stack.Screen
        name="details"
        options={{
          title: "Notes Details",
        }}
      />
    </Stack>
  );
}
