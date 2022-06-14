When our training data is perfectly linearly separable, there are an infinite set of hyperplanes to choose a perfect classifier from. Which of these is the most "optimal" classifier? Assuming that real data is noiser than the training data, it would be sensible to say that an optimal classifier should:

1. Classify all training data perfectly
2. Be "maximally removed" from all the training data. (What would be better? a boundary that cuts the classification close for a lot of points or one that classifies them with sufficient distance?)

## Maximum Margin Classification

We can measure the distance of each point from the hyperplane using:

$\gamma^{(t)}(\theta, \theta_0) = \cfrac{y^{(t)}(\theta^T x^{(t)} + \theta_0)}{||\theta||}$

This is the geometric margin (of the point $t$), the functional margin is geometric margin times $||\theta||$

The geometric margin of the entire training set is $\min\limits_{t = 1, ..., n}\gamma^{(t)}$

So our problem of finding a "maximally removed" classifier is equivalent to maximising this geometric margin.

Note that maximising this geometric margin is equivalent to minimising $||\theta||$ which is equivalent to minimising $\cfrac{1}{2} ||\theta||^2$. Additionally, this minimisation problem is subject to the constraints that $y^{(t)}(\theta^T x^{(t)} + \theta_0) \geq 1 \; \forall \; t$. The choice for the $1$ on the right side of the constraint is arbitrary, any positive number would suffice (it implies that all points must be classified correctly)

If we two points exactly on the two marins $\theta^T x_+ + \theta_0 = 1$ and $\theta^T x_- + \theta_0 = -1$, then, the difference vector between the two points can be obtained by: $x_+ - x_-$. Now to get the width of the margin, we project it along the normal direction to the hyperplane:

$\cfrac{(x_+ - x_-) \cdot \theta}{||\theta||}$

$\cfrac{(1-\theta_0 - (-1-\theta_0))}{||\theta||}$

$\cfrac{(1-\theta_0 +1+\theta_0))}{||\theta||}$

$\cfrac{2}{||\theta||}$

Once again, to maximise this (the width of the margin) we can minimise $||\theta||$, to which end we can:

**Primal Form:** Minimise: $\cfrac{||\theta||^2}{2}$, subject to $y^{(t)}(\theta^T x^{(t)} + \theta_0) \geq 1$

Enter Lagrange Multipliers (dual):

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

$L = \cfrac{\theta^T\theta}{2} - \alpha^T \left( Y (X^T \theta + \theta_0 \vec{1}) - 1\right)$

$L = \cfrac{\left( X Y \alpha \right)^T X Y \alpha }{2} - \alpha^T \left( Y X^T X Y \alpha - 1\right)$

$L = \cfrac{\alpha^T Y X^T  X Y \alpha }{2} - \alpha^T \left( Y X^T X Y \alpha - 1\right)$

Remember: the $1$ is a sneaky column vector!

$L = \cfrac{\alpha^T Y X^T  X Y \alpha }{2} - \alpha^T Y X^T X Y \alpha + \alpha^T1$

$L = \alpha^T1 - \cfrac{\alpha^T Y X^T  X Y \alpha }{2}$

Non vector form:

$L = \sum\limits_{i} \alpha_i - \cfrac{1}{2} \sum\limits_{i}\sum\limits_{j} \alpha_i \alpha_j y_i y_j \vec{x_i}^T \vec{x_j}$

Since $\theta$ is a linear combination of some of the vectors $\vec{x_i}$ for which $\alpha_i > 0$ and $y_i \theta^T x_i = 1$, they are called **support vectors**

The rest are non support vectors since $\alpha_i = 0$ and $y_i \theta^T x_i > 1$ and thus do not contribute to $\theta$

## Soft Margin Classification

