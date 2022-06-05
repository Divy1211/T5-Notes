## What is ML

A computer program learns from XP (E) wrt task (T) and perf measure (P) if P on T improves with E.

## No free lunch rule:

1. Training and testing data come from the same distribution
2. Some assumptions and biases

## Factors affecting perf
1. quality of training data
2. Form and extent of initial background knowledge
3. type of feedback provided
4. learning algo used

### Two important factors
1. **Modelling**
2. **Optimisation**

## Types of ML

### Based on Info available
1. Supervised ($\{x_n \in \mathbb{R}^d, y_n \in \mathbb{R}\}^N_{n=1}$)
      1. classification
      2. regression
2. Unsupervised ($\{x_n \in \mathbb{R}^b\}^N_{n=1}$)
      1. clustering
      2. probability distribution estimation
      3. finding associations in features
      4. dimension reduction
3. Semi Supervised
4. Reinforcement
      1. Decision making (robots, games)

### Based on learner's role
1. Passive - What most ML models are, use data to produce a model
2. Active - Query the environment, perform experiments

## Different ML Problems

### Classification Problem

Tumor classification: Find a good **classifier** - a mapping (function) from samples to labels normal/tumor

A sample is represented using a **feature vector**. For instance, the coordinates of this vector could be constructed from a measure of activeness of each gene in the tissue cells. The assumption here is that this info is sufficient to determine malignance.

It is important to follow the same protocol to construct feature vectors for training samples and any new samples to be classified.

### Gender from images

How do we represent the feature vectors? We could just concat the pixel values of the high res image but this may not work very well, because this is an overwhelming amount of information that is left to the classifier to figure out. A better first step might be to classify the image based on easier-to-determine features such as skin colour, edge detection, eyes, hair using simpler classifiers. Then, we can use the above as a 2nd feature vector to use for a gender classifier.
