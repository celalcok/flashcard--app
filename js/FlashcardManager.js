import { Flashcard } from './Flashcard.js';

export class FlashcardManager {
  constructor() {
    this.cards = this.loadCards();
    this.currentIndex = 0;
  }

  addCard(question, answer) {
    const newCard = new Flashcard(question, answer);
    this.cards.push(newCard);
    this.saveCards();
  }

  getCurrentCard() {
    return this.cards[this.currentIndex];
  }

  nextCard() {
    if (this.cards.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.cards.length;
    }
  }

  prevCard() {
    if (this.cards.length > 0) {
      this.currentIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
    }
  }

  saveCards() {
    localStorage.setItem('flashcards', JSON.stringify(this.cards));
  }

  loadCards() {
    const saved = localStorage.getItem('flashcards');
    if (saved) {
      const rawCards = JSON.parse(saved);
      return rawCards.map(c => {
        const card = new Flashcard(c.question, c.answer);
        card.learned = c.learned || false;
        return card;
      });
      
    }
    return [];
  }


  deleteCurrentCard() {
    if (this.cards.length > 0) {
      this.cards.splice(this.currentIndex, 1);
  
      if (this.currentIndex >= this.cards.length) {
        this.currentIndex = 0;
      }
      
      this.saveCards();
    }
  }
  

  clearAllCards() {
    this.cards = [];
    this.currentIndex = 0;
    this.saveCards();
  }
  
  getActiveCards() {
    return this.cards.filter(card => !card.learned);
  }
  

  getLearnedCards() {
    return this.cards.filter(card => card.learned);
  }


  randomCard() {
    const cardsToUse = this.cards;
    if (cardsToUse.length > 0) {
      this.currentIndex = Math.floor(Math.random() * cardsToUse.length);
    }
  }
  
  
}
