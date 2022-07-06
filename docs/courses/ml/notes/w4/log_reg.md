Logistic regression is another linear model that outputs a probability (confidence score) between 0 and 1. The output is real and bounded. Logistic regression can be used to make predictions about something with a certain probability (instead of a binary classification), for lets say the probability diabetes occuring in a person depending on their BP, height, weight, age, etc.

## Hypothesis Function

The output of logistic regression is given by pluggin in the original prediciton function into a sigmoid function:

$h(x) = \sigma(\theta^T x + \theta_0) = \cfrac{\exp(\theta^T x + \theta_0)}{1 + \exp(\theta^T x + \theta_0)}$

Here, $P(y | x) = \begin{cases} h(x) & y = 1 \\ 1 - h(x) & y = -1\end{cases}$

due to a property of the sigmoid function where $\sigma(-s) = 1 - \sigma(x)$ we can rewrite the probability as:

$P(y | x) = \sigma(y (\theta^T x + \theta_0))$

## Maximum Likelyhood Estimation

The probability of predicting all the training examples in a set $S_n$ are thus given by $p = \prod\limits_{i} P(y_i|x_i)$ This is the function that we will be maximising.

Maximising this is equivalent to maximising $\cfrac{\ln(p)}{n}$. This is because $\ln$ is a monotonically increasing function:

Maximise: $\cfrac{1}{n} \sum\limits_{i = 1}^{n} \ln(P(y_i | x_i))$

Minimise: $J(\theta) = \cfrac{1}{n} \sum\limits_{i = 1}^{n} \ln(1/P(y_i | x_i))$

Minimise: $J(\theta) = \cfrac{1}{n} \sum\limits_{i = 1}^{n} \ln(1 + \exp(-y_i (\theta^T x_i + \theta_0 )))$

The benifit of doing this is that deriving a sum is much more easy than deriving a product.

We can use both regular gradient descent or stochastic gradient descent to find the minima of this cost.

## Stochastic GD

$e_t(\theta) = \ln(1 + e^{\displaystyle -y_t \theta^T x_t})$

$\nabla_{\theta} e_t(\theta) = \cfrac{1}{(1 + e^{\displaystyle -y_t \theta^T x_t})} \times e^{\displaystyle -y_t \theta^T x_t} (-y_t \theta^T x_t)$

$\nabla_{\theta} e_t(\theta) = \cfrac{-y_t \theta^T x_t}{(1 + e^{\displaystyle y_t \theta^T x_t})}$

Then the weight update is:

$\theta_{t+1} = \theta_t - \eta \nabla_{\theta} e_t (\theta)$ 

## Prediction

Our prediction is $1$ iff:

1. $P(y = +1|x) \geq 0.5$
2. $P(y = +1|x) > P(y = -1|x) \implies P(y = +1|x)/P(y = -1|x) \geq 1$
3. $\theta^T x \geq 0$ (by taking $\ln$ of the above inequality)