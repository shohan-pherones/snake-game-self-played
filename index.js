var canvas_width;
var canvas_height;
var details;
var geneticAlgorithm;
const BLOCK_SIZE = 20;

function setup() {
  canvas_width = windowWidth - 150;
  canvas_height = windowHeight - 200;
  adjustCanvasSize();
  tf.setBackend("cpu");

  geneticAlgorithm = new GeneticAlgorithm();
  details = createDiv("max score = 0<br />generation count = 0");
  details.position(50, canvas_height + 50);
  details.id = "details";
  details.style("color", "black");

  createCanvas(canvas_width, canvas_height);
  frameRate(300);
}

function adjustCanvasSize() {
  if (canvas_width % BLOCK_SIZE != 0) {
    canvas_width =
      Math.floor(canvas_width / BLOCK_SIZE) * BLOCK_SIZE + BLOCK_SIZE;
  }

  if (canvas_height % BLOCK_SIZE != 0) {
    canvas_height =
      Math.floor(canvas_height / BLOCK_SIZE) * BLOCK_SIZE + BLOCK_SIZE;
  }
}

function draw() {
  background(color(0, 0, 0));
  geneticAlgorithm.draw();
  details.html(`Current Maximum Score: ${geneticAlgorithm.maxGame()}<br />
  Generation Count: ${geneticAlgorithm.generation_count}<br />
  Maximum Score: ${geneticAlgorithm.bestAllTime}<br />
  Population Count: ${geneticAlgorithm.population.length}<br />
  Population Max: ${POPULATION_MAX}`);
}

function handle_keyboard() {
  if (keyIsDown(LEFT_ARROW) && snake.direction != RIGHT) {
    snake.moveLeft();
  } else if (keyIsDown(RIGHT_ARROW) && snake.direction != LEFT) {
    snake.moveRight();
  } else if (keyIsDown(UP_ARROW) && snake.direction != DOWN) {
    snake.moveUp();
  } else if (keyIsDown(DOWN_ARROW) && snake.direction != UP) {
    snake.moveDown();
  } else {
    snake.moveDefualt();
  }
}
