export class Flashcard {
    constructor(question, answer) {
      this.question = question;
      this.answer = answer;
      this.flipped = false;
      this.learned = false; 
    }
  
    flip() {
      this.flipped = !this.flipped;
    }
  
    getText() {
      return this.flipped ? this.answer : this.question;
    }
    markAsLearned() {
      this.learned = true;
    }
  }
  