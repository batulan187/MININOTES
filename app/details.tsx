import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { db, Note } from "./_data";

export default function NoteDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const note = db.getFirstSync<Note>("SELECT * FROM notes WHERE id = ?", [id]);

  if (!note)
    return (
      <View style={styles.container}>
        <Text style={{ color: "white" }}>Note not found</Text>
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.category}>{note.category}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{note.status}</Text>
        </View>
      </View>

      <Text style={styles.title}>{note.title}</Text>
      <View style={styles.divider} />
      <Text style={styles.label}>DETAILS</Text>
      <Text style={styles.detail}>
        {note.detail || "No additional details."}
      </Text>

      {/* EDIT BUTTON ADDED BACK */}
      <TouchableOpacity
        style={styles.editButton}
        onPress={() =>
          router.push({ pathname: "/edit", params: { id: note.id } })
        }
      >
        <Text style={styles.editText}>Edit Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#121212" },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  category: { color: "#BB86FC", fontWeight: "bold", fontSize: 16 },
  statusBadge: {
    backgroundColor: "#333",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 10,
  },
  divider: { height: 1, backgroundColor: "#333", marginVertical: 20 },
  label: { color: "#888", fontSize: 12, fontWeight: "bold", marginBottom: 10 },
  detail: { color: "#ccc", fontSize: 18, lineHeight: 28 },
  editButton: {
    backgroundColor: "#333",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: "#444",
  },
  editText: { color: "#fff", fontWeight: "bold" },
});
