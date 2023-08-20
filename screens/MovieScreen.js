import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/navigation/cast";
import MovieDetails from "../components/navigation/MovieDetail";
import Loading from "../components/navigation/loading";
import { imageOriginal } from "../api/moviedb";
import {
  fetchFilmDetails,
  fetchFilmCredits,
  fetchFilmSimilar,
} from "../api/moviedb";

import { useRoute } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");
const android = Platform.OS === "android";

const movieName = "Close the door";

const MovieScreen = () => {
  const [favorite, setFavorite] = React.useState(false);
  const { params: item } = useRoute();
  const [cast, setCast] = React.useState([1]);
  const [similarMovies, setSimilarMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [filma, setFilma] = React.useState({})
  const navigation = useNavigation();

  const handelPres = () => {
    setFavorite(!favorite);
  };

  useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getfilmSimilar(item.id)
  },[item]);

  const getMovieDetails = async (id) => {
    const data = await fetchFilmDetails(id);
    if (data) setFilma(data);
    setLoading(false);
  };

  const getMovieCredits = async (id) => {
    const data =await fetchFilmCredits(id);
    if (data && data.cast ) setCast(data.cast );
    setLoading(false);
  }

  const getfilmSimilar = async (id) => {
    const data =await fetchFilmSimilar(id);
    if (data && data.results ) setSimilarMovies(data.results);
    setLoading(false);
  }

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 30 }}
      style={{ ...styles.container, marginBottom: android ? 3 : 3 }}
    >
      <View style={styles.imageContainer}>
        <SafeAreaView style={styles.row}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.view}
          >
            <ChevronLeftIcon size={25} strokeWidth={2.5} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.heart} onPress={handelPres}>
            <HeartIcon
              size={35}
              strokeWidth={2}
              color={favorite ? "#DB4437" : "white"}
            />
          </TouchableOpacity>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <View>
            <Image
              source={{ uri: imageOriginal(filma?.poster_path)}}
              style={{
                width: width * 1,
                height: height * 0.55,
                borderRadius: 10,
              }}
            />
            <LinearGradient
              colors={["rgba(22,22,22,0)", "rgba(23,23,23, 0)"]}
              style={{
                ...styles.button,
                position: "absolute",
                bottom: 0,
                width: width,
                height: height * 0.4,
              }}
            ></LinearGradient>
          </View>
        )}
        {/*  movie detail */}
        <View style={styles.movieTextContain}>
          {/*  movie titel */}
          <Text style={styles.movieText}>{filma?.title}</Text>

          {/*  status, release, rutine, */}
          {filma?.id ? (
            <Text style={styles.statusText}>
              {filma?.status} ° {filma?.release_date?.split("-")[0]} °{" "}
              {filma?.runtime} min
            </Text>
          ) : null}

          <View style={styles.aktionTextCont}>
            {filma?.genres?.map((genre, index) => {
              return (
                <Text key={index} style={styles.genre}>
                  {genre?.name}
                </Text>
              );
            })}
          </View>

          <Text style={styles.filmText}>{filma?.overview}</Text>
        </View>
        <View style={{ color: "white" }}>
          <Cast cast={cast} navigation={navigation} />
        </View>
        <View> 
           <MovieDetails title="Similar Movies" hideSeeAll={true} data={similarMovies} />
        </View>
      </View>
    </ScrollView>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    marginBottom:60,
    paddingBottom:40
  },
  imageContainer: {
    width: "100%",
    position: "relative",
  },
  row: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
  },
  view: {
    borderRadius: 10,
    padding: 2,
    backgroundColor: "#a39d31",
  },
  heart: {
    marginRight: 10,
  },
  movieTextContain: {
    marginTop: 10,
  },
  movieText: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    fontWeight: 600,
    letterSpacing: 0.125,
  },
  statusText: {
    color: "gray",
    fontSize: 15,
    textAlign: "center",
    fontWeight: 600,
    marginTop: 6,
  },
  aktionTextCont: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
  },
  genre: {
    color: "white",
    flexDirection: "column",
    padding: 4
  },

  filmText: {
    color: "gray",
    fontSize: 14,
    fontWeight: 400,
    marginTop: 6,
    paddingLeft: 15,
    paddingRight: 10,
  },
});
