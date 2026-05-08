import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { db, Note } from "./_data";

export default function NotesList() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = useCallback(() => {
    const allRows = db.getAllSync<Note>("SELECT * FROM notes ORDER BY id DESC");
    setNotes(allRows);
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchNotes();
    }, [fetchNotes]),
  );

  const handleDelete = (id: string) => {
    // Re-added the Alert confirmation here
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel", // This keeps the note safe
        },
        {
          text: "Delete",
          style: "destructive", // Shows red on iOS
          onPress: () => {
            try {
              db.runSync("DELETE FROM notes WHERE id = ?", [id]);
              fetchNotes(); // Refresh list only after successful delete
            } catch (error) {
              console.error("Delete Error:", error);
              Alert.alert("Error", "Could not delete the task.");
            }
          },
        },
      ],
    );
  };

  const renderItem: ListRenderItem<Note> = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.noteTitle}>{item.title}</Text>
      <View style={styles.row}>
        <Text style={styles.categoryTag}>{item.category}</Text>
        <Text style={styles.noteSnippet} numberOfLines={1}>
          {item.detail}
        </Text>
      </View>
      <Text style={styles.statusText}>{item.status}</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() =>
            router.push({ pathname: "/details", params: { id: item.id } })
          }
        >
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id.toString())}
        >
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 20, flexGrow: 1 }}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>NO TASK YET</Text>
          </View>
        }
      />
      <TouchableOpacity style={styles.fab} onPress={() => router.push("/add")}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  card: {
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333",
  },
  noteTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  row: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  categoryTag: {
    backgroundColor: "#333",
    color: "#BB86FC",
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 10,
  },
  noteSnippet: { color: "#aaa", fontSize: 14, flex: 1 },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 15,
  },
  buttonRow: { flexDirection: "row", gap: 10 },
  viewButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: "#CF6679",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { color: "#BB86FC", fontSize: 20, fontWeight: "bold" },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#03DAC6",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  fabText: { fontSize: 30, color: "#000" },
});
