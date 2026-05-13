import { Stack } from "expo-router";
import { useEffect } from "react";
import { initDatabase } from "../lib/_data";

export default function Layout() {
  useEffect(() => {
    initDatabase();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
