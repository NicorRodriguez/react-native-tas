import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

type Task = {
  id: string;
  text: string;
};

export default function App() {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskCount, setTaskCount] = useState<number>(0); // Estado para el contador de tareas completadas

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: task }]);
      setTask("");
    }
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const incrementCount = () => {
    setTaskCount(taskCount + 1);
  };

  const decrementCount = () => {
    if (taskCount > 0) {
      setTaskCount(taskCount - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tareas</Text>
      <TextInput
        style={styles.input}
        placeholder="Añadir nueva tarea"
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <Button title="Añadir Tarea" onPress={addTask} />

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text style={styles.deleteButton}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Sección del contador */}
      <View style={styles.counterContainer}>
        <Text style={styles.counterTitle}>Tareas Completadas: {taskCount}</Text>
        <View style={styles.counterButtons}>
          <TouchableOpacity
            onPress={incrementCount}
            style={styles.counterButton}
          >
            <Text style={styles.counterButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={decrementCount}
            style={styles.counterButton}
          >
            <Text style={styles.counterButtonText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginBottom: 5,
    borderRadius: 5,
  },
  taskText: {
    fontSize: 16,
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
  },
  counterContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  counterTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  counterButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
  },
  counterButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  counterButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
