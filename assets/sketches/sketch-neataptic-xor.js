var myTrainingSet = [
    { input: [0, 0], output: [0] },
    { input: [0, 1], output: [1] },
    { input: [1, 0], output: [1] },
    { input: [1, 1], output: [0] }
];
var myNetwork;
function setup() {
    var c = createCanvas(400, 400);
    c.parent("sketchcontainer");
    background(200);
    myNetwork = neataptic.architect.Perceptron(2, 3, 1);
}
function draw() {
    myNetwork.train(myTrainingSet, {
        log: 10,
        error: 0.02,
        iterations: 1000,
        rate: 0.3
    });
    var resolution = 10;
    var rows = height / resolution;
    var cols = width / resolution;
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var x1 = i / cols; // 0 to 1
            var x2 = j / rows; // 0 to 1
            var inputs = [x1, x2];
            var y = myNetwork.activate(inputs);
            fill(y * 255);
            rect(j * resolution, i * resolution, resolution, resolution);
        }
    }
}
var el = document.getElementById("stats");
function createElement(content) {
    var element = document.createElement('div');
    element.innerHTML = content;
    el.appendChild(element);
}
var result1 = myNetwork.activate([0, 0]); // [0.1257225731473885]
createElement("result 1: " + result1);
myNetwork.activate([0, 1]); // [0.9371910625522613]
myNetwork.activate([1, 0]); // [0.7770757408042104]
myNetwork.activate([1, 1]); // [0.1639697315652196]
