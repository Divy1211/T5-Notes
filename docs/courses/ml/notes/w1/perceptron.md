## The ML Model

A feature (col) vector $x = [x_1, ... x_d]^T \in \mathbb{R}^d$. In the context where $x$ is used as the original object, $\phi(x)$ is the feature vector constructed from it

In each example, $x$ is associated with a binary label $y \in \{-1, 1\}$. The training data $S_n$ consists of of pairs $(x^{(i)}, y^{(i)})$. A classifier is a mapping from feature vectors to labels: $h : \mathbb{R}^d \rightarrow \{-1, 1\}$:

1. **Set of classifiers $\mathcal{H}$**. This is also known as the *model* or the *hypothesis class*. The larger this set is, the more powerful the ML model is. This is because there are many hypothesis on how the features relate to the labels.
2. **Learning algorithm/criterion**. The problem of finding an $\hat{h} \in \mathcal{H}$ based on the trainig dataset $S_n$ is solved by the learning algorithm. Many learning algorithms or corresponding estimation criteria might use the same set of classifiers $\mathcal{h}$ but select different classifiers in response to the training set.
3. **Generalisation**. The goal of the learning algorithm is to find a classifier $\hat{h} \in \mathcal{H}$ which will work well on unseen examples of $S_n$. A classifier that predicts all the trainig data correctly may not generalise well -> potentially overfitting. The right set of classifiers must neither be too large (contains clearly different functions) or too small (it may not contain the right $\hat{h}$ at all). This is known as the *model selection problem*

## Linear Classification

$h(x, \theta) = sign(\theta^T x) = sign(\theta_1 x_1 + \theta_2 x_2 + ... + \theta_d x_d \geq 0)$

$h(x, \theta) = +1 \text{ if } \theta^T x \geq 0 \text{ else } -1$

$h(x, \theta) = +1 \text{ if } \theta_1 x_1 + \theta_2 x_2 + ... + \theta_d x_d \geq 0 \text{ else } -1$

This is called a linear classifier because geometrically, a hyper ($d$) plane separates the two regions of classification. The decision boundary is the plane itself, where $\theta x = 0$

$\mathcal{X}^{+}(\theta) = \{ x \in \mathbb{R}^d | h(x_i, \theta) = +1\}$

$\mathcal{X}^{-}(\theta) = \{ x \in \mathbb{R}^d | h(x_i, \theta) = -1\}$

Now that we have chosen a set of classifiers ($\mathbb{R}^d$), we need to determine a specific one by setting $\theta$. For linear classification, we can just use the one with the fewest errors over the training data, i.e. the classifier that minimises:

$\varepsilon_n (\theta) = \cfrac{1}{n}\sum\limits_{t=1}^{n}|y^{(t)} - h(x, \theta)|/2$

Choosing an algorithm that can minimise $\varepsilon_n$ is not an easy problem to solve. We consider a special case where there exists a linear classifier (through origin) that achieves 0 training error. This is also known as the **realisable case**. **Realisability** depends on the training examples and the set of classifiers that we use. For linear classifiers, the assumption is made that training examples are **linearly separable through the origin**

A set of labled points $S_n = \{ (x^{(t)}, y^{(t)}), t = 1, ..., n\}$ are *linearly separable through the origin* if there exists a parameter vector $\hat{\theta}$ such that $y^{(t)}(\hat{\theta}^T x^(t)) > 0$ for all $t = 1, ..., n$

## Perceptron Algorithm

**Mistake Driven**. Start with a random classifier, say $\hat{\theta} = 0$ and successively tries to adjust the parameters, based on each training example, so as to correct any mistakes. The following is known as the **update rule**

if $y^{(t)} \neq h(x^{(t)}, \theta^{(k)})$ then

$\theta^{(k+1)} = \theta^{(k)} + y^{(t)}x^{(t)}$

The reason why this works is because, a mistake means that the sign of the label and the classifier disagree, i.e. $y^{(t)} ((\theta^{(k)})^T x^{(t)}) < 0$ and lets look at the sign after the update:

$y^{(t)} ((\theta^{(k+1)})^T x^{(t)}) = y^{(t)} (\theta^{(k)} + y^{(t)}x^{(t)})^T x^{(t)}$

$\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\; = y^{(t)} ((\theta^{(k)})^T x^{(t)}) + (y^{(t)})^2 (x^{(t)})^T x^{(t)}$

$\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\;\; = y^{(t)} ((\theta^{(k)})^T x^{(t)}) + ||x^{(t)}||^2$

Thus, eventually this drives the parameter $\theta$ towards the correct value so that this particular point is classified correctly.

This algorithm converges in the realisable case (i.e., when the training data is linearly separable through the origin)

## Linear Classifiers with Offset

$h(x, \theta, \theta_0) = sign(\theta^T x + \theta_0)$

A set of labled points $S_n = \{ (x^{(t)}, y^{(t)}), t = 1, ..., n\}$ are *linearly separable* if there exists a parameter vector $\hat{\theta}$ such that $y^{(t)}(\hat{\theta}^T x^(t) + \theta_0) > 0$ for all $t = 1, ..., n$

if $y^{(t)} \neq h(x^{(t)}, \theta^{(k)}, \theta^{(k)}_0)$ then

$\theta^{(k+1)} = \theta^{(k)} + y^{(t)}x^{(t)}$

$\theta^{(k+1)}_0 = \theta^{(k)}_0 + y^{(t)}$

Note: linear classification with an offset is really just linear classification through origin, but just with an extra dimension. each point $x^{(t)}$ can be considered to have an additional coordinate that is always set to 1