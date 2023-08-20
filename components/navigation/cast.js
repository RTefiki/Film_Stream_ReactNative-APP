import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { imageOriginal} from "../../api/moviedb";




const { width, height } = Dimensions.get("window");


const Cast = ({ cast, navigation }) => {
  return (
    <View style={{ marginTop: 6 }}>
      <Text style={styles.text}>Top Cast</Text>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast && cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{ marginRight: 10 }}
                onPress={() => navigation.navigate("Person", person)}
              >
                 <Image
                  source={{uri :imageOriginal(person.profile_path)}}
                  style={{
                    width: width * 0.4,
                    height: height * 0.2,
                    borderRadius: 100,
                    marginTop: 10
                  }}
                /> 
                <Text style={styles.namesFilms}>
                  {person.character && person.character.length > 15
                    ? person.character.slice(0, 15) + "..."
                    : person.character}
                </Text>
                <Text style={styles.artistNames}>
                  {person.name && person?.name.length > 15
                    ? person.name.slice(0, 15) + "..."
                    : person.name}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default Cast;

const styles = StyleSheet.create({
  text: {
     color: "white",
   marginLeft: 15, 
   marginTop: 25, 
   fontSize: 17 
  },
  namesFilms: {
    color: "white",
    marginTop: 15,
    marginLeft: 15,
    fontSize: 15,
    textAlign: "center"
  },
  artistNames: {
    color: "white",
    marginTop: 4,
    marginLeft: 15,
    fontSize: 15,
    marginBottom: 40,
    textAlign: "center"
  },
});
