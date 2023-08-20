import { StyleSheet, Text, View,Dimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';

const { width, height } = Dimensions.get("window");

const Loading = () => {
  return (
    <View style={styles.container}>
       <Progress.CircleSnail 
       size={160} 
       color={['red', 'green', 'blue']}
       
       thickness={12}
       />
       

    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
     container:{
          height, 
          width, 
          position: "absolute", 
          flexDirection:"row", 
          alignItems:"center",
          justifyContent:"center"
     }
})