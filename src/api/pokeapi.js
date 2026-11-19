// export  async function getPokemon(name){
//     const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${name}`);
//     const data = await response.json();
//     return data;
// }


export async function getpokemon(){
    const id = Math.floor(Math.random() * 1025) + 1;
    const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${id}`);
     const data = await response.json();
    return data;

}


export async function getdebilidades(urlTipo){
    const response = await fetch(urlTipo)
    const datadeb = await response.json()
    return datadeb
}