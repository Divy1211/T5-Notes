When our training data is perfectly linearly separable, there are an infinite set of hyperplanes to choose a perfect classifier from. Which of these is the most "optimal" classifier? Assuming that real data is noiser than the training data, it would be sensible to say that an optimal classifier should:

1. Classify all training data perfectly
2. Be "maximally removed" from all the training data. (What would be better? a boundary that cuts the classification close for a lot of points or one that classifies them with sufficient distance?)

## Maximum Margin Separators

We can measure the distance of each point from the hyperplane using:

$\gamma^{(t)}(\theta, \theta_0) = \cfrac{y^{(t)}(\theta^T x^{(t)} + \theta_0)}{||\theta||}$

This is the geometric margin (of the point $t$), the functional margin is geometric margin times $||\theta||$

The geometric margin of the entire training set is $\min\limits_{t = 1, ..., n}\gamma^{(t)}$

So our problem of finding a "maximally removed" classifier is equivalent to maximising this geometric margin.

To minimise the geometric
