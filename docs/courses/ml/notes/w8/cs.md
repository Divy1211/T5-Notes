## Perceptron

$h(x, \theta, \theta_0) = sign(\theta^T x + \theta_0)$

if $y^{(t)} \neq h(x^{(t)}, \theta^{(k)}, \theta^{(k)}_0)$ then

$\theta^{(k+1)} = \theta^{(k)} + y^{(t)}x^{(t)}$

$\theta^{(k+1)}_0 = \theta^{(k)}_0 + y^{(t)}$

## Hinge Loss

*Empirical Risk*

$R_n (\theta) = \cfrac{1}{n}\sum\limits_{t=1}^{n} \text{Loss}(y^{(t)} (\theta^T x^{(t)}))$

In our original *linearly separable* case, we chose

$\text{Loss}(y^{(t)} (\theta^T x^{(t)})) = |y^{(t)} - y^{(t)} (\theta^T x^{(t)})|/2$

This is known as *zero-one loss*. We will change the metric of loss evaluation to *hinge loss*,

$\text{Loss}(y^{(t)} (\theta^T x^{(t)})) = max\{1 - y^{(t)} (\theta^T x^{(t)}), 0\}$

here, $z = y^{(t)} (\theta^T x^{(t)})$ is called the *agreement*

## Sub Gradient Descent

$\nabla_{\theta} R_n(\theta) = \left[\cfrac{\partial R_n(\theta)}{\partial\theta_1}, ..., \cfrac{\partial R_n(\theta)}{\partial\theta_d}\right]^T$

$\theta^{(k+1)} = \theta^{(k)} - \eta_k \nabla_{\theta} R_n (\theta^{(k)})$

## Stochastic GD

$\nabla_{\theta} R_n (\theta^{(k)}) = - y^{(t)} x^{(t)}$

Loss from just one data point is considered ^

if $y^{(t)}((\theta^{(t)})^T x^{(t)}) \leq 1$ then

$\theta^{(k+1)} = \theta^{(k)} + \eta_k y^{(t)} x^{(t)}$

1. The mistakes are penalised linearly, instead of in a binary fassion
2. Here, the $\eta_k$ is decreased over the iterations, instead of being fixed
3. Additionally, the "mistake", i.e. when the update is made is now defined in terms of $z \leq 1$ instead of $z < 0$
4. The training points are chosen at random, than cycling through them in order, to prevent the updates from oscillating

$\eta_k = \cfrac{1}{k+1}$ is a choice of $\eta_k$ that ensures that the SSGD converges. Any choice that satisfies $\sum\limits_{k=1}^{\infty} \eta_k^2 < \infty$ and $\sum\limits_{k=1}^{\infty} \eta_k = \infty$ makes the algorithm converge

## K Means

cosine similarty:

$cos(x, y) = \cfrac{x . y}{||x|| \; ||y||}$

dissimilarity (pairwise euclidian distance)

$dist(x, y) = ||x - y||^2$

Sometimes, the L1/manhattan distance can be used:

$dist(x, y) = ||x - y||_1$

distortion within one cluster $C_j$:

$\sum\limits_{x^{(i)} \in C_j}||x^{(i)} - z^{(j)}||^2$

cost of the clustering:

$\text{cost}(C_1, ... C_k, z^{(1)}, ... z^{(k)}) = \sum\limits_{j = 1}^{k} \sum\limits_{x^{(i)} \in C_j}||x^{(i)} - z^{(j)}||^2$

$\text{cost}(z^{(1)}, ... z^{(k)}) = \sum\limits_{i = 1, ..., n} \min\limits_{j = 1, ..., k} ||x^{(i)} - z^{(j)}||^2$

## K-Means Algorithm

Alternatively find the best clusters for centroids, then the best centroids for the clusters. Iterative algorithm:

1. Randomly initialise $k$ centroids
2. Repeat until no further change in cost:
   1. $\forall j = 1, ..., k, C_j = \{ i |  x^{(i)} \text{ is closest to } z^{(j)}\}$
   2. $\forall j = 1, ..., k, z^{(j)} = \frac{1}{|C_j|} \sum\limits_{x^{(i)} \in C_j} x^{(i)}$ (cluster mean)
   3. Variation in K-Mediods: $\forall j = 1, ..., k, z^{(j)} = x^{(i)} \in C_j | \min\limits_{x^{(i)} \in C_j} d(x^{(i)}, z^{(j)})$

Each iteration requires $\mathcal{O}(kn)$ steps

## Convergence

Each iteration of K-Means either keeps the cost the same or necessarily lowers it. This is because in the first step, we are choosing members of the clusters based on fixed $z^{(i)}$ points, and since this choosing is done by assigning points to the cluster of the closest centroid, it minimises our cost by definition. In the second iteration, a new centroid is chosen after fixing the clusters, which boils down to minimising the SSW of one cluster. The solution of this minimsation problem is the formula for the centroid given in step 2!

## Practical Issues

1. Elbow method
2. local min not global

## Log Reg

Here, $P(y | x) = \begin{cases} h(x) & y = 1 \\ 1 - h(x) & y = -1\end{cases}$

