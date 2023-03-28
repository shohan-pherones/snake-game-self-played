# Self-Played Snake Game with Genetic Algorithm and Neural Network

This is a self-played snake game that uses genetic algorithm and neural network to learn and improve its gameplay over time. The game is built using the p5.js library for graphics and user interface, and the tensorflow.js and neataptic libraries for machine learning.

## Getting Started

To run the game on your local machine, follow these steps:

1. Clone the repository: `git clone https://github.com/shohan-pherones/snake-game-self-played.git`
2. Start the game

## How it Works

The self-played snake game is designed to learn and improve its gameplay over time. This is achieved using a combination of genetic algorithm and neural network.

The genetic algorithm works by evolving the snake's gameplay over multiple generations. It does this by selecting the fittest individuals from each generation and using them to create the next generation of snakes. The fitness of each individual is determined by how well they perform in the game, such as how long they survive and how many points they score. By selecting the fittest individuals, the algorithm ensures that the best traits of the snakes are passed on to the next generation.

The neural network is used to control the movement of the snake. It takes in input from the game state, such as the position of the snake and the location of the food, and outputs the direction for the snake to move. The network is trained using a combination of supervised and reinforcement learning techniques, with the goal of maximizing the snake's score and survival time. By adjusting the weights and biases of the network based on the results of each game, the network becomes more efficient at controlling the snake's movements over time.

Overall, the combination of genetic algorithm and neural network allows the self-played snake game to learn and adapt to different game scenarios, and ultimately, improve its gameplay over time.

## Acknowledgements

This project wouldn't have been possible without the following libraries and resources:

- [p5.js](https://p5js.org/) for graphics and user interface
- [TensorFlow.js](https://www.tensorflow.org/js) for machine learning capabilities
- [Neataptic](https://wagenaartje.github.io/neataptic/) for implementing the neural network
- [SnakeAI](https://github.com/jonatan5524/SnakeAI) for providing inspiration and guidance in creating the genetic algorithm

I would like to thank the developers of these libraries for making their tools available to the public and allowing me to build upon their work. Additionally, I would like to express my gratitude to the creator of SneakAI for providing a valuable resource and inspiring me to create this project.

I also want to thank the community for their support and feedback. If you have any questions or suggestions, feel free to join our [Discord server](https://discord.gg/aFwmyMUeRt) and say hello!

## Conclusion

In conclusion, this project has demonstrated the power of combining genetic algorithm and neural network to create a self-played snake game that learns and improves over time. By evolving the gameplay over multiple generations, the game becomes better at handling different scenarios and achieving higher scores. The neural network, powered by TensorFlow.js and Neataptic, enables the game to learn from its mistakes and make better decisions in real-time gameplay.

This project can serve as a starting point for anyone interested in exploring the intersection of machine learning and game development. It provides a framework for designing and implementing machine learning algorithms in games, and can be adapted for use in other games or simulations.

Overall, this project has been a rewarding experience and has opened up new possibilities for the development of intelligent game agents. I hope this project inspires others to explore this fascinating area of research and development.
