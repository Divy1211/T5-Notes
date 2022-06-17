Logistic regression is another linear model that outputs a probability (confidence score) between 0 and 1. The output is real and bounded. Logistic regression can be used to make predictions about something with a certain probability (instead of a binary classification), for lets say the probability diabetes occuring in a person depending on their BP, height, weight, age, etc.

The output of logistic regression is given by pluggin in the original prediciton function into a sigmoid function:

$h(x) = \sigma(\theta^T x + \theta_0) = \cfrac{\exp(\theta^T x + \theta_0)}{1 + \exp(\theta^T x + \theta_0)}$

Here, $P(y | x) = \begin{cases} h(x) & y = 1 \\ 1 - h(x) & y = -1\end{cases}$

due to a property of the sigmoid function where $\sigma(-s) = 1 - \sigma(x)$ we can rewrite the probability as:

$P(y | x) = \sigma(y (\theta^T x + \theta_0))$

The probability of predicting all the training examples in a set $S_n$ are thus given by $p = \prod\limits_{i} P(y_i|x_i)$ This is the function that we will be maximising.

Maximising this is equivalent to maximising $\cfrac{\ln(p)}{n}$. This is because $\ln$ is a monotonically increasing function:

Maximise: $J(\theta) = \cfrac{1}{n} \sum\limits_{i = 1}^{n} \ln(P(y_i | x_i))$

The benifit of doing this is that deriving a sum is much more easy than deriving a product.

We can use both regular gradient descent or stochastic gradient descent to find the minima of this cost.

Ultimately, our predictions are made as follows: $P \geq 0.5$ the classify as $1$ else $-1$. This is equivalent to saying that we classify as $1$ when $\theta^T x \geq 0$ and else as $-1$