due to a property of the sigmoid function where $\sigma(-s) = 1 - \sigma(x)$ we can rewrite the probability as:

$P(y | x) = \sigma(y (\theta^T x + \theta_0))$

Minimise: $J(\theta) = \cfrac{1}{n} \sum\limits_{i = 1}^{n} \ln(1 + \exp(-y_i (\theta^T x_i + \theta_0 )))$

## SGD

$\nabla_{\theta} e_t(\theta) = \cfrac{-y_t \theta^T x_t}{(1 + e^{\displaystyle y_t \theta^T x_t})}$

Then the weight update is:

$\theta_{t+1} = \theta_t - \eta \nabla_{\theta} e_t (\theta)$ 

## Prediction

Our prediction is $1$ iff:

1. $P(y = +1|x) \geq 0.5$
2. $P(y = +1|x) > P(y = -1|x) \implies P(y = +1|x)/P(y = -1|x) \geq 1$
3. $\theta^T x \geq 0$ (by taking $\ln$ of the above inequality)

## SVM

$L = \cfrac{||\theta||^2}{2} - \sum\limits_{i = 1}^{n} \alpha_i \left(y_i (\theta^T \vec{x_i} + \theta_0) - 1 \right)$

non vector form: $\vec{\theta} = \sum\limits_{i} \alpha_i y_i \vec{x_i}$

non vector form: $\sum\limits_{i}\alpha_i y_i  = 0$

Non vector form:
$L = \sum\limits_{i} \alpha_i - \cfrac{1}{2} \sum\limits_{i}\sum\limits_{j} \alpha_i \alpha_j y_i y_j \vec{x_i}^T \vec{x_j}$

Since $\theta$ is a linear combination of some of the vectors $\vec{x_i}$ for which $\alpha_i > 0$ and $y_i \theta^T x_i = 1$, they are called **support vectors**

The rest are non support vectors since $\alpha_i = 0$ and $y_i \theta^T x_i > 1$ and thus do not contribute to $\theta$

$L = \cfrac{\lambda}{2}||\theta||^2 + \sum\limits_{i = 1}^{n} \xi_i - \sum\limits_{i = 1}^{n} \alpha_i \left(y_i (\theta^T \vec{x_i} + \theta_0) - 1 + \xi_i \right) - \sum\limits_{i = 1}^n \mu_i \xi_i$

or

$L = \cfrac{1}{2}\mathbf{w}^T \mathbf{w} + C\sum\limits_{i = 1}^{n} \xi_i - \sum\limits_{i = 1}^{n} \alpha_i \left(y_i (\mathbf{w}^T \vec{x_i} + b) - 1 + \xi_i \right) - \sum\limits_{i = 1}^n \mu_i \xi_i$

Along with their normal forms:

1. $\color{blue}\mathbf{w} = \sum\limits_{i = 1}^{n} d_i \alpha_i \vec{x}_i$
2. $\color{blue}\sum\limits_{i = 1}^{n} \alpha_i d_i = 0$
3. $\color{blue}\alpha_i = C - \mu_i$

In the normal form, this is:

$\color{blue}L = \sum\limits_{i = 1}^{n} \alpha_i - \cfrac{1}{2}\sum\limits_{i = 1}^{n} \sum\limits_{j = 1}^{n} \alpha_i d_i \vec{x_i}^T \vec{x_j} d_j \alpha_j$

lastly, from KKT, we have:

1. Dual feasibility:
   1. $\color{blue}\alpha_i \geq 0$
   2. $\color{blue}\mu_i \geq 0$
   
   using these and $\alpha_i = C - \mu_i$, we can conclude that $\color{blue}\alpha_i \in [0, C]$

2. The complementary slackness conditions:
   1. $\color{blue} \mu_i \xi_i = 0$
   2. $\color{blue} \alpha_i (d_i(\mathbf{w}^T x_i + b) - 1 + \xi_i) = 0$

$\alpha \in (0, 1/\lambda)$ for SV and $\alpha = 1/\lambda$ for margin violations

## Kernels

1. $\color{orange}K = 1$ is a kernel function ($\color{orange}\phi(x) = 1$)
2. $\color{yellow}f : \mathbb{R}^d \to \mathbb{R}$ and if $\color{orange}K(x, y)$ is a valid kernel function, then so is $\color{lime}\tilde{K}(x, y) \color{white} = \color{yellow} f(x) \color{orange} K(x, y) \color{yellow} f(y)$ ($\color{lime}\tilde{\phi}(x) \color{white} = \color{yellow} f(x) \color{orange} \phi(x)$)
3. if $\color{orange} K_1$ and $\color{cyan} K_2$ are valid kernels, then so are $\color{orange} K_1 \color{white} + \color{cyan} K_2$ $\left( \color{lime} \phi(x) \color{white} = \begin{bmatrix} \color{orange} \phi_1(x) \\ \color{cyan} \phi_2(x) \end{bmatrix}\right)$ and $\color{orange}K_1 \color{cyan} K_2$ $\left( \color{lime} \phi(x) \color{white} = \color{orange}\phi_1(x) \color{cyan}\phi_2(x) \color{white}\right)$

