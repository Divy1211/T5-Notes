When our training data is perfectly linearly separable, there are an infinite set of hyperplanes to choose a perfect classifier from. Which of these is the most "optimal" classifier? Assuming that real data is noiser than the training data, it would be sensible to say that an optimal classifier should:

1. Classify all training data perfectly
2. Be "maximally removed" from all the training data. (What would be better? a boundary that cuts the classification close for a lot of points or one that classifies them with sufficient distance?)

## Maximum Margin Separators

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

Once again, to maximise this (the width of the margin) we can minimise $||\theta||$, to which end we can minimise:

**Primal Form:** $\cfrac{||\theta||^2}{2}$, subject to $y^{(t)}(\theta^T x^{(t)} + \theta_0) \geq 1$

The dual form of this can thus be obtained with lagrange multipliers

