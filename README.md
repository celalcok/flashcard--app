# Flashcards Web App

A modern, lightweight flashcards application built with HTML, CSS, and JavaScript.

## 🚀 Features

* Add flashcards using a clean modal form
* Flip cards to show answers
* Mark cards as "learned"
* Filter view: All / Learned / Unlearned (radio toggle)
* Navigate cards with Next / Previous
* Random mode toggle
* Delete single cards or clear all
* Toast notifications for actions
* Export / Import cards as JSON
* Responsive and accessible layout

## 🧱 Technologies Used

* HTML5 & CSS3
* Vanilla JavaScript (ES6+)
* Object-Oriented JavaScript Design
* localStorage for persistent data

## 📂 Project Structure

```
/flashcards-app
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── App.js
│   ├── Flashcard.js
│   └── FlashcardManager.js
└── README.md
```

## 📦 How to Use

1. Clone or download the project
2. Open `index.html` in any modern browser
3. Use the interface to:

   * Add new flashcards
   * Flip and mark them as learned
   * Filter and navigate through cards
   * Export your deck as a JSON file
   * Import an existing deck

## 🛠 Development Notes

* All cards are stored in browser localStorage
* Card objects support: `question`, `answer`, `flipped`, `learned`
* UI reacts dynamically to state changes
* Supports mobile and desktop screens



## 📄 License

MIT License. Feel free to use and modify for educational or personal projects.
