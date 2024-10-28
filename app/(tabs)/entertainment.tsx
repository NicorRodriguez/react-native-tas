import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

const API_KEY = "4cb6f12f"; // Reemplaza con tu clave de API de OMDb

export default function Entertainment() {
  const [movieName, setMovieName] = useState<string>("");
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Función para buscar la película
  const searchMovie = async () => {
    if (!movieName.trim()) return;

    setLoading(true);
    setError(null);
    setMovie(null);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?t=${movieName}&apikey=${API_KEY}`
      );
      const data = await response.json();

      if (data.Response === "True") {
        setMovie(data);
      } else {
        setError("Película no encontrada. Intenta con otro nombre.");
      }
    } catch (err) {
      setError("Ocurrió un error al buscar la película.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscador de Películas</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresa el nombre de la película"
        value={movieName}
        onChangeText={(text) => setMovieName(text)}
      />
      <Button title="Buscar" onPress={searchMovie} />

      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}

      {error && <Text style={styles.error}>{error}</Text>}

      {movie && (
        <View style={styles.movieContainer}>
          <Image
            source={{ uri: movie.Poster }}
            style={styles.poster}
            resizeMode="cover"
          />
          <Text style={styles.movieTitle}>{movie.Title}</Text>
          <Text style={styles.moviePlot}>{movie.Plot}</Text>
        </View>
      )}
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
    textAlign: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  loader: {
    marginVertical: 20,
  },
  error: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  movieContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  poster: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  moviePlot: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    paddingHorizontal: 10,
  },
});
