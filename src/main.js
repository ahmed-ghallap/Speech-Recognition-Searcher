import "./style.css";

class SpeechRecognitionSearcher {
  constructor() {
    this.micIcon = document.querySelector("svg");
    this.recognition = null;
    this.triggerElement = document.querySelector("#trigger");
    this.isListening = false;
    this.textPlaceholder = document.createElement("p");
    this.textContainer = document.querySelector(".content");
    this.textContainer.appendChild(this.textPlaceholder);
    this.errorElement = document.querySelector(".err");
    this.init();
    this.setup();
  }
  start() {
    this.recognition.start();
  }

  changeIcon(className) {
    this.micIcon.querySelectorAll("*").forEach((el) => {
      el.classList.add("hidden");
    });
    this.micIcon.querySelector("." + className).classList.remove("hidden");
  }
  setup() {
    this.recognition.interimResults = true;
    this.recognition.onend = (event) => {
      this.recognition.start();
    };
    this.recognition.onresult = (event) => {
      // makes it more smoother with fast talk
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");

      this.textPlaceholder.innerText = transcript;

      if (event.results[0].isFinal) {
        this.isListening = false;
        this.textPlaceholder = document.createElement("p");
        this.textContainer.appendChild(this.textPlaceholder);
        this.changeIcon("mic");
        this.recognition.stop();
      } else {
        this.isListening = true;
        this.changeIcon("hearing");
      }
    };

    this.recognition.onstart = () => {
      this.isListening = true;
      this.changeIcon("hearing");
      // this.textPlaceholder.textContent = "Listening...";
    };

    this.recognition.onerror = (event) => {
      console.error("SpeechRecognition error:", event.error);
      this.textElement.textContent =
        "Error occurred in recognition: " + event.error;
      this.isListening = false;
      this.changeIcon("mic-error");
    };
  }

  init() {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      this.recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      // this.recognition.lang = "en-US";
      this.recognition.lang = "ar-EG";
      this.recognition.interimResults = true;
    } else {
      this.errorElement.classList.remove("hidden");
      this.micIcon.querySelector("line").classList.remove("hidden");
      console.error("SpeechRecognition API is not supported in this browser.");
      return;
    }
    this.triggerElement.onclick = () => {
      this.start();
    };
  }
}

let foo = new SpeechRecognitionSearcher();
