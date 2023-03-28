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

  // Mutating the weights of a neural network model in a genetic algorithm with a given mutation rate and a random Gaussian function.
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

  // Copying weights to the new model, mutates the copied model, and returns a new brain object with the mutated copied model.
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

  // Predicting the output using a neural network model, gets the output values, and returns the predicted outputs.
  predict(inputs) {
    return tf.tidy(() => {
      const tensor2d = tf.tensor2d([inputs]);
      const prediction = this.model.predict(tensor2d);
      const outputs = prediction.dataSync();

      return outputs;
    });
  }

  // Creating a sequential model with a hidden layer of sigmoid activation and an output layer of sigmoid activation.
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
