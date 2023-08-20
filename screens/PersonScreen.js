import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import React,{useEffect} from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import MovieDetail from "../components/navigation/MovieDetail";
import Loading from "../components/navigation/loading";
import {fetchPersonDetail, fetchPersonMovies} from "../api/moviedb";
import { useRoute } from "@react-navigation/native";
import { imageOriginal, imageMoviDefault } from "../api/moviedb";

const { width, height } = Dimensions.get("window");

const PersonScreen = () => {
  const { params: item } = useRoute();
  const [favorite, setFavorite] = React.useState(false);
  const [personMovies, setPersonMovies] = React.useState([]);
  const [loading, setLoading] = React.useState(false)
  const [person, setPerson] = React.useState({})
  const navigation = useNavigation();

  const handelPres = () => {
    setFavorite(!favorite);
  };

  useEffect(() => {
    setLoading(true);
    getPersonDetail(item.id)
    getPersonMovies(item.id) 
  },[item])

  const getPersonDetail = async (id) => {
     const data = await fetchPersonDetail(id)
     if(data){
      setPerson(data)
     }
     setLoading(false)
  }
 const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id)
    if(data && data.cast){
     setPersonMovies(data.cast)
    }
    setLoading(false)
 } 
  return (
    <ScrollView style={styles.container}>
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
      {loading? <Loading /> : (
        <View style={styles.person}>
        <View style={styles.personContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: imageOriginal(item?.profile_path)}}
              style={{
                ...styles.movieImage,
                width: width * 0.73,
                height: height * 0.47,
              }}
            />
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.actorNames}>{person.name}</Text>
          <Text style={styles.actorStats}>{person.place_of_birth}</Text>
        </View>
        <View style={styles.actorContainer}>
          <View style={styles.actorInfo}>
            <Text style={styles.actorGender}>Gender</Text>
            <Text style={styles.actorInfoGender}>{person.gender == 1? 'Female' : 'Male'}</Text>
          </View>
          <View style={styles.actorInfo}>
            <Text style={styles.actorGender}>Birthday</Text>
            <Text style={styles.actorInfoGender}>{person.birthday}</Text>
          </View>
          <View style={styles.actorInfo}>
            <Text style={styles.actorGender}>Know for</Text>
            <Text style={styles.actorInfoGender}>{person.known_for_department}</Text>
          </View>
          <View style={[styles.actorInfo, styles.lastActorInfo]}>
            <Text style={styles.actorGender}>Popularity</Text>
            <Text style={styles.actorInfoGender}>{person.popularity}</Text>
          </View>
        </View>
        <View style={styles.biographyContaier}>
          <Text style={styles.titelBiography}>Biography</Text>
          <Text style={styles.textBiography}>
          {person.biography || 'N/A'}
          </Text>
        </View>
      </View>
      )}
      <View style={{marginTop:15}}>
      <MovieDetail
          title="Movies"
          navigation={navigation}
          data={personMovies}
          hideSeeAll={true}
        />
      </View>
      
    </ScrollView>
  );
};

export default PersonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    marginBottom: 50,
    paddingBottom: 50,
  },
  row: {
    marginTop: 10,
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
  personContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  imageContainer: {
    alignItems: "center",
    borderRadius: 100,
    overflow: "hidden",
    borderColor: "white",
    borderWidth: 2,
    shadowRadius: 40,
    shadowColor: "gray",
  },
  actorNames: {
    fontSize: 30,
    color: "white",
    fontWeight: 600,
    textAlign: "center",
  },
  actorStats: {
    fontSize: 15,
    textAlign: "center",
    color: "gray",
  },
  actorContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    justifyContent: "center",
    marginTop: 15,
    padding: 15,
    backgroundColor: "gray",
    borderRadius: 40,
  },
  actorInfo: {
    borderRightWidth: 1,
    borderRightColor: " white",
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: "center",
  },
  actorGender: {
    color: "white",
    fontSize: 15,
    fontWeight: 500,
  },
  actorInfoGender: {
    color: "white",
    fontSize: 13,
  },
  lastActorInfo: {
    borderRightWidth: 0,
  },
  biographyContaier: {
    marginTop: 20,
    marginLeft: 15,
    marginRight: 15,
  },
  titelBiography: {
    fontSize: 15,
    color: "white",
    fontWeight: 400,
  },
  textBiography: {
    marginTop: 8,
    fontSize: 13,
    color: "gray",
  },
});
