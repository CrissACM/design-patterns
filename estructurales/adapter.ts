/**
 * ! Patrón Adapter
 *  Permite que objetos con interfaces incompatibles trabajen juntos, también es muy
 *  util para utilizar librerías de terceros en nuestra aplicación sin depender
 *  directamente de ellas.
 *
 * * Es útil cuando se quiere reutilizar una clase que no tiene la interfaz que
 * * necesitamos o cuando queremos crear una capa de abstracción para una librería
 * * de terceros.
 *
 * https://refactoring.guru/es/design-patterns/adapter
 */

import { BunLoggerAdapter } from './adapters-files/logger-adapter';

// const logger = new LocalLogger('adapter.ts');
const logger = new BunLoggerAdapter('adapter.ts');

logger.writeLog('Este es un log');
logger.writeWarning('Este es un warning');
logger.writeError('Este es un error');

//TODO
interface PaymentProcessor {
  processPayment(amount: number): void;
}

class PayPalService {
  sendPayment(amount: number): void {
    console.log(`Procesando pago de $${amount} con PayPal`);
  }
}

class StripeService {
  makeCharge(amount: number): void {
    console.log(`Procesando pago de $${amount} con Stripe`);
  }
}

class MercadoPagoService {
  pay(amount: number): void {
    console.log(`Procesando pago de $${amount} con MercadoPago`);
  }
}

// Adaptador para PayPal
class PayPalAdapter implements PaymentProcessor {
  private paypalService: PayPalService;

  constructor(service: PayPalService) {
    this.paypalService = service;
  }

  processPayment(amount: number): void {
    this.paypalService.sendPayment(amount);
  }
}

// Adaptador para Stripe
class StripeAdapter {
  private stripeService: StripeService;

  constructor(service: StripeService) {
    this.stripeService = service;
  }

  processPayment(amount: number): void {
    this.stripeService.makeCharge(amount);
  }
}

// Adaptador para MercadoPago
class MercadoPagoAdapter {
  private mercadoPagoService: MercadoPagoService;

  constructor(service: MercadoPagoService) {
    this.mercadoPagoService = service;
  }

  processPayment(amount: number): void {
    this.mercadoPagoService.pay(amount);
  }
}

function main() {
  const paymentAmount = 100;

  const paypalProcessor: PaymentProcessor = new PayPalAdapter(
    new PayPalService(),
  );
  const stripeProcessor: PaymentProcessor = new StripeAdapter(
    new StripeService(),
  );
  const mercadoPagoProcessor: PaymentProcessor = new MercadoPagoAdapter(
    new MercadoPagoService(),
  );

  console.log('\nUsando PayPal:');
  paypalProcessor.processPayment(paymentAmount);

  console.log('\nUsando Stripe:');
  stripeProcessor.processPayment(paymentAmount);

  console.log('\nUsando MercadoPago:');
  mercadoPagoProcessor.processPayment(paymentAmount);
}

main();
