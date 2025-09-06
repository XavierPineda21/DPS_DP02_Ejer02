import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, useWindowDimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//JSON
import platillos from "../ejercicio_02/src/tipicos.json";

//Pantalla principal
function HomeScreen({ navigation }) {
  const { width, height } = useWindowDimensions();
  const [numColumns, setNumColumns] = useState(1);

  useEffect(() => {
    if (width > height) {
      setNumColumns(2);
    } else {
      setNumColumns(1);
    }
  }, [width, height]);

  return (
    <View style={styles.container}>
      <FlatList
        data={platillos}
        key={numColumns}
        numColumns={numColumns}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Detalles", { platillo: item })}
          >
            <Image source={{ uri: item.foto }} style={styles.image} />
            <Text style={styles.title}>{item.nombre}</Text>
            <Text style={styles.description}>{item.descripcion}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

//Pantalla de detalles
function DetailScreen({ route }) {
  const { platillo } = route.params;
  return (
    <View style={styles.detailContainer}>
      <Image source={{ uri: platillo.foto }} style={styles.detailImage} />
      <Text style={styles.detailTitle}>{platillo.nombre}</Text>
      <Text style={styles.detailText}>Región: {platillo.region}</Text>
      <Text style={styles.detailText}>Precio: {platillo.precio}</Text>
      <Text style={styles.detailText}>Categoría: {platillo.categoria}</Text>
      <Text style={styles.detailText}>Descripción: {platillo.descripcion}</Text>
      <Text style={styles.ingredientsTitle}>Ingredientes:</Text>
      {platillo.ingredientes.map((ing, index) => (
        <Text key={index} style={styles.ingredient}>- {ing}</Text>
      ))}
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Platillos típicos" component={HomeScreen} />
        <Stack.Screen name="Detalles" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 8,
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 6,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
    textAlign: "center",
  },
  detailContainer: {
    flex: 1,
    padding: 15,
    alignItems: "center",
  },
  detailImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 10,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    marginVertical: 3,
  },
  ingredientsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
  },
  ingredient: {
    fontSize: 16,
    color: "#444",
  },
});
