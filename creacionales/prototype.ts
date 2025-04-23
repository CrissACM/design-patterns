/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 *
 * * Es útil cuando queremos duplicar el contenido,
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 *
 * https://refactoring.guru/es/design-patterns/prototype
 */

class Document {
  public title: string;
  public content: string;
  public author: string;

  constructor(title: string, content: string, author: string) {
    this.title = title;
    this.content = content;
    this.author = author;
  }

  clone(): Document {
    return new Document(this.title, this.content, this.author);
  }

  displayInfo() {
    console.log(
      `Título: ${this.title} Contenido: ${this.content} Autor: ${this.author}`,
    );
  }
}

function main() {
  const document1 = new Document('Cotización', '500 dolares', 'Fernando');

  console.log({ document1 });
  document1.displayInfo();

  const document2 = document1.clone();
  document2.title = 'Documento Clonado';

  console.log({ document2 });
  document2.displayInfo();
}

main();

class Pokemon {
  // name: string;
  // type: string;
  // level: number;
  // attacks: string[];

  constructor(
    public name: string,
    public type: string,
    public level: number,
    public attacks: string[],
  ) {}

  clone(): Pokemon {
    return new Pokemon(this.name, this.type, this.level, [...this.attacks]);
  }

  displayInfo(): void {
    console.log(
      `Nombre: ${this.name}\nTipo: ${this.type}\nNivel: ${
        this.level
      }\nAtaques: ${this.attacks.join(', ')}`,
    );
  }
}

function main2() {
  const basePokemon = new Pokemon('Charmander', 'Fuego', 1, [
    'Llamarada',
    'Arañazo',
  ]);

  const clone1 = basePokemon.clone();
  clone1.name = 'Charmeleon';
  clone1.level = 16;
  clone1.attacks.push('Lanzallamas');

  basePokemon.displayInfo();
  clone1.displayInfo();
}

main2();
