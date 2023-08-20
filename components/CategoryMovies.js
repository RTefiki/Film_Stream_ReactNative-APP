import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { Bars3CenterLeftIcon } from "react-native-heroicons/outline";

const { width, height } = Dimensions.get("window");

 export const CategoryMovies = () => {
  const [showCategories, setShowCategories] = useState(false);

  const handleCategoriesPress = () => {
    setShowCategories(true);
  };

  const handleCloseCategories = () => {
    setShowCategories(false);
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCategories}
        onRequestClose={handleCloseCategories}
      >
        
        <View style={styles.modalContainer}>
          
          <Text style={styles.categoryText}>Action</Text>
          <Text style={styles.categoryText}>Comedy</Text>
          <Text style={styles.categoryText}>Thriller</Text>
          <Text style={styles.categoryText}>Drame</Text>
          <Text style={styles.categoryText}>Fantasy</Text>
          <Text style={styles.categoryText}>Romance</Text>

          <TouchableOpacity
            onPress={handleCloseCategories}
            style={styles.closeButton}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <TouchableOpacity onPress={handleCategoriesPress}>
        <Bars3CenterLeftIcon size={30} color="white" />
      </TouchableOpacity>
      
      {/* Resti i kodit për komponentët e tjerë */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    color: "white",
    fontSize: 25,
    marginVertical: 10,
  },
  closeButton: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CategoryMovies;