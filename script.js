// Check if Speech Recognition is supported
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (!window.SpeechRecognition) {
    alert("Your browser does not support Speech Recognition. Try using Chrome.");
} else {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    const startBtn = document.getElementById("start-btn");
    const transcriptionDiv = document.getElementById("transcription");
    const videoContainer = document.getElementById("video-container");
    const videoElement = document.getElementById("sign-video");

    let isListening = false;

    // Mapping words to video filenames (Modify as needed)
    const wordToVideoMap = {
        "hello": "videos/hello.mp4",
        "thank you": "videos/thank_you.mp4",
        "goodbye": "videos/goodbye.mp4",
        "yes": "videos/yes.mp4",
        "no": "videos/no.mp4"
    };

    // Toggle Speech Recognition
    function toggleSpeechRecognition() {
        if (isListening) {
            recognition.stop();
            startBtn.textContent = "Start Listening";
        } else {
            recognition.start();
            startBtn.textContent = "Stop Listening";
        }
        isListening = !isListening;
    }

    // Speech Recognition Result
    recognition.onresult = function(event) {
        let spokenText = event.results[0][0].transcript.toLowerCase().trim();
        transcriptionDiv.textContent = spokenText;
        console.log("Recognized:", spokenText);

        // Show the corresponding sign language video
        if (wordToVideoMap[spokenText]) {
            videoElement.src = wordToVideoMap[spokenText];
            videoContainer.style.display = "block";
            videoElement.play();
        } else {
            videoContainer.style.display = "none";
        }
    };

    // Handle errors
    recognition.onerror = function(event) {
        console.error("Speech Recognition Error:", event.error);
    };

    recognition.onend = function() {
        startBtn.textContent = "Start Listening";
        isListening = false;
    };

    // Attach event listener to button
    startBtn.addEventListener("click", toggleSpeechRecognition);
}
