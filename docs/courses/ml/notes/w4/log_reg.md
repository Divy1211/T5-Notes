Logistic regression is another linear model that outputs a probability (confidence score) between 0 and 1. The output is real and bounded. Logistic regression can be used to make predictions about something with a certain probability (instead of a binary classification), for lets say the probability diabetes occuring in a person depending on their BP, height, weight, age, etc.

The output of logistic regression is given by pluggin in the original hypothesis function into a sigmoid function:

$\sigma(x) = h(x) = \cfrac{exp(\theta^T x + \theta_0)}{1 + exp(\theta^T x + \theta_0)}$