An INFINITE dimensional kernel where $K(x, y) = \phi(x)\cdot\phi(y) = \exp(-|| x - y ||^2/2)$

(this can be derived from power series and properties)

## NN

$\vec{a}_{k+1} = \sigma\left(W_k \vec{a}_k + \vec{b}_{k+1}\right)$

$\cfrac{\partial C}{\partial W_k} = \color{yellow} a_k \color{default} \cfrac{\partial C}{\partial \hat{y}} \color{lime} (\hat{y} \odot (1 - \hat{y}) 1^T) \odot \mathbb{I}$

$\cfrac{\partial C}{\partial b_k} = \cfrac{\partial C}{\partial \hat{y}} \color{lime} (\hat{y} \odot (1 - \hat{y}) 1^T) \odot \mathbb{I}$

$\color{yellow} \delta_k \color{default} = \cfrac{\partial C}{\partial \hat{y}} \color{lime} ((\hat{y} \odot (1 - \hat{y}) 1^T) \odot \mathbb{I}) \color{cyan} W_k$

$\cfrac{\partial C}{\partial W_{k-1}} = \color{violet} a_{k-1} \color{yellow} \delta_k \color{violet} (a_k \odot (1 - a_k) 1^T) \odot \mathbb{I}$

$\cfrac{\partial C}{\partial b_{k-1}} = \color{yellow} \delta_k \color{violet} (a_k \odot (1 - a_k) 1^T) \odot \mathbb{I}$

$\color{yellow} \delta_{k-1} \color{default} = \color{yellow} \delta_k \color{violet} ((a_k \odot (1 - a_k) 1^T) \odot \mathbb{I}) \color{magenta} W_{k-1}$

## Multinomials: Naive Bayes

bag of words approach, each word is associated with a probability of occurance.

$\sum_{w}\theta_w = 1$ & $\mathbb{P}(w) = \theta_w$

$\mathbb{P}(D | \theta) = \prod\limits_{w \in D}\theta_w^{n_D(w)}$

$\max\limits_{\theta} \sum\limits_{w \in D}n_D(w)\log\left(\theta_w\right)$

$\hat{\theta}_w = \cfrac{n_D(w)}{\sum_{w \in D} n_D(w)}$

$\mathbb{P}(y = + | D) = \cfrac{\mathbb{P}(D | y = +) \mathbb{P}(y = +)}{\mathbb{P}(D)}$

$\log \cfrac{\mathbb{P}(y = +|D)}{\mathbb{P}(y = -|D)}$

$\sum\limits_{w \in D} n_D(w) \underbrace{\log \cfrac{\theta^+_w}{\theta^+_w}}_{\theta_w} + \underbrace{\log \cfrac{\mathbb{P}(y = +)}{\mathbb{P}(y = -)}}_{\theta_0}$

$\Phi(D)$ freq vector

## Smoothing

$\Phi_s(D) = \Phi(D) + \lambda$ where $\lambda$ is default values for words which can help account for unseen words

## Spherical Gaussian

$P(x; \mu, \sigma) = \cfrac{1}{(\sqrt{2\sigma^2\pi})^d} e^{-(x-\mu)^2/(2\sigma^2)}$ where $d$ is dim of $x$

## Estimating Mixtures Without Labels

Max:

$\sum\limits_{t = 1}^{n} \log \sum\limits_{i=1}^{k}p_i \mathbb{P}(x ; \hat{\mu}_i, \hat{\sigma}_i^2)$

A closed form solution cannot be obtained here

initialise all $\hat{\sigma}_i^2 = \hat{\sigma}^{2} = \cfrac{1}{d n}\sum\limits_{t = 1}^{n} ||x_t - \hat{\mu}||^2$

The E Step:

$w(i|t) = \cfrac{p_i \mathbb{P}(x_t ; \hat{\mu}_i, \hat{\sigma}_i^2)}{\mathbb{P}(x_t | \theta)} = \cfrac{p_i \mathbb{P}(x_t ; \hat{\mu}_i, \hat{\sigma}_i^2)}{\sum\limits_{j=1}^{k}p_j \mathbb{P}(x_t ; \hat{\mu}_j, \hat{\sigma}_j^2)}$

$w(i|t)$ softly assigns each point to a cluster by a weight, this is similar to the labeled case where we could do a definite $0$ or $1$ assignment with $\delta$.

The M Step:

$\hat{n}_i = \sum\limits_{t = 1}^{n} w(i|t)$ (**effecive** num points assigned to cluster $i$)

$p_i = \cfrac{\hat{n}_i}{n}$

$\hat{\mu}_i = \cfrac{1}{\hat{n}_i}\sum\limits_{t = 1}^{n} w(i|t) x_t$

$\hat{\sigma}_i^2 = \cfrac{1}{d \hat{n}_i}\sum\limits_{t = 1}^{n} w(i|t) ||x_t - \hat{\mu}||^2$

same properties of convergence as $k$-means