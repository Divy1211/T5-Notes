## Unsupervised Learning

When there are no labels $y^{(i)}$ to classify the data points accordingly, we use unsupervised learning. Instead of classification, the goal of unsupervised learning is to identify structures/patterns in the data.

Input: $S_n = \{ x^{(i)}, 1, ..., n \}$ where $x^{(i)} \in \mathbb{R}^d, integer $k$$

Output: Set of clusters $C_1, ..., C_k$

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

$\text{cost}(z^{(1)}, ... z^{(k)}) = \min\limits_{C_1, ..., C_k} \text{cost}(C_1, ... C_k, z^{(1)}, ... z^{(k)})$

$\text{cost}(z^{(1)}, ... z^{(k)}) = \min\limits_{C_1, ..., C_k} \sum\limits_{j = 1}^{k} \sum\limits_{x^{(i)} \in C_j}||x^{(i)} - z^{(j)}||^2$

$\text{cost}(z^{(1)}, ... z^{(k)}) = \sum\limits_{i = 1, ..., n} \min\limits_{j = 1, ..., k} ||x^{(i)} - z^{(j)}||^2$

Basically, for every point in the dataset, choose the centroid from the clusters that is the closest to the point $i$

## K-Means Algorithm

Alternatively find the best clusters for centroids, then the best centroids for the clusters. Iterative algorithm:

1. Randomly initialise $k$ centroids
2. Repeat until no further change in cost:
   1. $\forall j = 1, ..., k, C_j = \{ i |  x^{(i)} \text{ is closest to } z^{(j)}\}$
   2. $\forall j = 1, ..., k, z^{(j)} = \frac{1}{|C_j|} \sum\limits_{x^{(i)} \in C_j} x^{(i)}$ (cluster mean)

Each iteration requires $\mathcal{O}(kn)$ steps

## Convergence

Each iteration of K-Means either keeps the cost the same or necessarily lowers it. This is because in the first step, we are choosing members of the clusters based on fixed $z^{(i)}$ points, and since this choosing is done by assigning points to the cluster of the closest centroid, it minimises our cost by definition. In the second iteration, a new centroid is chosen after fixing the clusters, which boils down to minimising the SSW of one cluster. The solution of this minimsation problem is the formula for the centroid given in step 2!

## K-Mediods Algorithm

This is the same as K-Means, but the main difference is that the cluster representative is not the cluster mean but one of the existing data points in the cluster, called an **exemplar**. This is useful in cases such as clustering news articles. Blending multiple news articles into a mean may not make a lot of sense, instead we'd want one concrete article to represent the entire cluster. We can also use other metrics than the euclidian 2norm for calculating the distance between two points:

$\text{cost}(C_1, ... C_k, z^{(1)}, ... z^{(k)}) = \sum\limits_{j = 1}^{k} \sum\limits_{x^{(i)} \in C_j}d(x^{(i)} - z^{(j)})$

The algorithm:

1. Randomly initialise $k$ exemplars
2. Repeat until no further change in cost:
   1. $\forall j = 1, ..., k, C_j = \{ i |  x^{(i)} \text{ is closest to } z^{(j)}\}$
   2. $\forall j = 1, ..., k, z^{(j)} = x^{(i)} \in C_j | \min\limits_{x^{(i)} \in C_j} d(x^{(i)}, z^{(j)})$

## Practical Issues

These algorithms guarantee that we find a **local min** of the cost function, not necessarily the optimum. The quality of the clustering can greatly depend on the initialisation. Usually, the goal is to assign the starting centroids such that they are as far away from each other as possible.

Elbow method is used to select the optimal value of $k$. The *minimum description length principle* (casting clustering as a connection problem) or *Gap statistics* (characterising how much our cost would descrease if there are no additional cluster sections exists). We will consider the question of choosing $k$ in a scenario where we use clustering to help semi supervised learning.

## K-Fold Cross Validation

In semi supervised learning problems, we have access to a small set of labeled data and a large set of unlabeled data. When there are few input points and the dimensionality of the feature vectors is high, a linear classifier would overfit, but we can use the unlabeled data to reduce the dimensionality of the feature vectors.

Consider that our task involves labeling articles if they contain a specific topic, say 'ecology'. In the typical bag of words approach to map documents to feature vectors, the dimensionality of the vectors would be about the size of the english dictionary. However, we can take advantage of the unlabeled data by clustering them into semantically coherent groups. The clustering does not tell us which topics each arcticle contains, but it puts similar documents together, **hopefully placing documents involving different topics in different clusters**. If so, knowing which cluster a document belongs to can help us simplify its classification.

The bag of words feature vector is replaced with a vector that contains the above clustering information. More precisely, given $k$ clusters, a doc that belongs to cluster $j$ can be repr-ed by a $k$-dim vector with the $j$th coord set to $1$. All docs in the same cluster have the same feature vector this way! A better method is to use the relative distances of the document to the $k$ clusters. In either case, we can obtain a low dim feature vector which can be used for topic classification. At least lower dimensionality means less chances of overfitting.

How do we choose $k$ in this case? We use cross validation from the datapoints which are labeled, with the $k$ dimensional feature vectors - to get a sense of how well the prcess generalises. The value of $k$ that minimises the cross validation error would be used.