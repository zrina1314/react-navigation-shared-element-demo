import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { fetchPokemons, pageSize } from "../api/api";
import type { PokemonListInfo } from "../model/PokemonListInfo";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { SharedElement } from "react-navigation-shared-element";
import { PokemonHero, PokemonText } from "../assets/AssetsUtil";
import FastImage from "@d11/react-native-fast-image";
const { width, height } = Dimensions.get("window");

// List Screen page
export const ListScreen = ({ navigation }) => {
  const [pokemons, setPokemons] = useState<PokemonListInfo[]>([]);

  useEffect(() => {
    fetchPokemons(pageSize, 0).then((list) => {
      setPokemons(list);
    });
  }, []);

  function onEndReach() {
    fetchPokemons(pageSize, pokemons.length);
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View
        style={{
          flex: 0.5,
          height: 200,
          backgroundColor: "transparent",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FastImage
          style={{
            top: 20,
            width: "60%",
            height: "60%",
            zIndex: 1,
            resizeMode: "cover",
            shadowColor: "#171717",
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
            elevation: 5,
          }}
          source={PokemonHero}
        />
        <FastImage
          style={{
            position: "absolute",
            top: 20,
            width: "80%",
            height: "43%",
            resizeMode: "cover",
          }}
          source={PokemonText}
        />
      </View>

      <FlashList
        collapsable={false}
        numColumns={3}
        data={pokemons}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        onEndReached={() => {
          onEndReach();
        }}
        estimatedItemSize={251}
        renderItem={(pokemon, index) => {
          return (
            <Pressable
              key={index}
              onPress={() =>
                navigation.push("Detail", {
                  pokemon: pokemon.item,
                })
              }
              style={[styles.pokemonItem]}
            >
              <SharedElement id={pokemon.item.name}>
                <FastImage
                  source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.item.index}.png`,
                  }}
                  style={styles.pokemonItemImage}
                />
              </SharedElement>

              <View style={styles.pokemonItemInfo}>
                <Text numberOfLines={1} style={styles.pokemonItemName}>
                  {pokemon.item.name}
                </Text>
              </View>
            </Pressable>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 10,
    paddingTop: 40,
    backgroundColor: "#f1f5f9",
  },
  pokemonItem: {
    backgroundColor: "#f8fafc",
    width: width / 3 - 20,
    margin: 5,
    paddingTop: 8,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  pokemonItemImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  pokemonItemInfo: {
    margin: 10,
    marginBottom: 15,
  },
  pokemonItemName: {
    fontSize: 16,
    fontWeight: "500",
    textTransform: "capitalize",
  },
});
