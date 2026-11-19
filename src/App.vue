<script setup>
import { ref,computed, onBeforeUnmount } from 'vue'
import { onMounted} from 'vue'
import { getdebilidades, getpokemon} from './api/pokeapi.js'

const pokemon = ref()

const loading = ref(true)
const tipos = ref([])
const debilidades = ref ([])

onMounted(async () => {
    pokemon.value = await getpokemon()

    tipos.value = pokemon.value.types.map(tipo => tipo.type.name)

    const urlTipo = pokemon.value.types[0].type.url

    const deb = await getdebilidades(urlTipo)

    debilidades.value = deb.damage_relations.double_damage_from.map(
        tipo => tipo.name
    )

    loading.value = false
})


// onMounted( async ()=> {
//     pokemon.value = await getpokemon()
    
//     loading.value = false
// })

const colores = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    psychic: '#F85888',
    ice: '#98D8D8',
    dragon: '#7038F8',
    dark: '#705848',
    fairy: '#EE99AC',
    normal: '#A8A878',
    fighting: '#C03028',
    flying: '#A890F0',
    poison: '#A040A0',
    ground: '#E0C068',
    rock: '#B8A038',
    bug: '#A8B820',
    ghost: '#705898',
    steel: '#B8B8D0'
}

const emojis = {
    normal: '⚪',
    fire: '🔥',
    water: '💧',
    grass: '🌿',
    electric: '⚡',
    ice: '❄️',
    fighting: '🥊',
    poison: '☠️',
    ground: '🌍',
    flying: '🪽',
    psychic: '🔮',
    bug: '🐛',
    rock: '🪨',
    ghost: '👻',
    dragon: '🐉',
    dark: '🌑',
    steel: '⚙️',
    fairy: '🧚'
}

</script>

<template>
 <main v-if="loading" class="cargando">Cargando datos del Pokémon...</main>

 <main v-else class="pagina-pokemon">
  <header class="encabezado">
   <p>POKÉDEX</p>
   <button class="boton-cambiar" type="button" onclick="window.location.reload()">
    Cambiar Pokémon
   </button>
  </header>

  <section class="contenedor-todo">
   <article class="contenedor-pokemon"
      :style="{background: pokemon.types.length === 2? `linear-gradient(135deg, ${colores[pokemon.types[0].type.name]} 0%, ${colores[pokemon.types[0].type.name]} 50%, ${colores[pokemon.types[1].type.name]} 50%, ${colores[pokemon.types[1].type.name]} 100%)`
      : colores[pokemon.types[0].type.name]
  }">
    <h1>{{ pokemon?.name }}</h1>
    <img :src="pokemon?.sprites?.other?.home?.front_default" :alt="pokemon?.name" />
    <div class="medidas">
     <p>Altura: {{ pokemon.height / 10 }} m</p>
     <p>Peso: {{ pokemon.weight / 10 }} kg</p>
    </div>
   </article>

   <section class="informacion">
    <p class="numero"># {{ String(pokemon.id).padStart(3, '0') }}</p>

    <h2>Tipos del Pokémon</h2>
    <div class="etiquetas">
     <p v-for="tipo in tipos" class="etiqueta" :style="{ backgroundColor: colores[tipo] }">
      {{ emojis[tipo] }} {{ tipo }}
     </p>
    </div>

    <h2>Debilidades</h2>
    <div class="etiquetas">
     <p v-for="debilidad in debilidades" class="etiqueta" :style="{ backgroundColor: colores[debilidad] }">
      {{ emojis[debilidad] }} {{ debilidad }}
     </p>
    </div>
   </section>

   <section class="estadisticas">
    <h2>Estadísticas</h2>
    <div v-for="stat in pokemon.stats" class="statistica">
     <p>{{ stat.stat.name }}: {{ stat.base_stat }}/255</p>
     <div class="barra">
      <div class="relleno" :style="{ width: (stat.base_stat / 255 * 100) + '%', backgroundColor: colores[pokemon.types[0].type.name] }"></div>
     </div>
    </div>
   </section>
  </section>
 </main>

</template>

<style>
body{
    background-color: #f4f7fb;
}

h1{
    color: #1f1f1f;
    text-transform: capitalize;
}
h2{
    color: #1f1f1f;
}

.contenedor-pokemon {
    width: 100%;
    min-height: 390px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    color: white;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 8px 18px #00000025;
}

.contenedor-todo{
    display: grid;
    grid-template-columns: minmax(260px, 1fr) minmax(240px, 1fr) minmax(260px, 1fr);
    gap: 32px;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 25px;
}

.pagina-pokemon{
    min-height: 100vh;
    padding-bottom: 30px;
}

.encabezado{
    max-width: 1200px;
    margin: 0 auto;
    padding: 22px 25px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.encabezado p{
    color: #e33535;
    font-size: 28px;
    font-weight: bold;
    letter-spacing: 2px;
}

.boton-cambiar{
    border: none;
    border-radius: 8px;
    padding: 10px 16px;
    background: #e33535;
    color: white;
    font-size: 16px;
    cursor: pointer;
}

.boton-cambiar:hover{
    background: #bd2020;
}

.contenedor-pokemon h1{
    margin: 0 0 5px;
    color: white;
    font-size: 32px;
}

.contenedor-pokemon img{
    width: min(250px, 80%);
    height: 255px;
    object-fit: contain;
}

.medidas{
    display: flex;
    width: 100%;
    justify-content: space-around;
    font-style: italic;
    font-weight: bold;
}

.informacion, .estadisticas{
    text-align: center;
}

.numero{
    color: #e87929;
    font-size: 55px;
    font-weight: bold;
    margin-bottom: 22px;
}

.informacion h2, .estadisticas h2{
    margin: 22px 0 12px;
}

.etiquetas{
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
}

.etiqueta{
    color: white;
    padding: 7px 12px;
    border-radius: 6px;
    text-transform: capitalize;
    font-size: 14px;
    box-shadow: 0 2px 4px #00000030;
}

.statistica{
    text-align: left;
    margin-bottom: 13px;
}

.statistica p{
    color: #222;
    font-size: 14px;
    font-weight: bold;
    text-transform: capitalize;
    margin-bottom: 4px;
}

.barra{
    height: 16px;
    border: 1px solid #777;
    border-radius: 10px;
    overflow: hidden;
    background: white;
}

.relleno{
    height: 100%;
    border-radius: 10px;
}

.cargando{
    min-height: 100vh;
    display: grid;
    place-items: center;
    font-size: 20px;
    color: #333;
}

@media (max-width: 850px){
    .contenedor-todo{
        grid-template-columns: 1fr 1fr;
    }

    .estadisticas{
        grid-column: 1 / -1;
        max-width: 520px;
        width: 100%;
        justify-self: center;
    }
}

@media (max-width: 600px){
    .contenedor-todo{
        grid-template-columns: 1fr;
        padding: 18px;
        gap: 18px;
    }

    .estadisticas{
        grid-column: auto;
    }

    .encabezado{
        padding: 18px 18px 0;
    }

    .encabezado p{
        font-size: 22px;
    }

    .numero{
        font-size: 45px;
    }
}
</style>
