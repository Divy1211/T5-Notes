1. Builds classification or regression models in the form of a tree structure
2. Breaks down dataset into smaller subsets while associated dec tree is built
3. decision nodes and leaf nodes

## Growing A Tree
1. Feature choice
2. Conditions for splitting
3. Stopping condition
4. Pruning

## Decision tree induction
1. Hunt's Algorithm
2. CART
3. ID3, C4.5
4. SLIQ, SPRINT

## Hunt's Algo

1. Grow recursively by partitioning training records successively into purer subset
2. It is the basis of many existing decision tree induction algorithm

Algo:

- Let $D_t$ be the set of training records that reach a node $t$
- If $D_t$ contains records that all belong to the same class $y_t$, $t$ is a leaf node labeled $y_t$
- If $D_t$ is an empty set then $t$ is a leaf node labeled $y_d$ (default)
- If $D_t$ contains records that belong to more than one class, use an **attribute test** to **split** the data into smaller subset, recurse

### Attribute Test
Greedy strat to split records based on optimising a certain metric. 

#### Nominal/Ordinal Attributes
1. Multi-Way Split: As many splits as distinct values for $D_t$
2. Binary Split: split into something and not something. Need to find optimal partitioning

#### Continuous Attributes

1. Descretisation:
    - static - discretise once at the beginning
    - dynamic - ranges by equal interval bucketing or equal freq bucketing or clustering

2. Binary Decision `<` and `>=` Find optimal cutting point

### Homogeneous Split
Greedy strat

#### Measure of node impurity

1. Gini Index
    - Probability of being class in X given a node $t$
    - $\text{GINI}(t) = 1 - \sum\limits_{j} p^2(j|t)$ where $p(j|t)$ is the relative freq of class $j$ at node $t$
    - Max: $1 - 1/n_c$ when the records are equally distributed among all classes, implying least interesting info
    - Min (0): When all records belong to one class, most interesting info
    - CART, SLIQ, SPRINT
    - When a node $t$ is split into $k$ parts,
    - $\text{GINI}_{split} = \sum\limits_{i} \cfrac{n_i}{n} \text{GINI}(i)$ where $n_i$ is the num records at child $i$ and $n$ is the num records at node $t$

2. Entropy
    - $\text{Entropy}(t) = -\sum\limits_{j} p(j|t) \ln p(j|t)$ where $p(j|t)$ is the relative freq of class $j$ at node $t$
    - Max ($\ln n_c$) when records equally distributed, least interesting info
    - Min (0) When all records belong to one class, most interesting info
    - When a node $t$ is split into $k$ parts,
    - $\text{GAIN}_{split} = \text{Entropy(t)} - \sum\limits_{i} \cfrac{n_i}{n} \text{Entropy}(i)$ where $n_i$ is the num records at child $i$ and $n$ is the num records at node $t$
    - $\text{SplitINFO} = - \sum\limits_{i} \cfrac{n_i}{n} \ln \cfrac{n_i}{n}$
    - $\text{GainRATIO}_{split} = \cfrac{\text{GAIN}_{split}}{SplitINFO}$ (higher entropy partitions are penalised)

3. Misclassification Error
    - $\text{Error}(t) = 1 - \max\limits_{i} p(i|t)$ where $p(j|t)$ is the relative freq of class $j$ at node $t$
    - Max: $1 - 1/n_c$ when the records are equally distributed among all classes, implying least interesting info
    - Min (0): When all records belong to one class, most interesting info
    - When a node $t$ is split into $k$ parts,
    - $\text{Error}_{split} = \sum\limits_{i} \cfrac{n_i}{n} \text{Error}(i)$ where $n_i$ is the num records at child $i$ and $n$ is the num records at node $t$

### Stopping Criteria

1. Stop when all nodes under record have same label
2. Stop if all attributes label are the same
3. Early Termination

## Pros

1. Simple to understand, interpret, visualise
2. Categorical and Numerical data
3. Extremely fast
4. Accuracy is comparable to other techniques for simple datasets
5. Non linear relations between variables do no affect perf

## Cons

1. Prone to overfitting
2. Unstable, small variation in data gives different tree
3. Greedy algorithm doesn't guarantee the return of globally optimal decision tree

