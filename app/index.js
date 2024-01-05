import { useState } from "react";
import { View, ScrollView, Text, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";
import Popularinternships from "../components/home/popular/Popularjobs";

const Home = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension={20}/>
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension={40} />
          ),
          headerTitle: "  Worker's Plug",
          
          headerTitleStyle: {
            color: COLORS.primary,
            fontWeight: "bold",
            fontSize: SIZES.h3,
            flex: 1,
          },
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
            backgroundColor: COLORS.lightWhite,
          }}
        >
          <Welcome 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleClick={() => {
          if(searchTerm){
            router.push(`/search/${searchTerm}`)

          }
          else{
            alert("Please enter a search term")
          }

}
}
          />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

      export default Home;
