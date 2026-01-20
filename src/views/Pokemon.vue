<template>
  <div class="page">
    <h2>Pokemon Manager</h2>

    <div class="fetch-pokemon">
      <input
        v-model="pokemonName"
        placeholder="Search Pokemon by name"
      />
      <button @click="fetchPokemon">Fetch</button>
    </div>

    <div v-if="apiError" class="error">{{ apiError }}</div>

    <div v-if="fetchedPokemon" class="pokemon-card">
      <h4>{{ capitalize(fetchedPokemon.name) }}</h4>
      <img :src="fetchedPokemon.sprites.front_default" alt="pokemon" />
      <button @click="addFavorite(fetchedPokemon)">Add to Favorites</button>
    </div>

    <hr />

    <h3>Favorite Pokemon (CRUD)</h3>
    <div v-if="favorites.length === 0">No favorites yet.</div>
    <ul>
      <li v-for="poke in favorites" :key="poke.name">
        {{ capitalize(poke.name) }}
        <button @click="removeFavorite(poke.name)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

interface Pokemon {
  name: string
  sprites: { front_default: string }
}

const pokemonName = ref('')
const fetchedPokemon = ref<Pokemon | null>(null)
const favorites = ref<Pokemon[]>(JSON.parse(localStorage.getItem('favorites') || '[]'))
const apiError = ref('')

const fetchPokemon = async (): Promise<void> => {
  apiError.value = ''
  fetchedPokemon.value = null
  if (!pokemonName.value) return

  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.value.toLowerCase()}`)
    fetchedPokemon.value = res.data
  } catch (e) {
    apiError.value = 'Pokemon not found'
  }
}

// CRUD: Add Favorite
const addFavorite = (poke: Pokemon): void => {
  if (!favorites.value.find(p => p.name === poke.name)) {
    favorites.value.push(poke)
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
  }
}

// CRUD: Remove Favorite
const removeFavorite = (name: string): void => {
  favorites.value = favorites.value.filter(p => p.name !== name)
  localStorage.setItem('favorites', JSON.stringify(favorites.value))
}

// Capitalize filter
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
</script>

<style scoped>
.fetch-pokemon {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
}

.pokemon-card {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
  padding: 12px;
  background: #f3f4f6;
  border-radius: 8px;
}

.pokemon-card img {
  width: 80px;
  height: 80px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 6px;
}

button {
  margin-left: 8px;
}

.error {
  color: #dc2626;
}
</style>
