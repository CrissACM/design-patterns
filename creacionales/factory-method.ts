/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 */

interface Hamburger {
  prepare(): void;
}

class ChickenHamburger implements Hamburger {
  prepare(): void {
    console.log('Preparing chicken hamburger');
  }
}

class BeefHamburger implements Hamburger {
  prepare(): void {
    console.log('Preparing beef hamburger');
  }
}

class VeganHamburger implements Hamburger {
  prepare(): void {
    console.log('Preparing vegan hamburger');
  }
}
abstract class Restaurant {
  protected abstract createHamburger(): Hamburger;

  orderHamburger() {
    const hamburger = this.createHamburger();
    hamburger.prepare();
  }
}

class ChickenRestaurant extends Restaurant {
  override createHamburger(): Hamburger {
    return new ChickenHamburger();
  }
}

class BeefRestaurant extends Restaurant {
  override createHamburger(): Hamburger {
    return new BeefHamburger();
  }
}

class VeganRestaurant extends Restaurant {
  override createHamburger(): Hamburger {
    return new VeganHamburger();
  }
}

function main() {
  let restaurant: Restaurant;

  const burgerType = prompt('Enter burger type (chicken/beef/vegan):');

  switch (burgerType) {
    case 'chicken':
      restaurant = new ChickenRestaurant();
      break;
    case 'beef':
      restaurant = new BeefRestaurant();
      break;
    case 'vegan':
      restaurant = new VeganRestaurant();
      break;
    default:
      throw new Error('Invalid burger type');
  }

  restaurant.orderHamburger();
}

main();

//TODO
interface Report {
  generate(): void;
}

class SalesReport implements Report {
  generate(): void {
    console.log('Generando reporte de ventas...');
  }
}

class InventoryReport implements Report {
  generate(): void {
    console.log('Generando reporte de inventario...');
  }
}

abstract class ReportFactory {
  protected abstract createReport(): Report;

  generateReport(): void {
    const report = this.createReport();
    report.generate();
  }
}

class SalesReportFactory extends ReportFactory {
  createReport(): Report {
    return new SalesReport();
  }
}

class InventoryReportFactory extends ReportFactory {
  createReport(): Report {
    return new InventoryReport();
  }
}

function main2() {
  let reportFactory: ReportFactory;

  const reportType = prompt('¿Qué tipo de reporte deseas? (sales/inventory):');

  switch (reportType) {
    case 'sales':
      reportFactory = new SalesReportFactory();
      break;
    case 'inventory':
      reportFactory = new InventoryReportFactory();
      break;
    default:
      throw new Error('Invalid report type');
  }

  reportFactory.generateReport();
}

main2();
