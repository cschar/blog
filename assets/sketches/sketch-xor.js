let nn;
let lr_slider;
let middle_layer_slider;
let middle_layer_label;
let reset_nn;


//hardcode into program!
//normally external lol
let training_data = [
    {
        inputs: [0,0],
        outputs: [0]
    },
    {
        inputs: [0,1],
        outputs: [1]
    },
    {
        inputs: [1,0],
        outputs: [1]
    },
    {
        inputs: [1,1],
        outputs: [0]
    }
]

function setup(){
    var c = createCanvas(400,400)
    c.parent("sketchcontainer")
    textSize(20)
    nn = new NeuralNetwork(2,2,1);

    // nn.train([0,0], [1]);
    //p5.dom function
    lr_slider = createSlider(0.01,0.5, 0.1, 0.01)
    lr_slider.parent("slider")
    lr_slider.changed(lr_slider_changed_action)
    lr_slider_label = createDiv('').size(100, 40);
    lr_slider_label.html('learning_rate: ' + lr_slider.value());
    lr_slider_label.parent("slider")

    middle_layer_slider = createSlider(2,6,2,1)
    middle_layer_slider.parent("middlelayer")
    middle_layer_slider.changed(middlelayer_changed_action)
    reset_nn = createButton('reset with middle layer count');
    reset_nn.parent("middlelayer")
    reset_nn.style("height","50px")
    reset_nn.addClass("btn")
    middle_layer_label = createDiv('').size(100, 40);
    middle_layer_label.html('layers 2x' + middle_layer_slider.value() + "x1");
    middle_layer_label.parent("middlelayer")

    
    // reset_nn.position(19, 19);
    reset_nn.mousePressed(reset_nn_action);
    
}

function reset_nn_action(){
    nn = new NeuralNetwork(2, middle_layer_slider.value(), 1)
    training_count = 0;
}

function middlelayer_changed_action(){
    middle_layer_label.html('layers 2x' + middle_layer_slider.value() + "x1");
}

function lr_slider_changed_action(){
    lr_slider_label.html('learning_rate: ' + lr_slider.value())
}


let training_count = 0;

function draw(){
    background(30);
    
    for(let i =0 ; i < 1000; i++){
        let data = random(training_data)
        nn.train(data.inputs, data.outputs)
    }
    training_count += 1;

    nn.setLearningRate(lr_slider.value());

    let resolution = 10;
    let cols = width /  resolution;
    let rows = height / resolution;

    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++){
            let x1 = i / cols; // 0 to 1
            let x2 = j / rows; // 0 to 1
            let inputs = [x1, x2];
            
            let y = nn.predict(inputs);

            fill(y*255);
            rect(i*resolution, j*resolution, resolution,resolution);
        }
    }

    fill(244)

    text("traning(x1000): " + training_count, 10,30)
    
}