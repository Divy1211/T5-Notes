## Producer Consumer Problem

let `counter` and `buffer` of size `N` be **shared** variables between the producer and the consumer. `counter` keeps track how many items are in the `buffer`.

```c
while (true) {
    /* produce an item in next produced */
    while (counter == BUFFERSIZE); /* do nothing */
    buffer[in] = nextproduced; 
    in = (in + 1) % BUFFERSIZE; 
    counter++;
}
```

And the following consumer program:

```c
while (true) {
    while (counter == 0); /* do nothing */
    next consumed = buffer[out]; 
    out = (out + 1) % BUFFERSIZE; 
    counter--;
    /* consume the item in next consumed */
}
```

On their own, the two programs are correct, but when executed concurrently, they are incorrect. This is due to the presence of **race conditions**.

If the execution of `counter++` and `counter--` are interleaved, then the final value that we get after the execution of these two programs may be incorrect.

A race condition is where multiple processes access and manipulate the same data concurrently, and the outcome of the execution depends on the order in which the accesses take place.

## Critical Section

The parts of a program where **atomicity** needs to be guaranteed for its correct functioning are known as its **critical sections**.

In the above consumer producer code, the critical section is `counter++` and `counter--` parts.

1. **The mutual exclusion**: mutex locks
2. **Condition synchronisation**: Synchronise the execution of a process in a CS based on certain conditions

## Requirements for a solution to CSs

1. **Mutual Exclusion**
2. **Progress**: If there is no process in the CS and another process wishes to enter the CS, it should be allowed to enter in some finite time
3. **Bounded Waiting** If a process has requested to enter the CS, there exists a bound on the number of times other processes are allowed to enter the CS before A. This also implies that the CS is of finite length (no infinite loops).

When a solution guarantees all three of these, we have two properties of that solution as a result:

1. **Safety**: no race conditions
2. **Liveness**: A program with a proper CS solution will not hang forever

The protocol to approach a CS:

1. **Request**
2. **Execute**
3. **Exit**