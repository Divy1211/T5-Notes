When our training data is perfectly linearly separable, there are an infinite set of hyperplanes to choose a perfect classifier from. Which of these is the most "optimal" classifier? Assuming that real data is noiser than the training data, it would be sensible to say that an optimal classifier should:

1. Classify all training data perfectly
2. Be "maximally removed" from all the training data. (What would be better? a boundary that cuts the classification close for a lot of points or one that classifies them with sufficient distance?)

## Maximum Margin Classification

We can measure the distance of each point from the hyperplane using:

$\gamma^{(t)}(\theta, \theta_0) = \cfrac{y^{(t)}(\theta^T x^{(t)} + \theta_0)}{||\theta||}$

This is the geometric margin (of the point $t$), the functional margin is geometric margin times $||\theta||$

The geometric margin of the entire training set is $\min\limits_{t = 1, ..., n}\gamma^{(t)}$

the function $h(x) = \theta^T x + \theta_0$ is known as the discriminant function

So our problem of finding a "maximally removed" classifier is equivalent to maximising this geometric margin.

Note that maximising this geometric margin is equivalent to minimising $||\theta||$ which is equivalent to minimising $\cfrac{1}{2} ||\theta||^2$. Additionally, this minimisation problem is subject to the constraints that $y^{(t)}(\theta^T x^{(t)} + \theta_0) \geq 1 \; \forall \; t$. The choice for the $1$ on the right side of the constraint is arbitrary, any positive number would suffice (it implies that all points must be classified correctly)

If we two points exactly on the two marins $\theta^T x_+ + \theta_0 = 1$ and $\theta^T x_- + \theta_0 = -1$, then, the difference vector between the two points can be obtained by: $x_+ - x_-$. Now to get the width of the margin, we project it along the normal direction to the hyperplane:

$\cfrac{(x_+ - x_-) \cdot \theta}{||\theta||}$

$\cfrac{(1-\theta_0 - (-1-\theta_0))}{||\theta||}$

$\cfrac{(1-\theta_0 +1+\theta_0))}{||\theta||}$

$\cfrac{2}{||\theta||}$

Once again, to maximise this (the width of the margin) we can minimise $||\theta||$, to which end we can:

**Primal Form:** Minimise: $\cfrac{||\theta||^2}{2}$, subject to $y^{(t)}(\theta^T x^{(t)} + \theta_0) \geq 1$

Enter KKT (dual):

(Remember the complementary slackness condition and the dual feasibility condition imposed by KKT on the solution)

$L = \cfrac{||\theta||^2}{2} - \sum\limits_{i = 1}^{n} \alpha_i \left(y_i (\theta^T \vec{x_i} + \theta_0) - 1 \right)$

Convert to vector form:

$L = \cfrac{\theta^T\theta}{2} - \alpha^T \left(Y (X^T \theta + \theta_0 \vec{1}) - \vec{1}\right)$

here, $X$ is a $d \times n$ matrix whose columns are the feature vectors, and $Y$ is an $n \times n$ matrix where the diagonals are components of $\vec{y}$

$\cfrac{\partial L}{\partial \theta} = \theta - X Y \alpha = 0$ (remember $Y^T = Y$ in this case)

$\theta = X Y \alpha \;\; ... \;\;\;\; (i)$

non vector form: $\vec{\theta} = \sum\limits_{i} \alpha_i y_i \vec{x_i}$

$\cfrac{\partial L}{\partial \theta_0} = \alpha^T Y \vec{1} = 0$

$\alpha^T Y \vec{1} = 0 \;\ ... \;\;\;\; (ii)$

non vector form: $\sum\limits_{i}\alpha_i y_i  = 0$

use $(i)$ and $(ii)$ in:

$L = \cfrac{\theta^T\theta}{2} - \alpha^T \left( Y (X^T \theta + \theta_0 \vec{1}) - \vec{1}\right)$

$L = \cfrac{\left( X Y \alpha \right)^T X Y \alpha }{2} - \alpha^T \left( Y X^T X Y \alpha - \vec{1}\right)$

$L = \cfrac{\alpha^T Y X^T  X Y \alpha }{2} - \alpha^T \left( Y X^T X Y \alpha - \vec{1}\right)$

$L = \cfrac{\alpha^T Y X^T  X Y \alpha }{2} - \alpha^T Y X^T X Y \alpha + \alpha^T\vec{1}$

