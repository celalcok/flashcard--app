import { FlashcardManager } from "./FlashcardManager.js";

class App {
  constructor() {
    this.manager = new FlashcardManager();
    this.flashcardContainer = document.getElementById("flashcard-container");
    this.prevButton = document.getElementById("prevButton");
    this.flipButton = document.getElementById("flipButton");
    this.nextButton = document.getElementById("nextButton");
    this.questionInput = document.getElementById("questionInput");
    this.answerInput = document.getElementById("answerInput");
    this.addCardButton = document.getElementById("addCardButton");
    this.counterElement = document.getElementById("counter");
    this.deleteButton = document.getElementById("deleteButton");
    this.clearAllButton = document.getElementById("clearAllButton");
    this.learnedButton = document.getElementById("learnedButton");
    this.filterRadios = document.querySelectorAll('input[name="filter"]');
    this.openModalButton = document.getElementById("openModalButton");
    this.modal = document.getElementById("modal");
    this.closeModalButton = document.getElementById("closeModal");

    this.exportButton = document.getElementById("exportButton");
    this.importButton = document.getElementById("importButton");
    this.importInput = document.getElementById("importInput");

    this.randomCheckbox = document.getElementById('randomCheckbox');

    this.currentFilter = "all"; // neuer Status: aktueller Filter

    this.addEventListeners();
    this.updateDisplay();
  }

  addEventListeners() {

    this.nextButton.addEventListener('click', () => {
        if (this.randomCheckbox.checked) {
          this.manager.randomCard();
        } else {
          this.manager.nextCard();
        }
        this.updateDisplay();
      });
      
    this.exportButton.addEventListener("click", () => this.exportCards());
    this.importButton.addEventListener("click", () => this.importInput.click());
    this.importInput.addEventListener("change", (e) => this.importCards(e));

    this.openModalButton.addEventListener("click", () => {
      this.modal.style.display = "block";
    });

    this.closeModalButton.addEventListener("click", () => {
      this.modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.modal.style.display = "none";
      }
    });

    this.filterRadios.forEach((radio) => {
      radio.addEventListener("change", () => {
        this.currentFilter = radio.value;
        this.updateDisplay();
      });
    });

    this.learnedButton.addEventListener("click", () => {
      const card = this.getCurrentFilteredCard();
      if (card) {
        card.markAsLearned();
        console.log(card.learned, card.question);
        this.manager.saveCards();
        this.updateDisplay();
        this.showToast("✅ Card marked as learned!");
      }
    });

    this.clearAllButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete all cards?")) {
        this.manager.clearAllCards();
        this.updateDisplay();
        this.showToast("🗑️ All card deleted!");
      }
    });

    this.deleteButton.addEventListener("click", () => {
      if (confirm("Are you sure you want to delete this card?")) {
        this.manager.deleteCurrentCard();
        this.updateDisplay();
        this.showToast("🗑️ Card deleted!");
      }
    });

    this.prevButton.addEventListener('click', () => {
        if (this.randomCheckbox.checked) {
          this.manager.randomCard();
        } else {
          this.manager.prevCard();
        }
        this.updateDisplay();
      });
      

    this.nextButton.addEventListener("click", () => {
      if (this.flashcardContainer.classList.contains("flip")) {
        this.flashcardContainer.classList.remove("flip");
      }
      this.manager.nextCard();
      this.updateDisplay();
    });

    this.flipButton.addEventListener("click", () => {
      const card = this.getCurrentFilteredCard();
      if (card) {
        card.flip();
        this.updateDisplay();

        this.flashcardContainer.classList.toggle("flip");
      }
    });

    this.addCardButton.addEventListener("click", () => {
      const question = this.questionInput.value.trim();
      const answer = this.answerInput.value.trim();
      if (question && answer) {
        this.manager.addCard(question, answer);
        this.questionInput.value = "";
        this.answerInput.value = "";
        this.updateDisplay();
      }
    });
  }
  getCurrentFilteredCard() {
    let filteredCards;

    if (this.currentFilter === "unlearned") {
      filteredCards = this.manager.getActiveCards();
    } else if (this.currentFilter === "learned") {
      filteredCards = this.manager.getLearnedCards();
    } else {
      filteredCards = this.manager.cards;
    }

    return filteredCards.length > 0
      ? filteredCards[this.manager.currentIndex % filteredCards.length]
      : null;
  }

  updateDisplay() {
    let filteredCards;

    if (this.currentFilter === "unlearned") {
      filteredCards = this.manager.getActiveCards();
    } else if (this.currentFilter === "learned") {
      filteredCards = this.manager.getLearnedCards();
    } else {
      filteredCards = this.manager.cards;
    }

    const card =
      filteredCards[this.manager.currentIndex % (filteredCards.length || 1)];

    if (filteredCards.length > 0) {
      this.flashcardContainer.textContent = card.getText();
      this.flashcardContainer.classList.remove("learned", "not-learned");
      this.flashcardContainer.classList.add(
        card.learned ? "learned" : "not-learned"
      );
      this.counterElement.textContent = `${this.manager.currentIndex + 1} of ${
        filteredCards.length
      }`;
    } else {
      this.flashcardContainer.textContent = "No cards to show!";
      this.counterElement.textContent = "No cards available.";
      this.flashcardContainer.classList.remove("learned", "not-learned");
      this.flashcardContainer.classList.add("not-learned");
    }
  }

  showToast(message) {
    const toastContainer = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("show");
    }, 100);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => {
        toast.remove();
      }, 500);
    }, 3000); 
  }


  exportCards() {
    const dataStr = JSON.stringify(this.manager.cards, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = 'flashcards.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  
  importCards(event) {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedCards = JSON.parse(e.target.result);
  

        importedCards.forEach(card => {
          this.manager.addCard(card.question, card.answer);
        });
  
        this.updateDisplay();
        this.showToast('✅ Cards imported successfully!');
      } catch (err) {
        this.showToast('❌ Failed to import cards.');
        console.error(err);
      }
    };
    reader.readAsText(file);
  }
  
}

new App();
