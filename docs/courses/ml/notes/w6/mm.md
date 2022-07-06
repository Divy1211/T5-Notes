## Spherical Gaussian

$P(x; \mu, \sigma) = \cfrac{1}{(\sqrt{2\sigma^2\pi})^d} e^{-(x-\mu)^2/(2\sigma^2)}$ where $d$ is dim of $x$

from a sample:

$\hat{\mu} = \cfrac{1}{n}\sum\limits_{i = 1}^{n} x_i$

$\hat{\sigma}^2 = \cfrac{1}{dn}\sum\limits_{i = 1}^{n} ||x_i - \hat{\mu}||^2$

## Mix of spherical gaussians

Assuming that there are $k$ clusters, there will be $k$ gaussians.

$p_i$ $i \in \{1, 2, ..., k\}$ - frequency of points expected to see in each cluster

If all the parameters of our model are $\theta$ then:

$P(x | \theta) = \sum\limits_{i=1}^{k}p_i \mathbb{P}(x ; \hat{\mu}_i, \hat{\sigma}_i^2)$

## Estimating Mixtures of Labeled Data

$\delta (i|t) = \begin{cases} 1 \text{ if } x_t \text{ in i} \\ 0\end{cases}$

The Max Likelyhood objective:

$\sum\limits_{t = 1}^{n} \sum\limits_{i = 1}^{k} \delta(i|t) \log p_i \mathbb{P}(x_t | \hat{\mu}_i, \hat{\sigma}_i^2)$

$\hat{n}_i = \sum\limits_{t = 1}^{n} \delta(i|t)$ (num points assigned to cluster $i$)

$p_i = \cfrac{\hat{n}_i}{n}$

$\hat{\mu}_i = \cfrac{1}{\hat{n}_i}\sum\limits_{t = 1}^{n} \delta(i|t) x_t$

$\hat{\sigma}_i^2 = \cfrac{1}{d \hat{n}_i}\sum\limits_{t = 1}^{n} \delta(i|t) ||x_t - \hat{\mu}||^2$

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