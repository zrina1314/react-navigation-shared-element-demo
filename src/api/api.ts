import type { PokemonListInfo } from "../model/PokemonListInfo";

/** 每页条数 */
export const pageSize = 50;

/**
 * 请求列表数据
 * @param offset 从第几行开始（从0开始算）
 * @param amount 返回多少条数据(每页条数，默认10)
 * @returns
 */
export const fetchPokemons = (
  offset = 1,
  amount = 50,
): Promise<PokemonListInfo[]> => {
  const apiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=${amount}&offset=${offset}`;
  return new Promise((resolve, _reject) => {
    fetch(apiUrl, {
      method: "GET",
    })
      .then((res) => res.json() as unknown as ApiResult)
      .then((res) => {
        const pokemonList = res.results as PokemonListInfo[];
        pokemonList.map((pokemon) => {
          const iindex = pokemon.url.split("/")[6] as unknown as number;
          pokemon.index = iindex;
        });
        resolve(pokemonList);
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

interface ApiResult {
  count: number;
  next: string;
  previous: string;
  results: PokemonListInfo[];
}
