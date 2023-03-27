const INPUT_COUNT = 5;
const HIDDEN_COUNT = 7;
const OUTPUT_COUNT = 3;
const MUTATION_RATE = 0.1;

class Brain {
  constructor() {
    this.input_count = INPUT_COUNT;
    this.hidden_count = HIDDEN_COUNT;
    this.output_count = OUTPUT_COUNT;
    this.model = this.createModel();
  }

  dispose() {
    this.model.dispose();
  }

  createModel() {
    const model = tf.sequential();
    const hidden = tf.layers.dense({
      units: this.hidden_count,
      inputShape: [this.input_count],
      activation: "sigmoid",
    });
    model.add(hidden);

    const output = tf.layers.dense({
      units: this.output_count,
      activation: "sigmoid",
    });
    model.add(output);

    return model;
  }
}
