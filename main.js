Webcam.set({
    width: 350,
    height: 350,
    image_format: 'png',
    png_quality: 9
});
camera = document.getElementById("camera");
Webcam.attach("#camera");

function takepic() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="capture_image" src="' + data_uri + '"/>';
    });
}
console.log("ml5 version:", ml5.version)
mymodel = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/CWra_IKxh/model.json", modelLoaded);

function modelLoaded() {
    console.log("Your model has loaded");
}

function speak() {
    synth = window.speechSynthesis;
    speak1 = "Your gesture is " + pred1;
    speak2 = "Or your gesture is " + pred2;
    utterthis = new SpeechSynthesisUtterance(speak1 + speak2)
    synth.speak(utterthis)
}

function check() {
    i1 = document.getElementById("capture_image");
    mymodel.classify(i1, gotResult)
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results)
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        pred1 = results[0].label;
        pred2 = results[1].label;
        speak()
        if (results[0].label == "Up") {
            document.getElementById("update_emoji").innerHTML = "&#9757;"
        }
        if (results[0].label == "Fist") {
            document.getElementById("update_emoji").innerHTML = "&#9994;"

        }
        if (results[0].label == "Peace") {
            document.getElementById("update_emoji").innerHTML = "&#9996;"
        }
        if (results[1].label == "Up") {
            document.getElementById("update_emoji2").innerHTML = "&#9757;"
        }
        if (results[1].label == "Fist") {
            document.getElementById("update_emoji2").innerHTML = "&#9994;"
        }
        if (results[1].label == "Peace") {
            document.getElementById("update_emoji2").innerHTML = "&#9996;"
        }
    }
}
