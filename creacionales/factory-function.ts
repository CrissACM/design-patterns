/**
 * ! Factory Function
 * Es un patrón de diseño que nos permite crear objetos o funciones de manera dinámica que serán
 * usados posteriormente en el código.
 *
 * * Es útil cuando necesitamos crear objetos o funciones de manera dinámica,
 * * es decir, en tiempo de ejecución y no en tiempo de compilación.
 *
 */

type Language = 'es' | 'en' | 'fr';

function createGreeter(lang: Language) {
  return function (name: string) {
    const messages = {
      es: `Hola, ${name}!`,
      en: `Hello, ${name}!`,
      fr: `Bonjour, ${name}!`,
    };

    return console.log(messages[lang]);
  };
}

function main() {
  const greetSpanish = createGreeter('es');
  const greetEnglish = createGreeter('en');
  const greetFrench = createGreeter('fr');

  greetSpanish('Criss');
  greetEnglish('Alice');
  greetFrench('Pierre');
}

main();

//TODO
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Meses empiezan desde 0
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

type LogLevel = 'info' | 'warn' | 'error';

function createLogger(level: LogLevel) {
  return function (message: string) {
    const timestamp = formatDate(new Date());

    const colors = {
      info: '\x1b[36m', // Cyan
      warn: '\x1b[33m', // Amarillo
      error: '\x1b[31m', // Rojo
    };

    const prefix = {
      info: 'INFO',
      warn: 'WARN',
      error: 'ERROR',
    };

    return console.log(
      `[${prefix[level]}: ${timestamp}] ${message} ${colors[level]}`,
    );
  };
}

// Ejemplo de uso
function main2() {
  const infoLogger = createLogger('info');
  const warnLogger = createLogger('warn');
  const errorLogger = createLogger('error');

  infoLogger('Aplicación iniciada correctamente.');
  warnLogger('El uso de memoria está alto.');
  errorLogger('Error de conexión a la base de datos.');
}

main2();
