## Curse of Dimensionality

- When dimensionality increases, data becomes sparse, metrics like distance and density become less meaningful

## Why Dimensionality Reduction

- Avoid Curse of Dimensionality
- Reduce time & memory used by ML algos
- Easier visualisation of data
- Remove irrelevant features
- Feature extraction/selection

## Feature Selection

Filter out features that are obviously irrelevant to the prediction

## Feature Extraction

Combine multiple (height, weight -> bmi) into one

## PCA

Unsupervised technique for extracting variance structure from high dimensional datasets

An **orthogonal projection** or transformation of data into possibly lower dimensional space so that the variance of the projected data is max

### PCA by SVD

1. Calculate mean of all the features. $\bar{x}$ 
2. Shift origin to $\bar{x}$.
3. Find line of best fit through new origin (min perp dist to line or max proj dist from origin)
4. PCA by SVD does the latter for computational reasons
5. Max sum of squared distances of projected points from origin
6. The line found is called PC1
7. The slopes of PC1 tells you about the **linear combination** of two features from the dataset. This may tell us that one feature is more important than another!
8. We normalise the vector made by the slope to get a unit vector. This is known as the **singular vector** or the **eigen vector** for PC1
9. The sum of squared distances for the line of best fit is called the **eigen value**
10. The square root of the eigen value is called the **singular value**
11. PC2 is a perpendicular line to PC1 (PC3 is a perpendicular line to both PC2 and PC1, ...)
12. Find the variance for both PC1 and PC2, and then variance_1/(variance_1+variance_2) tells us the "weight" of PC1 among all the PCs
13. To find the PCx (transformation) we dot the feature vector with the corresponding eigen vector
14. Once we do this, we can take the PCs that have the high % variation and drop the rest