## Generative vs Discriminative Models

1. DMs learns the conditional pr dist
2. GMs learns the joint pr dist
3. DMs only distinguish
4. GMs distinguish but also understand what the big picture is
5. DMs focus on the decision boundary. They model boundary
6. GMs Build prbabilistic model for each class. They model data itself

## Gaussians

$P(x; \mu, \sigma) = \cfrac{1}{\sqrt{2\sigma^2\pi}} e^{-(x-\mu)^2/(2\sigma^2)}$

## Multinomials: Naive Bayes

bag of words approach

Each word is associated with a probability of occurance.

$\sum_{w}\theta_w = 1$

$\mathbb{P}(w) = \theta_w$

This distribution of probabilities can be called a model $\theta$

Given a document, we can then determine the probability that this model created that document:

$\mathbb{P}(D | \theta) = \prod\limits_{w \in D}\theta_w^{n_D(w)}$ where $n_D(w)$ is the number of times the word is repeated in the document

To model a document, we can maximise the likelyhood (MLE)

$\max\limits_{\theta} \sum\limits_{w \in D}n_D(w)\log\left(\theta_w\right)$

Some calculus later:

$\hat{\theta}_w = \cfrac{n_D(w)}{\sum_{w \in D} n_D(w)}$

This model assumes that the features of one class of documents are independent (hence the name naive, this is generally not true for text documents at least)

Lets assume that we have two classes of labeled docs $+$ and $-$. We can perform two MLE to obtain two models $\theta^+$ and $\theta^-$

Now we can ask:

$\mathbb{P}(y = + | D) = \cfrac{\mathbb{P}(D | y = +) \mathbb{P}(y = +)}{\mathbb{P}(D)}$

where $\mathbb{P}(D) = \mathbb{P}(D | y = +) \mathbb{P}(y = +) + \mathbb{P}(D | y = -) \mathbb{P}(y = -)$

We can write the log likelyhood ratio as a discriminant function:

$\log \cfrac{\mathbb{P}(y = +|D)}{\mathbb{P}(y = -|D)}$

$\log \cfrac{\mathbb{P}(D | y = +) \mathbb{P}(y = +)}{\mathbb{P}(D | y = -) \mathbb{P}(y = -)}$

$\log \prod\limits_{w \in b} (\theta_w^+)^{n_D(w)} \mathbb{P}(y = +) - \log \prod\limits_{w \in b} (\theta_w^-)^{n_D(w)} \mathbb{P}(y = -)$

$\sum\limits_{w \in b} n_D(w)\log \theta_w^+ \mathbb{P}(y = +) - \sum\limits_{w \in b} n_D(w)\log \theta_w^- \mathbb{P}(y = -)$

$\sum\limits_{w \in D} n_D(w) \log \cfrac{\theta^+_w \mathbb{P}(y = +)}{\theta^+_w \mathbb{P}(y = -)}$

$\sum\limits_{w \in D} n_D(w) \underbrace{\log \cfrac{\theta^+_w}{\theta^+_w}}_{\theta_w} + \underbrace{\log \cfrac{\mathbb{P}(y = +)}{\mathbb{P}(y = -)}}_{\theta_0}$

$\sum\limits_{w \in D} n_D(w) \theta_w + \theta_0 = \Phi(D)^T \theta + \theta_0$

$\Phi(D)$ freq vector

## Smoothing

$\Phi_s(D) = \Phi(D) + \lambda$ where $\lambda$ is default values for words which can help account for unseen words