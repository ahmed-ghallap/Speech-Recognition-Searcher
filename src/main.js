import "./style.css";

class SpeechRecognitionSearcher {
  constructor() {
    this.micIcon = document.querySelector("svg");
    this.recognition = null;
    this.isListening = false;
    this.textElement = document.querySelector("p");
    this.errorElement = document.querySelector(".err");
    this.init();
  }

  init() {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      this.recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      this.recognition.lang = "en-US";
      this.recognition.interimResults = true;
    } else {
      this.errorElement.classList.remove("hidden");
      this.micIcon.querySelector("line").classList.remove("hidden");
      console.error("SpeechRecognition API is not supported in this browser.");
      return;
    }
    this.recognition.start();
    this.recognition.onstart = () => {
      this.isListening = true;
      this.micIcon.classList.add("listening");
      this.textElement.textContent = "Listening...";
    };

    this.recognition.onerror = (event) => {
      console.error("SpeechRecognition error:", event.error);
      this.textElement.textContent =
        "Error occurred in recognition: " + event.error;
      this.isListening = false;
      this.micIcon.classList.remove("listening");
    };
  }
}

new SpeechRecognitionSearcher();
