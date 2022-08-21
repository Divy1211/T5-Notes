## Non Linearly Separable Case

*Empirical Risk*

$R_n (\theta) = \cfrac{1}{n}\sum\limits_{t=1}^{n} \text{Loss}(y^{(t)} (\theta^T x^{(t)}))$

In our original *linearly separable* case, we chose

$\text{Loss}(y^{(t)} (\theta^T x^{(t)})) = |y^{(t)} - y^{(t)} (\theta^T x^{(t)})|/2$

This is known as *zero-one loss*. We will change the metric of loss evaluation to *hinge loss*,

$\text{Loss}(y^{(t)} (\theta^T x^{(t)})) = max\{1 - y^{(t)} (\theta^T x^{(t)}), 0\}$

here, $z = y^{(t)} (\theta^T x^{(t)})$ is called the *agreement*

This forces the classifier's predictions to be more than just **correct**. Basically, in zero-one loss, the loss was binary, but now its a continuous range. This function happens to be convex, so we can carry out minimisation using gradient descent.

## Sub Gradient Descent

$\nabla_{\theta} R_n(\theta) = \left[\cfrac{\partial R_n(\theta)}{\partial\theta_1}, ..., \cfrac{\partial R_n(\theta)}{\partial\theta_d}\right]^T$

$\theta^{(k+1)} = \theta^{(k)} - \eta_k \nabla_{\theta} R_n (\theta^{(k)})$

$\eta_k$ is known as the *step size* or *learning rate*

The function $R_n(\theta)$ is a piece-wise function - there are points where it is not differentiable, because we have multiple possible gradients (derivative from multiple directions are different). At these points, any one of the possible gradients can be chosen for our algorithm

## Stochastic Sub Gradient Descent

When there are many training examples, we can select one at random and perform a parameter update on the basis of the corresponding loss alone (similar to the perceptron rule). If we take small enough steps, these stochastic updates, in aggregate, move the parameters roughly in the same direction as the gradient.

$\theta^{(k+1)} = \theta^{(k)} - \eta_k \nabla_{\theta} R_n (\theta^{(k)})$

Here, the $R_n(\theta^{(k)})$ is just for one point, simply: $\text{Loss}(y^{(t)}((\theta^{(t)})^T x^{(t)}))$

$\nabla_{\theta} R_n (\theta^{(k)}) = \nabla_{\theta} \text{Loss}(y^{(t)}((\theta^{(t)})^T x^{(t)}))$

$\nabla_{\theta} R_n (\theta^{(k)}) = \nabla_{\theta} (1 - y^{(t)}((\theta^{(t)})^T x^{(t)}))$

$\nabla_{\theta} R_n (\theta^{(k)}) = - y^{(t)} x^{(t)}$

if $y^{(t)}((\theta^{(t)})^T x^{(t)}) \leq 1$ then

$\theta^{(k+1)} = \theta^{(k)} + \eta_k y^{(t)} x^{(t)}$

The differences from the perceptron algorithm are:
   
1. The mistakes are penalised linearly, instead of in a binary fassion
2. Here, the $\eta_k$ is decreased over the iterations, instead of being fixed
3. Additionally, the "mistake", i.e. when the update is made is now defined in terms of $z \leq 1$ instead of $z < 0$
4. The training points are chosen at random, than cycling through them in order, to prevent the updates from oscillating

$\eta_k = \cfrac{1}{k+1}$ is a choice of $\eta_k$ that ensures that the SSGD converges. Any choice that satisfies $\sum\limits_{k=1}^{\infty} \eta_k^2 < \infty$ and $\sum\limits_{k=1}^{\infty} \eta_k = \infty$ makes the algorithm converge
