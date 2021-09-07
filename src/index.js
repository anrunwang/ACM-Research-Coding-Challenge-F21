import { stemmer } from 'stemmer';
import fs from 'fs';

//This class analyses the positivity/negativity of the array of words passed through the parameters of the constructor
class Analyser {
  constructor(text, posList, negList, neuList) {
    this.text = text;
    this.posList = posList;
    this.negList = negList;
    this.neuList = neuList;
    this.positiveScore = 0;
    this.negativeScore = 0;
    this.domEmotion = "";
    this.domPercentage = 0;
  }

  //Deletes neutral words in input file & searches positive/negative words within file
  scanText() {
    for(let i = this.text.length-1; i >= 0; i--){
      if(this.neuList.includes(this.text[i]))
      this.text.splice(i,1);
    }

    for(let i = 0; i < this.text.length; i++){
      if(this.posList.includes(this.text[i]))
      this.positiveScore++;
      
      if(this.negList.includes(this.text[i]))
      this.negativeScore++;
    }
  }

  //Determines the overall sentiment based on the dominant emotion percentage
  computeScore(){
    this.scanText();

    if(this.positiveScore > this.negativeScore)
      this.domEmotion = "Positive";
    else if(this.positiveScore < this.negativeScore)
      this.domEmotion = "Negative";
    else {
      this.domEmotion = "Neutral";
      this.domPercentage = 100;
      return;
    }

    this.domPercentage = Number.parseFloat(this[this.domEmotion.toLowerCase() + "Score"]/(this.positiveScore + this.negativeScore)*100).toPrecision(4);
  }

  printScore() {
    console.log("Positive Word Count: " + this.positiveScore);
    console.log("Negative Word Count: "+ this.negativeScore);
    console.log("Sentiment Score: " + this.domPercentage + "% " + this.domEmotion); 
  }

}

//This class scans the txt files and prepares them for analysis
class Scanner {
  constructor() {
    //scanning files and tokenizing the files into arrays.
    this.text = fs.readFileSync('./src/data/input.txt', 'utf8').split(/(?: |\n|\r)+/);;
    this.posList = fs.readFileSync('./src/data/positive-words.txt', 'utf8').split(/(?: |\n|\r)+/);
    this.negList = fs.readFileSync('./src/data/negative-words.txt', 'utf8').split(/(?: |\n|\r)+/);
    this.neuList = fs.readFileSync('./src/data/neutral-Words.txt', 'utf8').split(' ');
    
    this.prepFiles();
  }


  //cleaning, & stemming (text, posList, negList, neuList)
  prepFiles() {
    for (let i = 0; i < this.text.length; i++) {
      let condition = true;
      while (condition) {
        if (this.text[i].search(/\.|\?|\!|\'|\"|\,|\`/) != -1)
          this.text[i] = this.text[i].replace(/\.|\?|\!|\'|\"|\,|\`/, '');
        else condition = false;
      }
      this.text[i] = this.text[i].toLowerCase();
      this.text[i] = stemmer(this.text[i]);
    }

    for(let i = 0; i < this.posList.length; i++){
      this.posList[i] = this.posList[i].toLowerCase();
      this.posList[i] = stemmer(this.posList[i]);
    }

    for(let i = 0; i < this.negList.length; i++){
      this.negList[i] = this.negList[i].toLowerCase();
      this.negList[i] = stemmer(this.negList[i]);
    }

    for(let i = 0; i < this.neuList.length; i++){
      this.neuList[i] = this.neuList[i].toLowerCase();
      this.neuList[i] = stemmer(this.neuList[i]);
    }
  }

  printLists() {
    console.log("Text: " + this.text);
    console.log("Positive Words List: " + this.posList);
    console.log("Negative Words List: " + this.negList);
    console.log("Neutral Words List: " + this.neuList);
  }
}

//function that calls all the required methods and constructors to run the program.
function runProgram(){
  const scanner = new Scanner();
  const analyser = new Analyser(scanner.text, scanner.posList, scanner.negList,scanner.neuList);
  analyser.computeScore();
  analyser.printScore();
}

//"main" 
runProgram();

