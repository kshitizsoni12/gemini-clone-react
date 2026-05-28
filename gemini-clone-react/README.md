# 🚀 React Gemini Clone

A fully responsive, feature-rich clone of Google's Gemini AI interface built entirely with React.js and the Gemini 2.5 Flash API. 

This project demonstrates advanced React concepts including global state management via the Context API, complex API integrations, custom markdown parsing, and modern responsive CSS design.

## ✨ Features

* **Real-time AI Responses:** Powered by the `gemini-2.5-flash` model for incredibly fast and accurate text generation.

* **🌙 Dark Mode / Light Mode:** A seamless, context-driven theme toggle that transforms the entire UI instantly.

* **📱 Fully Responsive Design:** * Custom 2x2 grid layout for mobile devices.
  * Smooth, sliding hamburger menu for the sidebar on small screens.
  * Uses modern `dvh` (Dynamic Viewport Height) to prevent mobile browser address bar jumping.

* **💾 Prompt History:** Automatically saves your recent queries in the sidebar. Click any past query to instantly re-run it!

* **⌨️ Typewriter Effect:** Responses render word-by-word, perfectly mimicking the natural feel of the real Gemini AI.

* **📝 Custom Markdown Parsing:** Built-in JavaScript logic that translates the AI's raw `**` and `*` markdown into beautifully formatted bold text and HTML line breaks.

* **✨ Shimmer Loading State:** Beautiful CSS `@keyframes` animated skeleton loader while waiting for the API to respond.

## 🛠️ Tech Stack

* **Frontend:** React.js, JSX
* **Styling:** Pure CSS (Flexbox, CSS Grid, Media Queries)
* **State Management:** React Context API
* **Backend / AI:** Google Generative AI SDK (`@google/generative-ai`)

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

* Node.js installed on your machine.
* A free API key from [Google AI Studio](https://aistudio.google.com/).

### Installation

1. **Clone the repository**
   ```bash
   git clone [https://github.com/your-username/gemini-clone.git](https://github.com/your-username/gemini-clone.git)
   cd gemini-clone