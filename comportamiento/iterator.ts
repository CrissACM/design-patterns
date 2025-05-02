/**
 * ! Patrón Iterator
 * Este patrón permite recorrer los elementos de una colección sin exponer
 * la estructura interna de la colección.
 *
 * * Es útil cuando se necesita recorrer una colección de elementos sin importar
 * * cómo se almacenan los elementos.
 *
 * https://refactoring.guru/es/design-patterns/iterator
 */

interface Iterator<T> {
  next(): T | null;
  hasNext(): boolean;
  current(): T | null;
}

class Pokemon {
  constructor(public name: string, public type: string) {
    this.name = name;
    this.type = type;
  }
}

class PokemonCollection {
  constructor(private pokemons: Pokemon[] = []) {}

  addPokemon(pokemon: Pokemon) {
    this.pokemons.push(pokemon);
  }

  getPokemonAt(index: number): Pokemon | null {
    if (index >= 0 && index < this.pokemons.length) {
      return this.pokemons[index] ?? null;
    }

    return null;
  }

  getLength(): number {
    return this.pokemons.length;
  }

  createIterator(): PokemonIterator {
    return new PokemonIterator(this);
  }
}

class PokemonIterator implements Iterator<Pokemon> {
  constructor(
    private collection: PokemonCollection,
    private position: number = 0,
  ) {}

  next(): Pokemon | null {
    if (this.hasNext()) {
      return this.collection.getPokemonAt(this.position++) ?? null;
    }

    return null;
  }

  hasNext(): boolean {
    return this.position < this.collection.getLength();
  }

  current(): Pokemon | null {
    return this.collection.getPokemonAt(this.position) ?? null;
  }
}

function main() {
  const pokedex = new PokemonCollection();

  pokedex.addPokemon(new Pokemon('Pikachu', 'Electrico'));
  pokedex.addPokemon(new Pokemon('Bulbasaur', 'Planta'));
  pokedex.addPokemon(new Pokemon('Charmander', 'Fuego'));
  pokedex.addPokemon(new Pokemon('Squirtle', 'Agua'));
  pokedex.addPokemon(new Pokemon('Caterpie', 'Bicho'));

  const iterator = pokedex.createIterator();

  while (iterator.hasNext()) {
    const pokemon = iterator.next();

    if (pokemon) {
      console.log(`Pokemon: ${pokemon.name}, Tipo: ${pokemon.type}`);
    }
  }
}

main();

//??
class Pokemon2 {
  constructor(public name: string, public type: string) {}
}

class PokemonCollection2 {
  private pokemons: Pokemon2[] = [];

  addPokemon(pokemon: Pokemon2): void {
    this.pokemons.push(pokemon);
  }

  *getPokemons(): IterableIterator<Pokemon2> {
    for (const pokemon of this.pokemons) {
      yield pokemon;
    }
  }

  *[Symbol.iterator](): IterableIterator<Pokemon2> {
    yield* this.pokemons;
  }
}

function main2(): void {
  const pokedex = new PokemonCollection2();

  // Agregar Pokemones a la colección
  pokedex.addPokemon(new Pokemon2('Pikachu', 'Eléctrico'));
  pokedex.addPokemon(new Pokemon2('Charmander', 'Fuego'));
  pokedex.addPokemon(new Pokemon2('Squirtle', 'Agua'));
  pokedex.addPokemon(new Pokemon2('Bulbasaur', 'Planta'));

  // Recorremos la colección usando for...of, gracias a la función generadora
  console.log('Recorriendo la colección de Pokemons:');
  for (const pokemon of pokedex.getPokemons()) {
    console.log(`Pokémon: ${pokemon.name}, Tipo: ${pokemon.type}`);
  }

  for (const pokemon of pokedex) {
    console.log(`Pokémon: ${pokemon.name}, Tipo: ${pokemon.type}`);
  }
}

main2();

//TODO
class Card {
  constructor(public name: string, public value: number) {}
}

class CardCollection {
  private cards: Card[] = [];

  addCard(card: Card): void {
    this.cards.push(card);
  }

  *[Symbol.iterator](): IterableIterator<Card> {
    yield* this.cards;
  }

  *getCard(): IterableIterator<Card> {
    for (const card of this.cards) {
      yield card;
    }
  }
}

function main3(): void {
  const deck = new CardCollection();

  deck.addCard(new Card('As de Corazones', 1));
  deck.addCard(new Card('Rey de Corazones', 13));
  deck.addCard(new Card('Reina de Corazones', 12));
  deck.addCard(new Card('Jota de Corazones', 11));

  console.log('Recorriendo la colección de cartas:');
  for (const card of deck.getCard()) {
    console.log(`Carta: ${card.name}, Valor: ${card.value}`);
  }

  for (const card of deck) {
    console.log(`Carta: ${card.name}, Valor: ${card.value}`);
  }
}

main3();
