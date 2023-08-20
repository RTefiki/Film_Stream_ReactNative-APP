import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import TrendMovies from "../components/navigation/TrendMovies";
import MovieDetail from "../components/navigation/MovieDetail";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/navigation/loading";
import { CategoryMovies } from "../components/CategoryMovies";
import {
  fetchTrendingMovies,
  fetchupComingMovies,
  fetchtopRateMovies,
} from "../api/moviedb";
import { TouchableWithoutFeedback } from "react-native-web";

const { width, height } = Dimensions.get("window");

const android = Platform.OS === "android";

const HomeScreen = () => {
  const [trending, setTrending] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const trendingMovie = await fetchTrendingMovies();
      const upComingMovie = await fetchupComingMovies();
      const topRateMovie = await fetchtopRateMovies();

      setTrending(trendingMovie.results);
      setUpComing(upComingMovie.results);
      setTopMovies(topRateMovie.results);
    } catch (error) {
      console.warn("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        width: width * 1,
        height: height * 0.9,
        padding: 5,
        marginBottom: 30,
        paddingBottom: 30,
      }}
    >
      <SafeAreaView style={{ marginBottom: android ? 2 : 3 }}>
        <StatusBar />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 4,
          }}
        >
          <View>
            <CategoryMovies />
          </View>

          <Text style={{ color: "white", fontWeight: "600", fontSize: 30 }}>
            <Text style={{ color: "gold" }}>K</Text>ino{" "}
            <Text style={{ color: "skyblue" }}>S</Text>tream
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView>
          <TrendMovies title={"Popular Movies"} data={trending} />

          <MovieDetail title={"Coming Soon"} data={upComing} />

          <MovieDetail title={"Top Movies"} data={topMovies} />
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;
