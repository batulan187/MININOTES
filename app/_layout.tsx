import { Stack } from "expo-router";
import { useEffect } from "react";
import { initDatabase } from "./_data";

export default function Layout() {
  useEffect(() => {
    initDatabase();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#121212" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        contentStyle: { backgroundColor: "#121212" },
      }}
    />
  );
}
