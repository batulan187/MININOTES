import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { db, Note } from "./_data";

export default function AddOrEditNote() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [detail, setDetail] = useState("");
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    if (params.id) {
      const existing = db.getFirstSync<Note>(
        "SELECT * FROM notes WHERE id = ?",
        [params.id],
      );
      if (existing) {
        setTitle(existing.title);
        setCategory(existing.category);
        setDetail(existing.detail);
        setStatus(existing.status || "Pending");
      }
    }
  }, [params.id]);

  const handleSave = () => {
    if (!title.trim() || !category.trim()) {
      Alert.alert("Error", "Title and Category are required!");
      return;
    }

    try {
      if (params.id) {
        db.runSync(
          "UPDATE notes SET title = ?, category = ?, detail = ?, status = ? WHERE id = ?",
          [title, category, detail, status, params.id],
        );
      } else {
        db.runSync(
          "INSERT INTO notes (title, category, detail, status) VALUES (?, ?, ?, ?)",
          [title, category, detail, status],
        );
      }
      router.back();
    } catch (error) {
      Alert.alert(
        "Error",
        "Save failed. Reset your database or check columns.",
      );
    }
  };

  const StatusButton = ({ label }: { label: string }) => (
    <TouchableOpacity
      style={[styles.statusBtn, status === label && styles.statusBtnActive]}
      onPress={() => setStatus(label)}
    >
      <Text
        style={[
          styles.statusBtnText,
          status === label && styles.statusBtnTextActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.screenHeader}>
        {params.id ? "Edit Task" : "Add Task"}
      </Text>

      <Text style={styles.labelPrompt}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Title..."
        placeholderTextColor="#666"
      />

      <Text style={styles.labelPrompt}>Category</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Category..."
        placeholderTextColor="#666"
      />

      <Text style={styles.labelPrompt}>Details</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={detail}
        onChangeText={setDetail}
        placeholder="Details..."
        placeholderTextColor="#666"
        multiline
        numberOfLines={4}
      />

      <Text style={styles.labelPrompt}>Select Status</Text>
      <View style={styles.statusRow}>
        <StatusButton label="Pending" />
        <StatusButton label="Ongoing" />
        <StatusButton label="Finished" />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save Task</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#121212" },
  screenHeader: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  labelPrompt: {
    color: "#888",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
    textTransform: "uppercase",
  },
  input: {
    backgroundColor: "#1E1E1E",
    color: "#fff",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333",
  },
  textArea: { height: 100, textAlignVertical: "top" },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  statusBtn: {
    flex: 1,
    backgroundColor: "#333",
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: "center",
  },
  statusBtnActive: { backgroundColor: "#fff" },
  statusBtnText: { color: "#fff", fontWeight: "bold" },
  statusBtnTextActive: { color: "#000" },
  saveButton: {
    backgroundColor: "#1e1e1e",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
  },
  saveText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
