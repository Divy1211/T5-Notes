## Sequence Labeling

Noun, Verb, Article, Adjective, Noun

eg - Faith is a fine invention

One to one mappying between labels and input values

$\prod\limits_{j=0}^{n} \mathbb{P}(y_{i+1} | y_j) \times \prod\limits_{j=1}^{n} \mathbb{P}(x_i | y_j)$

The first term -> Transition Probabilities $a_{y_j, y_{j+1}}$
The second term -> Emission Probabilities $b_{y_j} (x_j)$

## Hidden Markov Model

Assumption: Current state only determined by previous state, and nothing else

- An HMM is defined by a tuple: $\langle \mathcal{T}, \mathcal{O}, \theta \rangle$
    - $\mathcal{T}$: A set of states including START and END
    - $\mathcal{O}$: A set of observation symbols
    - $\theta$: Transition and emission parameters $a_{u,v}$ and $b_u (o)$

The probability of observing an input "the dog the" as a state transition $A B A$ is $a_{START,A} b_A("the") a_{A,B} b_B("dog") a_{B,A} b_A("the") a_{A, STOP}$

### Estimation

From actual labeled data (too computationally expensive)

$a_{u,v} = \cfrac{\text{count}(u,v)}{count(u)}$

$b_u(o) = \cfrac{\text{count}(u \to o)}{count(u)}$

### MLE

likelihood = $\prod\limits_{u,v} (a_{u, v})^{\text{count}(u, v)} \times \prod\limits_{u, o} (b_{u} (o))^{\text{count}(u \to o)}$

log likelihood = $\text{count}(u, v) \sum\limits_{u,v} (a_{u, v}) + \text{count}(u \to o)\sum\limits_{u, o} (b_{u} (o))$

maximise!

Answer the qn: Which label sequence is the most probable given the word sequence x?

$y^* = \argmax_y \mathbb{P}(y | x)$ where $y$ is the label seq and $x$ is the input seq

$y^* = \argmax_y \cfrac{\mathbb{P}(y \cap x)}{mathbb{P}(x)}$

$y^* = \argmax_y \mathbb{P}(y \cap x)$ (denom const wrt $y$)

Too complex to brute force: $\mathcal{O}(|\mathcal{T}^n|)$ ($\mathcal{T}# - # states, $n$ - num words in sentence)

Better: Finding highest scoring path in transition graph, **enter DP** (Viterbi Algo)

$\pi(j, u)$ = highest scoring path to word $j$ and label $u$

$\pi(0, \text{START}) = 1$ & $\pi(0, u) = 0$

$\pi(j+1, n) = \max_{v \in \text{states}} (\pi(j, v) \times b_u(x_{j+1}) \times a_{v, u})$

$\pi(n+1, \text{STOP}) = \max_{v \in \text{states}} (\pi(n, v) \times a_{v, \text{STOP}})$

store $v$ as well so backtrack to find the actual path that gives the score.

$\mathcal{O}(n |\mathcal{T}|^2)$ complexity