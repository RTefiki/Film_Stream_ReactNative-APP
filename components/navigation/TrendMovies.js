import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { imageOriginal } from "../../api/moviedb";

const { width, height } = Dimensions.get("window");
const SPACING = 5;
const BORDER_RADIUS = 20;



const TrendMovies = ({ title, data }) => {
  const navigation = useNavigation();
  const handelClick = (item) => {
    try {
      navigation.navigate("Movie", item);
    } catch (error) {
      console.error("Error navigating:", error);
    }
  };

  return (
    <View style={{ width }}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.container}>
        <FlatList
          data={data}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          decelerationRate="fast"
          bounces={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <RenderItem
              item={item}
              width={width}
              height={height}
              handelClick={handelClick}
            />
          )}
          skuderWidth={width}
          itemWidth={width * 0.62}
        />
      </View>
    </View>
  );
};

const RenderItem = ({ item, width, height, handelClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handelClick(item)}>
      <View style={styles.movieContainer}>
        <Image
          source={{ uri: imageOriginal(item.poster_path) }}
          style={{
            width: width * 0.8,
            height: height * 0.55,
            borderRadius: 10,
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginTop: 4,
    marginHorizontal: SPACING * 3,
    marginBottom:20
  },
  movieContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    borderRadius: BORDER_RADIUS + SPACING * 2,
  },
  text: {
    marginTop: 4,
    color: "white",
    paddingLeft: 15,
    fontSize: 18,
  },
});

export default TrendMovies;
