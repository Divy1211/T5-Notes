## Accuracy

Accuracy = $\cfrac{TP + TF}{N}$

### Limitations

1. Class problem where # of class 0 = 9990 and # of class 1 = 10
2. If everything is predicted to be class 0, accuracy is $9990/10000 = 0.999$ => misleading!

## Cost matrix

$c(i|j) =$ cost of classifying $i$ as $j$

Cost = weighted accuracy from cost matrix

## Precision

All correct positives over total positives

Precision = $\cfrac{TP}{TP + FP}$

## Recall

All correct positives over all correct classifications

Recall = $\cfrac{TP}{TP + FN}$

## F1 Measure

Recall = $\cfrac{2rp}{r + p} = \cfrac{2 \times TP}{2 \times TP + FP + FN}$

## Methods of perf eval

Depends on:

- Class distribution
- Cost of misclassification
- Size of train/test sets

- Train: dataset used to train
- Validation: dataset used to tune hyperparams
- Test: dataset used to test final model

## Methods of Estimation

- 2/3 train 1/3 test
- k-fold cross validation (average/majority of all the k runs) used to tune hyper params, choose model, validate significance of one model
- Leave one-out (LOO) cross validation
- Random subsampling - k fold cross validation but instead of contiguous split, choose randomly (w/o replacement) each time

