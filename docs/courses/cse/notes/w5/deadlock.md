## Necessary conditions for deadlock

When these conditions are fulfilled, there is a possibility of deadlocks. If any one is violated, deadlock cannot happen

1. Mutex
2. Hold and wait
3. No pre-emption: a process cannot be forced to release a resource
4. Circular wait: A cycle in the resource allocation graph

## Resource Allocation Graph

Table:

![table](https://natalieagus.github.io/50005/assets/images/week5/1.png)

![graph](https://natalieagus.github.io/50005/assets/images/week5/2.png)

If no cycle, no deadlock

If cycle, and cycle has a resource with single instance, deadlock

If cycle, but all res have multiple instances then deadlock may happen. Need to analyse

## Deadlock Prevention

### Mutex prevention

Not possible for certain types of res

### Hold and wait prevention

Don't hold on to a resource while requesting/waiting on another resource

**Protocol 1**: acquire everything before starting execution (suffers from idle utilisation)
**Protocol 2**: Only request for new resources when no resources are already acquired (suffers from acquire/release overhead)

### Allowed Pre-emption

This is commonly used with resources whose states can be easily saved/restored, like CPU regs.

**Protocol 1**: forcefully release and acquire resources held by a process implicitly
**Protocol 2**: release and acquire resources only if the process which holds them is waiting

### Circular Wait Prevention

Ensure that the resources are requested in a particular order. If not, earlier acquired resources must be released first.

## Deadlock Avoidance

### Banker's Algorithm

let there me `M` resources and `N` processes

1. Saftey Algorithm
2. Resource Allocation Algorithm

State variables:

1. `available[i]` # of res `i` available.
2. `max[i][j]` max # of simultaneous requests for resource `j` by proc `i`
3. `allocation[i][j]` current # of resource `j` alloc-ed to proc `i`
4. `need[i][j]` how many more # of resource `j` are needed by proc `i`

`max[i][j] = need[i][j] + allocation[i][j]`

#### Resource Allocation Algorithm

returns: boolean to indicate request accepted or rejected

1. if `any(request[i] > need[i])` return `False` (reject)
2. if `any(request[i] > available[i])` return `False`
3. deepcopy `available`, `allocation`, `need` and pass to saftey check algo.
4. If the outcome of the saftey check is
    1. `True` then
        1. `available -= request[i]`
        2. `need[i] -= request[i]`
        3. `allocation[i] += request[i]`
    2. `False` then
       1. Try again

#### Safety Algorithm

1. create an array `finish = [False]*N`.
2. Hypothetically grant the request:
    1. `available -= request[i]`
    2. `need[i] -= request[i]`
    3. `allocation[i] += request[i]`
3. find a process `i` for which `!finish[i]`
4. if `all(need[i] < available[i])` (proc can finish even after req granted)
    1. `available += allocation[i]`
    2. `finish[i] = True`
    3. repeat
5. if `all(finish)` return `True` else `False`

$\mathcal{O}(MN^2)$ time complexity

## Deadlock Detection

Same as safety algorithm but performed on actual system state, not on a hypothetical state.

How often to check for deadlock?

1. depends on how often it can occur and
2. how many procs can be affected by it. it's an expensive algo!

Resolution options:

1. Release all held resources from all deadlocked processes
2. Release all held resources from deadlocked processes one at a time.

Questions:

1. Order of pre-emption
2. Cost. Which process will have longest rollback?
3. Starvation should not occur

