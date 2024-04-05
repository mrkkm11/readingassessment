    const sentenceInput = document.getElementById('sentenceInput');
    const startRecordingBtn = document.getElementById('startRecording');
    const stopRecordingBtn = document.getElementById('stopRecording');
    const resultDiv = document.getElementById('result');

    let recognition;

    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    } else {
        alert('Speech recognition is not supported in this browser. Please try a different browser.');
    }

    recognition.onstart = () => {
        resultDiv.innerHTML = 'bagal ng net deputa...';
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        const originalSentence = sentenceInput.value.toLowerCase();

        const transcriptWords = transcript.split(' ');
        const originalWords = originalSentence.split(' ');

        let misreadWordIndex = -1;

        for (let i = 0; i < originalWords.length; i++) {
            if (i >= transcriptWords.length || transcriptWords[i] !== originalWords[i]) {
                misreadWordIndex = i;
                break;
            }
        }

        if (misreadWordIndex !== -1) {
            // Misreading detected
            const misreadWord = originalWords[misreadWordIndex];
            const underlinedSentence = originalSentence.replace(misreadWord, `<u style="color: red;">${misreadWord}</u>`);
            
            sentenceInput.value = '';
            resultDiv.innerHTML = `error: ${underlinedSentence}`;
            
            alert(`Misreading detected! You misread the word: "${misreadWord}"`);
            // You can replace the alert with your preferred notification method
        } else {
            alert('Nabasa mo kahit bobo ka.');

            // Reset input field for another assessment
            sentenceInput.value = '';
            resultDiv.innerHTML = 'type ka pa ng kasunod.';
        }
    };

    startRecordingBtn.addEventListener('click', () => {
        recognition.start();
        startRecordingBtn.disabled = true;
        stopRecordingBtn.disabled = false;
    });

    stopRecordingBtn.addEventListener('click', () => {
        recognition.stop();
        startRecordingBtn.disabled = false;
        stopRecordingBtn.disabled = true;
    });
