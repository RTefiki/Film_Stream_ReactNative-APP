import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { imageOriginal} from "../../api/moviedb";

const { width, height } = Dimensions.get("window");


const MovieDetail = ({ title, data, hideSeeAll }) => {
  const navigation = useNavigation();
  
  return (
    <View style={styles.contain}>
      <View style={styles.movieContain}>
        <Text style={styles.text}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text style={styles.buttonText}>See All</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Movie Row */}
      <ScrollView
        horizontal={true}
  showsHorizontalScrollIndicator={false}
  contentContainerStyle={{ paddingHorizontal: 15 }}
  style={{ width: "100%", height: height * 0.29 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => navigation.navigate("Movie", item)}
            >
              <View>
                <View>
                  <Image
                    source={{ uri: imageOriginal(item.poster_path)}}
                    style={{
                      ...styles.movieImage,
                      width: width * 0.33,
                      height: height * 0.22,
                    }}
                  />
                </View>
                <Text style={{ ...styles.text, marginLeft: 12 }}>
                {item.title && item.title.length > 14
                ? item.title.slice(0, 14) + "..."
                : item.title}
</Text>

              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default MovieDetail;

const styles = StyleSheet.create({
  text: {
    color: "white",
    marginLeft: 10,
    fontSize: 17
  },
  contain: {
    marginBottom: 35,
    
  },
  movieContain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
  },
  buttonText: {
    color: "yellow",
  },
  movieImage: {
    width: 100,
    height: 150,
    marginTop: 15,
    margin: 10,
    borderRadius: 10
  },
});