$L = \alpha^T\vec{1} - \cfrac{\alpha^T Y X^T  X Y \alpha }{2}$

Non vector form:

$L = \sum\limits_{i} \alpha_i - \cfrac{1}{2} \sum\limits_{i}\sum\limits_{j} \alpha_i \alpha_j y_i y_j \vec{x_i}^T \vec{x_j}$

Since $\theta$ is a linear combination of some of the vectors $\vec{x_i}$ for which $\alpha_i > 0$ and $y_i \theta^T x_i = 1$, they are called **support vectors**

The rest are non support vectors since $\alpha_i = 0$ and $y_i \theta^T x_i > 1$ and thus do not contribute to $\theta$

## Soft Margin Classification

In the real world, data is often not nice and not linearly separable. In that case, a hard maximal margin classifier will not know what to do. Thus, to still be able to make classification work on non linearly separable data, we can allow some points (some outliers) to be misclassified by the classifier. This however should be reflected by some additional penality in our cost function. After all, we want to reduce misclassification as much as possible.

To make this work, our original optimisation problem is modified in the following way:

**Primal Form:** Minimise: $\cfrac{\lambda}{2}||\theta||^2 + \sum\limits_{t}\xi^{(t)}$, subject to $y^{(t)}(\theta^T x^{(t)} + \theta_0) \geq 1 - \xi^{(t)}$ and $\xi^{(t)} \geq 0$

Here, $\lambda$ is a regularisation parameter. Increasing its value means we give more importance to minimising $||\theta||$ and lesser importance to actually satisfy the classification constraints, since if we increase $\lambda$, the $||\theta||$ term dominates the expression

Enter KKT (dual):

$L = \cfrac{\lambda}{2}||\theta||^2 + \sum\limits_{i = 1}^{n} \xi_i - \sum\limits_{i = 1}^{n} \alpha_i \left(y_i (\theta^T \vec{x_i} + \theta_0) - 1 + \xi_i \right) - \sum\limits_{i = 1}^n \mu_i \xi_i$

Convert to vector form:

$L = \cfrac{\lambda}{2}\theta^T\theta + \xi^T \vec{1} - \alpha^T \left(Y (X^T \theta + \theta_0 \vec{1}) - \vec{1} + \xi \right) - \mu^T \xi$

$\cfrac{\partial L}{\partial \theta} = \lambda\theta - X Y \alpha = 0$

$\theta = \cfrac{X Y \alpha}{\lambda} \;\; ... \;\;\;\; (i)$

non vector form: $\vec{\theta} = \cfrac{1}{\lambda} \sum\limits_{i} \alpha_i y_i \vec{x_i}$

$\cfrac{\partial L}{\partial \theta_0} = \alpha^T Y \vec{1} = 0$

$\alpha^T Y \vec{1} = 0 \;\ ... \;\;\;\; (ii)$

non vector form: $\sum\limits_{i}\alpha_i y_i  = 0$

$\cfrac{\partial L}{\partial \xi} = \vec{1}^T - \alpha^T - \mu^T = 0$

$\alpha = \vec{1} - \mu \;\ ... \;\;\;\; (iii)$

non vector form: $\alpha_i = 1 - \mu_i$

Using these relations in the Lagrangian:

$L = \cfrac{\alpha^T Y X^T X Y \alpha}{2\lambda} + \xi^T \vec{1} - \alpha^T Y (\cfrac{X^T X Y \alpha}{\lambda} + \theta_0 \vec{1}) + \alpha^T \vec{1} - \alpha^T \xi - \mu^T \xi$

$L = \cfrac{\alpha^T Y X^T X Y \alpha}{2\lambda} + \xi^T \vec{1} - \cfrac{\alpha^T Y X^T X Y \alpha}{\lambda} + \alpha^T \vec{1} - (\vec{1} - \mu)^T \xi - \mu^T \xi$

$L = \alpha^T \vec{1} - \cfrac{\alpha^T Y X^T X Y \alpha}{2\lambda}$

By KKT, we have:

$\alpha \in (0, 1/\lambda)$ for SV and $\alpha = 1/\lambda$ for margin violations

## The Kernel Method

What if we have data that is linearly inseparable and there is no clear way to use soft margin classification effectively? Enter the kernel method.

The motivation behind this method is that we want to map the feature vectors from their feature space into a higher dimension where they become linearly separable. This is useful because there is a theorem called **Cover's Theorem** which tells us that when lower dimensional data is mapped into a higher dimension, the probability of it becoming linearly separable is high.

