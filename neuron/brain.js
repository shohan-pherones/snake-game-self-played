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

  mutate() {
    tf.tidy(() => {
      const weights = this.model.getWeights();
      const mutatedWeights = [];

      for (let i = 0; i < weights.length; i++) {
        let tensor = weights[i];
        let shape = weights[i].shape;
        let values = tensor.dataSync().slice();

        for (let j = 0; j < values.length; j++) {
          if (random() < MUTATION_RATE) {
            let w = values[j];
            values[j] = w + randomGaussian();
          }
        }

        let newTensor = tf.tensor(values, shape);
        mutatedWeights[i] = newTensor;
      }

      this.model.setWeights(mutatedWeights);
    });
  }

  copy() {
    return tf.tidy(() => {
      const modelCopy = this.createModel();
      const weights = this.model.getWeights();
      const weightCopies = [];
      for (let i = 0; i < weights.length; i++) {
        weightCopies[i] = weights[i].clone();
      }
      modelCopy.setWeights(weightCopies);

      let brain = new Brain();
      brain.model = modelCopy;
      brain.mutate();

      return brain;
    });
  }

  predict(inputs) {
    return tf.tidy(() => {
      const tensor2d = tf.tensor2d([inputs]);
      const prediction = this.model.predict(tensor2d);
      const outputs = prediction.dataSync();

      return outputs;
    });
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
