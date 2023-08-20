import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/navigation/loading";
import { fetchSearchMovies, imageOriginal,imageMoviDefault } from "../api/moviedb";
const { width, height } = Dimensions.get("window");

const SearchScreen = () => {
  const navigation = useNavigation();
  const [result, setResult] = React.useState([]);
  const [loading, setLoading] = React.useState(false)

  

  useEffect(() => {
    handelSearch()
    setLoading(false)
  },[])

  

  const handelSearch = (value) => {
    if (value && value.length > 2) {
      setLoading(true);
      fetchSearchMovies({
        query: value,
        include_adult: false,
        page: 1,
        language: "en-US", 
      }).then((data) => {
        setLoading(false);
        if (data && data.results) {
          setResult(data.results);
        }
      });
    } else {
      setLoading(false);
      setResult([]);
    }
  };
  
  return (
    <SafeAreaView style={styles.area}>
      <ScrollView style={{ marginBottom: 40 }}>
        <View style={styles.container}>
          <TextInput 
            onChangeText={handelSearch}
            style={styles.input}
            placeholder="Search"
            placeholderTextColor={"white"}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 10, borderRadius: 50, backgroundColor: "black" }}
          >
            <XMarkIcon size={30} color={"white"} />
          </TouchableOpacity>
        </View>

       {loading? <Loading /> :
       
        result.length > 0 ? (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 5, marginRight:10}}
            style={styles.resultContainer}
          >
            <Text style={styles.resultText}> Result ({result.length})</Text>
            <View style={styles.containerMovies}>
            {result.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push("Movie", item)}
                >
                  <View style={styles.flexContainer}>
                    <Image
                      source={{uri: imageOriginal(item.poster_path)}}
                      style={styles.movieImage}
                    />
                    <Text style={styles.filmName}>
                      {item.title.length > 15? item.title.slice(0, 15) + '...' : item.title}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
            </View>
          </ScrollView>
        ) : (
          <View style={styles.emptyFilm}>
            <Image
              source={require("../assets/empty.png")}
              style={{
                ...styles.emptyFilmImage,
                width: width * 1,
                height: height * 0.5,
              }}
            />
            <Text style={styles.filmEmptyText}>Film not found</Text>
          </View>
        )}
       
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: "black",
    paddingBottom: 20,
  },
  container: {
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    padding: 5,
    marginTop: 15,
    flexWrap: 'wrap',
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 50,
    backgroundColor: "gray",
    alignItems: "center",
  },
  input: {
    padding: 5,
    fontSize: 20,
    borderWidth: 0,
    borderColor: "transparent",
    width: 250,
    borderRadius: 50,
    marginLeft: 10,
  },
  resultContainer: {
    marginLeft: 15,
    marginTop: 5,
  },
  resultText: {
    fontSize: 15,
    color: "white",
  },
  containerMovies: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },flexContainer:{
    flexContainer: {
      width: width  * 0.6,
      height: height * 0.35,
      marginBottom: 10,
      marginLeft: 5,
      marginRight: 5,
    },
  },
  movieImage: {
    width: (width - 30) * 0.5 - 10,
    height: height * 0.3,
    borderRadius: 10,
    marginTop:20
  },
  filmName: {
    textAlign: 'center',
    fontSize: 17,
    marginTop: 5,
    color: "gray",
  },
  rowContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  emptyFilmImage: {
    display: "flex",
    alignItems: "center",
    borderRadius: 15,
  },
  filmEmptyText: {
    position: "absolute",
    top: "27%",
    left: "32%",
    color: "red",
    fontWeight: "bold",
    fontSize: 20
  },
});