For example, consider a 2D vector $x = \begin{bmatrix} x_1 & x_2 \end{bmatrix}^T$ we can use a function $\phi(x) = \begin{bmatrix} x_1^2 & x_2^2 & \sqrt{2} x_1 x_2 \end{bmatrix}^T$ to map it into 3D. Now we can use $\phi(x)$ in our dual problem instead of $x$ since that becomes our input vector and find a linear classifier in 3D!

There is however an issue with this approach that is not apparent with this small example. Consider if $x$ had 1000 components, the equivalent transformation for it into higher dimenson may result in a vector that has $1000 + \displaystyle\binom{1000}{2} \approx 500k$ dimensions! This is not feasable because working with a vector which is that big is not feasable.

There are however two things that help our case:

1. The dual problem that we saw earlier only depends on the dot product of the input feature vectors, not on a single feature vector itself
2. Thus, if the dot product of the mapped vectors after the kernel transformation can be represented in terms of the original vectors, we don't have to have added computational complexity due to the increased size of the mapped vectors! This is what a kernel function does!

For the example kernel function defined above: $\phi(x) = \begin{bmatrix} x_1^2 & x_2^2 & \sqrt{2} x_1 x_2 \end{bmatrix}^T$ we can see that:

$\phi(x)\cdot\phi(y) = x_1^2 y_1^2 + x_2^2 y_2^2 + 2 x_1 y_1 x_2 y_2 = (x_1 y_1 + x_2 y_2)^2 = (x_1 \cdot y_2)^2$

Additionally, even when we predict the labels using this technique, we do not have to go into a higher dimension because $\theta^T x$ can be expressed as $\sum\limits_{i}\alpha_i y_i \vec{x}_i^T x$ (in vector form, $\theta = X Y \alpha$ and $\hat{y} = X^T \theta = X^T X Y \alpha$) where once again only dot products are involved

Thus, a wisely chosen kernel function is super powerful because we are essentially able to leverage the linear classifiablility of data in higher dimensions without ever actually needing to go there!

### Radial Basis Function

An INFINITE dimensional kernel where $K(x, y) = \phi(x)\cdot\phi(y) = \exp(-|| x - y ||^2/2)$

### More Kernels

A function $K(x, y)$ is a valid kernel function iff there exists a $\phi(x)$ such that $K(x, y) = \phi(x)\cdot\phi(y)$

We can build more kernel functions following these rules:

1. $\color{orange}K = 1$ is a kernel function ($\color{orange}\phi(x) = 1$)
2. $\color{yellow}f : \mathbb{R}^d \to \mathbb{R}$ and if $\color{orange}K(x, y)$ is a valid kernel function, then so is $\color{lime}\tilde{K}(x, y) \color{white} = \color{yellow} f(x) \color{orange} K(x, y) \color{yellow} f(y)$ ($\color{lime}\tilde{\phi}(x) \color{white} = \color{yellow} f(x) \color{orange} \phi(x)$)
3. if $\color{orange} K_1$ and $\color{cyan} K_2$ are valid kernels, then so are $\color{orange} K_1 \color{white} + \color{cyan} K_2$ $\left( \color{lime} \phi(x) \color{white} = \begin{bmatrix} \color{orange} \phi_1(x) \\ \color{cyan} \phi_2(x) \end{bmatrix}\right)$ and $\color{orange}K_1 \color{cyan} K_2$ $\left( \color{lime} \phi(x) \color{white} = \color{orange}\phi_1(x) \color{cyan}\phi_2(x) \color{white}\right)$


$K(x, y) = (x \cdot y)^2 = (x \cdot y)(x \cdot y)$ (3)

$K(x, y) = x \cdot y + (x \cdot y)^2$ (3)

$K(x, y) = \exp(x \cdot y) = \sum\limits_{i = 0}^{1} \cfrac{(x \cdot y)^i}{i!}$

$\tilde{K}(x, y) = \exp(-|| x - y ||^2/2) = (\exp(-|| x ||^2/2) \exp(x \cdot y) \exp(-|| y ||)^2/2)$ (cosine rule)

here, $f(x) = \exp(-|| x ||^2/2)$ and $K(x, y) = \exp(x \cdot y)$

$K(x, y) = \exp(-|| x - y ||^2/2)$ Because this kernel has infinite dimensions, it will ALWAYS be able to classify data