// app/(tabs)/index.tsx

import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>📝</Text>
      <Text style={styles.title}>MINI NOTES</Text>
      <Text style={styles.subtitle}>Capture your thoughts instantly.</Text>

      {/* FIXED ROUTE */}
      <Link href="/tasks/notes" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View My Notes</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#121212",
  },
  emoji: { fontSize: 80, marginBottom: 10 },
  title: { fontSize: 32, fontWeight: "bold", color: "#fff" },
  subtitle: { fontSize: 16, color: "#888", marginBottom: 40 },
  button: {
    backgroundColor: "#BB86FC",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: { color: "#000", fontWeight: "bold", fontSize: 18 },
});
