/** Command-line tool to generate Markov text. */
const fs = require("fs");
const { MarkovMachine } = require("./markov");
const axios = require("axios");


/** Generate text from a file */
function generateFromFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err}`);
        process.exit(1);
      } else {
      generateText(data);
      }
    });
  }

  /** Generate text from a URL */
  async function generateFromUrl(url) {
    try {
      let response = await axios.get(url);
      generateText(response.data);
    } catch (err) {
        if (err.response.data) {
            console.error(`Error fetching URL: ${err}`);
        } else {
            console.error(`Error fetching URL: ${err.message}`);
        }
      process.exit(1);
    }
  }
  
  /** Generate and print text using MarkovMachine */
  function generateText(text) {
    let mm = new MarkovMachine(text);
    console.log(mm.makeText());
  }
  
  /** Main function to handle input */
  function main() {
    let [method, path] = process.argv.slice(2);
  
    if (method === 'file') {
      generateFromFile(path);
    } else if (method === 'url') {
      generateFromUrl(path);
    } else {
      console.error('Unknown method. Use "file" or "url".');
      process.exit(1);
    }
  }
  
  main();
