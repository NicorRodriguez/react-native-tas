import React, { useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  Button,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Definimos el tipo de las imágenes
type ImageItem = {
  id: string;
  uri: string;
  description: string;
};

// Lista de imágenes de ejemplo
const images: ImageItem[] = [
  {
    id: "1",
    uri: "https://m.media-amazon.com/images/I/61Rx9tHudUL._SL1500_.jpg",
    description: "Descripción de la imagen 1",
  },
  {
    id: "2",
    uri: "https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=960",
    description: "Descripción de la imagen 2",
  },
  {
    id: "3",
    uri: "https://storage.googleapis.com/pod_public/1300/173321.jpg",
    description: "Descripción de la imagen 3",
  },
  // Añadir más imágenes aquí
];

export default function ImageTab() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList<ImageItem>>(null);

  // Función para cambiar a la siguiente imagen
  const nextImage = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(nextIndex);
    flatListRef.current?.scrollToIndex({ animated: true, index: nextIndex });
  };

  return (
    <SafeAreaView style={styles.SafeArea}>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={images}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.uri }}
                style={styles.image}
                resizeMode="cover"
              />
              <Text style={styles.description}>{item.description}</Text>
            </View>
          )}
          onMomentumScrollEnd={(event) => {
            const index = Math.floor(
              event.nativeEvent.contentOffset.x / Dimensions.get("window").width
            );
            setCurrentIndex(index);
          }}
        />
        <Button title="Cambiar Imagen" onPress={nextImage} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: Dimensions.get("window").width - 40,
    marginHorizontal: 20,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});
