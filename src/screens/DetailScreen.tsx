import { useEffect, useRef, useState } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SharedElement } from "react-navigation-shared-element";
import Icon from "react-native-vector-icons/AntDesign";
import { typeIcons } from "../assets/AssetsUtil";
import type { PokeInfo } from "../model/PokemonDetailInfo";
import FastImage from "@d11/react-native-fast-image";

export const DetailScreen = ({ route, navigation }) => {
  const { pokemon } = route.params;
  const safeInsets = useSafeAreaInsets();
  const opacity = useRef(new Animated.Value(0)).current;

  const [pokeInfo, setPokeInfo] = useState<PokeInfo>({} as PokeInfo);

  useEffect(() => {
    fetch(`${pokemon.url}`, { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setPokeInfo(res);
      })
      .catch((err) => console.log(err));

    Animated.timing(opacity, {
      toValue: 1,
      duration: 250,
      delay: 200,
      useNativeDriver: true,
    }).start();
  }, [opacity, pokemon.url]);

  return (
    <View style={styles.pokemonDetailWrapper}>
      <Animated.View
        style={{
          opacity,
          position: "absolute",
          top: safeInsets.top,
          left: safeInsets.left,
          right: safeInsets.right,
          zIndex: 2,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Icon
          style={styles.pokemonDetailCloseButton}
          name="close"
          size={30}
          onPress={() => navigation.goBack()}
          color="#000"
        />
      </Animated.View>

      <SharedElement
        id={pokemon.name}
        style={{ backgroundColor: "transparent", zIndex: 1 }}
      >
        <FastImage
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.index}.png`,
          }}
          style={styles.pokemonDetailImage}
        />
      </SharedElement>

      <Animated.View style={styles.pokemonDetails}>
        <View style={styles.pokemonDetailsHeader}>
          <View style={styles.pokemonTitle}>
            <Text style={styles.pokemonName}>{pokemon.name}</Text>

            {pokeInfo?.id && (
              <Text style={styles.pokemonId}>{`#${pokeInfo.id}`}</Text>
            )}
          </View>

          <View style={styles.pokemonTypes}>
            {pokeInfo?.types?.map((type, index) => {
              return (
                <View
                  key={`type-${index}`}
                  style={[styles.pokemonType, styles[type.type.name]]}
                >
                  <FastImage
                    style={styles.pokemonTypeImage}
                    source={typeIcons[type.type.name]}
                  />
                  <Text style={styles.pokemonTypeLabel}>{type.type.name}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {pokeInfo?.stats && (
          <Animated.View>
            <View style={styles.statsView}>
              <Text style={styles.statsKey}>Height</Text>
              <Text style={styles.dots} ellipsizeMode="clip" numberOfLines={1}>
                ...................................................................................
              </Text>
              <Text style={styles.statsValue}>{pokeInfo.height}</Text>
            </View>

            <View style={styles.statsView}>
              <Text style={styles.statsKey}>Weight</Text>
              <Text style={styles.dots} ellipsizeMode="clip" numberOfLines={1}>
                ...................................................................................
              </Text>
              <Text style={styles.statsValue}>{pokeInfo.weight}</Text>
            </View>

            {pokeInfo?.stats?.map((status, index) => {
              return (
                <View key={`stats-${index}`} style={styles.statsView}>
                  <Text style={styles.statsKey}>
                    {`${status.stat.name.replace("-", " ")} `}
                  </Text>
                  <Text
                    style={styles.dots}
                    ellipsizeMode="clip"
                    numberOfLines={1}
                  >
                    ...................................................................................
                  </Text>
                  <Text style={styles.statsValue}>{status.base_stat}</Text>
                </View>
              );
            })}
          </Animated.View>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  pokemonDetailWrapper: {
    flex: 1,
    padding: 10,
    paddingTop: 40,
    backgroundColor: "#f1f5f9",
  },
  pokemonDetailCloseButton: {
    padding: 10,
    left: 20,
    top: 20,
    backgroundColor: "transparent",
    zIndex: 2,
  },
  pokemonDetailImage: {
    top: 0,
    height: 390,
    width: "100%",
    resizeMode: "cover",
    backgroundColor: "transparent",
    transform: [
      {
        scale: 1,
      },
    ],
    zIndex: 10,
  },
  pokemonDetails: {
    flex: 1,
    bottom: 0,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "white",
    justifyContent: "space-between",
    borderRadius: 20,
    elevation: 2,
    zIndex: 0,
  },
  pokemonDetailsHeader: {
    justifyContent: "space-between",
  },
  pokemonTitle: {
    flexDirection: "row",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  pokemonName: {
    fontSize: 32,
    fontWeight: "600",
    textTransform: "capitalize",
    color: "#222",
  },
  pokemonId: { color: "#888", fontSize: 16 },
  pokemonTypes: { flexDirection: "row" },
  pokemonType: {
    alignSelf: "flex-start",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "white",
    padding: 5,
    marginRight: 5,
    elevation: 3,
  },
  pokemonTypeImage: {
    width: 20,
    height: 20,
    resizeMode: "cover",
    marginRight: 5,
  },
  pokemonTypeLabel: {
    alignSelf: "center",
    bottom: 1,
    marginRight: 5,
    textTransform: "capitalize",
    color: "white",
  },
  statsView: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingVertical: 5,
  },
  statsKey: {
    textTransform: "capitalize",
    color: "#888",
    fontSize: 18,
  },
  statsValue: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
  dots: {
    backgroundColor: "transparent",
    flex: 1,
    paddingHorizontal: 5,
    color: "#DDD",
  },
  // water: { backgroundColor: "#4F8FC8" },
  // fire: { backgroundColor: "#F7985E" },
  // grass: { backgroundColor: "#65B962" },
  // ground: { backgroundColor: "#D8764C" },
  // rock: { backgroundColor: "#C5B58C" },
  // steel: { backgroundColor: "#5B8FA0" },
  // ice: { backgroundColor: "#76C8BC" },
  // electric: { backgroundColor: "#F3D04E" },
  // dragon: { backgroundColor: "#226FB1" },
  // ghost: { backgroundColor: "#526BA9" },
  // psychic: { backgroundColor: "#F06E77" },
  // normal: { backgroundColor: "#8F989F" },
  // fighting: { backgroundColor: "#CD4169" },
  // poison: { backgroundColor: "#9E6DAA" },
  // bug: { backgroundColor: "#8FC04D" },
  // flying: { backgroundColor: "#92AAD4" },
  // dark: { backgroundColor: "#5B5566" },
  // fairy: { backgroundColor: "#D393BE" },
});
