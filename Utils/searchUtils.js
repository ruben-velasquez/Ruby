// Importamos el módulo puppeteer
const puppeteer = require("puppeteer");

// Definimos nuestra función asíncrona para obtener el array
async function search(query) {
  // Creamos un nuevo navegador Chrome
  const browser = await puppeteer.launch();
  // Creamos una nueva pestaña
  const page = await browser.newPage();
  // Codificamos nuestros términos de búsqueda como parámetro de consulta
  const encodedQuery = encodeURIComponent(query);
  // Navegamos a la URL de búsqueda de Google con nuestro parámetro
  await page.goto(`https://www.google.com/search?q=${encodedQuery}`);
  // Esperamos a que se carguen los resultados
  await page.waitForSelector("#search");
  // Obtenemos todos los elementos que contienen los enlaces, los títulos y las descripciones
  const linkElements = await page.$$("#search .g .yuRUbf > a");
  const titleElements = await page.$$("#search .g .yuRUbf > a > h3");
  const descriptionElements = await page.$$("#search .g .IsZvec > div > span");

  // Creamos un array vacío para guardar los objetos
  const results = [];

  // Iteramos sobre cada elemento y obtenemos su texto o atributo href
  for (let i = 0; i < linkElements.length; i++) {
    const href = await linkElements[i]?.getProperty("href");
    const link = await href?.jsonValue();
    const titleHandle = await titleElements[i]?.getProperty("textContent");
    const title = await titleHandle?.jsonValue();
    const descriptionHandle = await descriptionElements[i]?.getProperty(
      "textContent"
    );
    const description = await descriptionHandle?.jsonValue();

    // Creamos un objeto con el título, la descripción y el enlace
    let result = { title, description, link };

    // Añadimos el objeto al array
    results.push(result);
  }

  return { results, "url": `https://www.google.com/search?q=${encodedQuery}` };
}

module.exports = { search };