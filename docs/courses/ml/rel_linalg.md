## Optimisation Problems

### Definitions

A positive definite matrix is a symmetric matrix whoes eigen values are all positive. Additionally, this matrix has the property that $z^T M z > 0 \forall z \neq 0$. All the principal minors of this matrix are positive

A negative definite matrix is a symmetric matrix whoes eigen values are all negative. Additionally, this matrix has the property that $z^T M z < 0 \forall z \neq 0$. The minors with an odd number of rows and columns are negative and the minors with an even number of rows and columns are positive

### Unconstrained Optimisation

A critical point where the hessian is a:

1. positive definite is a local min
2. negative definite is a local max
3. mixed (non 0) eigen values is a saddle point

### Constrained Optimisation

Max $f(\mathbf{x})$ subject to $\mathbf{g}(\mathbf{x}) \leq 0$ and $\mathbf{h}(\mathbf{x}) = 0$

$L(\mathbf{x}, \mathbf{\mu}, \mathbf{\lambda}) = f(\mathbf{x}) + \mathbf{\mu}^T\mathbf{g}(\mathbf{x}) + \mathbf{\lambda}^T\mathbf{f}(\mathbf{x})$

We then find the critical points of $L$, which satisfy the following conditions:

1. Primal feasibility $\mathbf{g}(\mathbf{x^*}) \leq 0$ and $\mathbf{h}(\mathbf{x^*}) = 0$
2. Dual feasibility $\mu \geq 0$
3. Complementary slackness $\mu_i g_i(\mathbf{x^*}) = 0$

Given that there are a total of $l$ binding inequality constraints and $n$ equality constraints, we have a total of $m$ effective constraints.

A critical point where $(2m + i)$ th principal minors $\forall i \geq 1$ of the hessian:

1. Alternate signs, starting at $(-1)^{m+1}$ is a local max
2. All have the sign $(-1)^{m}$ is a local min