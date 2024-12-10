/** Textual markov chain generator */


class MarkovMachine {

    /** build markov machine; read in text.*/
  
    constructor(text) {
      let words = text.split(/[ \r\n]+/);
      this.words = words.filter(c => c !== "");
      this.makeChains();
    }
  
    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
  
    makeChains() {
        this.chains = new Map();
    
        for (let i = 0; i < this.words.length; i++) {
          let word = this.words[i];
          let nextWord = this.words[i + 1] || null; 
    
          if (!this.chains.has(word)) {
            this.chains.set(word, []);
          }
          this.chains.get(word).push(nextWord);
        }
      }
    
      /** Pick a random choice from an array */
      static randomChoice(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
      }
    
      /** Return random text from chains */
      makeText(numWords = 100) {
        let keys = Array.from(this.chains.keys());
        let key = MarkovMachine.randomChoice(keys);
        let result = [];
    
        for (let i = 0; i < numWords; i++) {
          result.push(key);
          let nextWords = this.chains.get(key)|| [null]; // null if undefined
          key = MarkovMachine.randomChoice(this.chains[key]);
          if (key === null) break; // Stop if we hit a null value
        }
    
        return result.join(" ");
      }
    }

module.exports = {
    MarkovMachine
    };