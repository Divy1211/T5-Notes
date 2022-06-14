When choosing a model, the following things need to be considered:

1. How are the errors measured? What is the criterion for choosing $\hat{\theta}$ and $\hat{\theta_0}$
2. What algorithm can be used to optimise the training criterion? How does the algorithm scale with dimension of feature vectors and size of training set?
3. When the size of the dataset is not large enough in relation to the number of dimensions, there may be degrees of freedom (directions in the parameter space) that remain unconstrained. How do we set those DoF? This is a part of a bigger problem called regularisation. The question is how to softly constrain the set of functions $\mathcal{F}$ to achieve a better generalisation

## Linear Regression

A linear regression function is a linear function of feature vectors:

$f(x, \theta, \theta_0) = \theta^T x + \theta_0 = \sum\limits_{i=1}^{d} \theta_i x_i + \theta_0$

For different choices of $\theta \in \mathbb{R}^d, \theta_0 \in \mathbb{R}$ gives rise to a set of functions $\mathcal{F}$. The power of the regression algorithm lies in selecting appropriate feature vectors to use as input to these functions, since we have 100% control over how the feature vectors are constructed.

Assuming a proper feature vector representation of the data has been found:

$R_n (\theta) = \cfrac{1}{n}\sum\limits_{t=1}^{n} \text{Loss}(y^{(t)} - \theta^T x^{(t)})$

Use square error as loss:

$\text{Loss}(y^{(t)} - \theta^T x^{(t)}) = (y^{(t)} - \theta^T x^{(t)})^2/2$

1. Estimation Error: Small dataset leads to high estimation error (variance) and overfitting, where we model something linear as more complex
2. Structural Error: Having a small set of functions $\mathcal{F}$ leads to high structural error (bias) and underfitting, where we model something more complex as something linear.

In order to reduce structural error, we need to use a large set of functions $\mathcal{F}$ but this means that if the training dataset is noisy $S_n$, it is harder to select the correct function $f$ from a larger set $\mathcal{F}$. Thus striking the right balance between the two is an essential part of ML problems!

The parameter $\hat{\theta}$ can be viewed as a function of $S_n$

### Optimising Least Squares Criterion With Gradient Descent

stochastic gradient descent may be used to minimise $R_n$. In this case, $R_n(\theta)$ is differentiable everywhere.

$\nabla_{\theta} (y^{(t)} - \theta^T x^{(t)})^2/2 = (y^{(t)} - \theta^T x^{(t)}) \nabla_{\theta} (y^{(t)} - \theta^T x^{(t)})$

$= - (y^{(t)} - \theta^T x^{(t)}) x^{(t)}$

Thus, the algo becomes

1. Set $\theta^{(0)} = 0$
2. Pick $t \in \{1, 2, ..., n\}$
3. $\theta^{(k+1)} = \theta^{(k)} + \eta_k (y^{(t)} - \theta^T x^{(t)})x^{(t)}$

Once we go through the entire dataset once, we call it ONE epoch

Here, $\eta_k = \cfrac{1}{k+1}$

### Closed Form Optimal Solution For Least Squares Criterion

We can try to find a closed form solution by setting the gradient to 0 and solving for $\hat{\theta}$

$$\nabla_{\theta} R_n(\hat{\theta}) = \cfrac{1}{n}\sum\limits_{t=1}^{n} - (y^{(t)} - \hat{\theta}^T x^{(t)}) x^{(t)}$$

$$= -\cfrac{1}{n}\sum\limits_{t=1}^{n} y^{(t)} x^{(t)} + \cfrac{1}{n}\sum\limits_{t=1}^{n} \hat{\theta}^T x^{(t)} x^{(t)}$$

$$= -\cfrac{1}{n}\sum\limits_{t=1}^{n} y^{(t)} x^{(t)} + \cfrac{1}{n}\sum\limits_{t=1}^{n} x^{(t)} (x^{(t)})^T \hat{\theta}$$

Remember, $y^{(t)}$ is a scalar and $x^{(t)}$ is a column vector

$$= -\cfrac{1}{n} \begin{bmatrix}
    x^{(1)} & x^{(2)} & ... & x^{(n)}
\end{bmatrix} \begin{bmatrix}
    y^{(1)} \\
    y^{(2)} \\
    ... \\
    y^{(n)} \\
\end{bmatrix} + \cfrac{1}{n} \begin{bmatrix}
    x^{(1)} & x^{(2)} & ... & x^{(n)}
\end{bmatrix} \begin{bmatrix}
    (x^{(1)})^T \\
    (x^{(2)})^T \\
    ... \\
    (x^{(n)})^T \\
\end{bmatrix} \hat{\theta}$$

$$= -b + A \hat{\theta}$$

where $b = \cfrac{1}{n}X \vec{y}$ and $A = \cfrac{1}{n}X X^T$

and $X$ is a $d \times n$ matrix

$$X = \begin{bmatrix} x^{(1)} & x^{(2)} & ... & x^{(n)} \end{bmatrix}$$

If A is invertible, we get $\hat{\theta} = A^{-1}b$

Inverting $A$ is about $\mathcal{O}(d^3)$ time complexity, hence when $d$ is large, we opt for stochastic gradient descent.

## Ridge Regression

When $A$ is not invertible, we say that the learning problem is ill posed. This usually happens when we don't have enough data points in comparison to the dimension of the data points. So how do we set the parameter $\theta$ in this case?

The estimation criterion is modified by adding a *regularisation term*. The purpose of this term is to bias the parameters towards a default answer such as zero. The regularisation will resist moving the parameters away from zero, even if the data may weakly indicate otherwise. This helps ensure that the predictions generalise well. The intuition is that we want to go for the "simplest" answer when sufficient evidence is not present.

Among the many different choices of regularisation terms, $||\theta||^2/2$ can be used, as it keeps the problem easily solvable.

$J_{n, \lambda} = \cfrac{\lambda ||\theta||^2}{2} + R_n(\theta)$. Here, $\lambda$ is known as the regularisation parameter. It controls the "trade off" between keeping the parameters close to 0 and actually fitting them to the data. Using this as our objective function instead of $R_n(\theta)$ gives us ridge regression

$\theta^{(k+1)} = (1 - \lambda \eta_k) \theta^{(k)} + \eta_k (y^{(t)} - \theta^T x^{(t)})x^{(t)}$

A convex curve is obtained as we increas $\lambda$ from $0$