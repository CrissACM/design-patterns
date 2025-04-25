/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */

interface FileSystemComponent {
  showDetails(indent: string): void;
}

class File implements FileSystemComponent {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  showDetails(indent: string): void {
    console.log(`${indent}- Archivo: ${this.name}`);
  }
}

class Folder implements FileSystemComponent {
  private name: string;
  private contents: FileSystemComponent[] = [];

  constructor(name: string) {
    this.name = name;
  }

  add(component: FileSystemComponent) {
    this.contents.push(component);
  }

  showDetails(indent: string = ''): void {
    console.log(`${indent}+ Carpeta: ${this.name}`);
    this.contents.forEach((component) => component.showDetails(indent + ' '));
  }
}

function main() {
  const file1 = new File('archivo1.txt');
  const file2 = new File('archivo2.txt');
  const file3 = new File('archivo3.txt');
  const file4 = new File('archivo4.txt');

  const folder1 = new Folder('Carpeta1');
  const folder5 = new Folder('Carpeta5');
  folder1.add(file1);
  folder1.add(file2);

  const folder2 = new Folder('Carpeta2');
  folder2.add(file3);

  const folder3 = new Folder('Carpeta3');
  folder3.add(file4);
  folder2.add(folder3);
  folder2.add(folder5);

  const rootFolder = new Folder('Carpeta ROOT');

  rootFolder.add(folder1);
  rootFolder.add(folder2);

  rootFolder.showDetails();
}

main();

//TODO
interface MenuComponent {
  showDetails(indent: string): void;
}

class MenuItem implements MenuComponent {
  private name: string;
  private price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  showDetails(indent: string = ''): void {
    console.log(`${indent}- ${this.name}: $${this.price.toFixed(2)}`);
  }
}

// Representa una categoría de menú que puede contener otros ítems o subcategorías.
class MenuCategory implements MenuComponent {
  private name: string;
  private items: MenuComponent[] = [];

  constructor(name: string) {
    this.name = name;
  }

  add(item: MenuComponent | MenuComponent[]): void {
    if (Array.isArray(item)) {
      this.items.push(...item);
      return;
    }

    this.items.push(item);
  }

  showDetails(indent: string = ''): void {
    console.log(`${indent}+ ${this.name}`);
    this.items.forEach((item) => item.showDetails(indent + ' '));
  }
}

function main2() {
  const salad = new MenuItem('Ensalada', 5.99);
  const soup = new MenuItem('Sopa de tomate', 4.99);
  const steak = new MenuItem('Bistec', 15.99);
  const soda = new MenuItem('Refresco', 2.5);
  const dessert = new MenuItem('Pastel de chocolate', 6.5);
  const coffee = new MenuItem('Café', 1.99);
  const te = new MenuItem('Te', 0.99);

  const appetizers = new MenuCategory('Entradas');
  appetizers.add(salad);
  appetizers.add(soup);

  const mainCourse = new MenuCategory('Plato Principal');
  mainCourse.add(steak);

  const beverages = new MenuCategory('Bebidas');

  const hotBeverages = new MenuCategory('Calientes');
  const coldBeverages = new MenuCategory('Frías');

  coldBeverages.add(soda);

  hotBeverages.add(coffee);
  hotBeverages.add(te);

  beverages.add([coldBeverages, hotBeverages]);

  const desserts = new MenuCategory('Postres');
  desserts.add(dessert);

  const mainMenu = new MenuCategory('Menú Principal');
  mainMenu.add([appetizers, beverages, desserts, mainCourse]);
  // mainMenu.add(mainCourse);
  // mainMenu.add(beverages);
  // mainMenu.add(desserts);

  console.log('\nMenú del Restaurante:');
  mainMenu.showDetails();
}

main2();
