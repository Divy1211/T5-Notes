CS solutions can be classified as follows:

1. **Software Mutex**
    - Algo
    - Software
    - Busy waits
    - Constrained
2. **Hardware Spinlocks**:
    - Busy waits
3. **Software spinlocks and mutex locks**
4. **Semaphores**
    - No busy waiting
    - Generalisation of mutex locks
    - Able to protect two or more identical shared resources
5. **Conditional Variables**
    - No busy waiting
    - Wake up condition

## Software Mutex

### Peterson's Solution

Conditions:

1. Two processes only (can be extended to N processes with proper data struct)
2. Practical only for single processor system
3. `LD/ST` MUST be atomic. An atomic operation completes "in a single step" w.r.t. other threads. An atomic `ST` means that no other process can read/write to a half written value.

let `int turn` and `bool flag[2]` be two shared global variables

`flag = {false, false}` and `turn = arbitrary value`

The code for process `Pi`:

```c
do {
   flag[i] = true;
   turn = j;
   
   while(flag[j] && turn == j);
   // CS
   // ...
   flag[i] = false;
   // RS
   // ...
   
} while(true);
```

The algorithm above is the solution for process `Pi`. The code for `Pj` is equivalent, just swap all the `i` to `j` and vice versa. 

Let's consider a few variations of this algorithm that one might think of:

### Why do we need the flag?
```c
do {
   turn = j;
   
   while(turn == j);
   // CS
   // ...
   turn = j;
   // RS
   // ...
   
} while(true);
```

This does not work, because imagine that this same process wants to re-enter the critical section, but the other process has left its critical section and will not re-enter it at all. In this case, the other process won't set the `turn = i` and this process will never be able to re-enter the CS. It violates progress!

### Why do we need the turn?

```c
do {
   flag[i] = true;
 
   while(flag[j]);
   // CS
   // ...
   flag[i] = false;
   // RS
   // ...
   
} while(true);
```

This does not work, because imagine that both processes want to enter the CS. process `i` set its `flag[i] = true` then gets interrupted, and process `j` is scheduled. Now process `j` sets `flag[j] = true`. Now we have a deadlock. This violates progress as well!

Thus, we need both `turn` and `flag` for the algorithm to work correctly.

### A few variations that do work:

This is nothing but the same thing expressed in different "words"
```c
do {
   flag[i] = true;
   turn = j;
   
   while(flag[j] && turn != i);
   // CS
   // ...
   flag[i] = false;
   // RS
   // ...
   
} while(true);
```

Here `turn` is not a good name for the variable:
```c
do {
   flag[i] = true;
   turn = i;
   
   while(flag[j] && turn == i);
   // CS
   // ...
   flag[i] = false;
   // RS
   // ...
   
} while(true);
```

### To check if a solution is correct?

1. Check for mutex: can another process enter CS while one is already in CS?
2. Check for progress: can another process enter CS if the other process has left the CS and **won't try to re-enter it**
3. Check for bounded waiting: can a process re-enter the CS after just leaving it?

## Synchronisation hardware

Number of hardware locks may be physically limited

### Preventing interrupts

We can intentionally prevent interrupts from occurring while a shared variable is being modified. This only works in a single processor system and is not feasible on a multiprocessor architecture, because:

1. Time consuming, need to pass a message to all other processors
2. Clock synchronisation between processors
3. Decreases efficiency, defeats the purpose of multiprocessing

### Atomic instructions

Atomic instructions can be implemented by locking the memory bus. mutex is trivial. Typically used for synchronisation in SMP systems. Common instructions are:

1. `compare_and_swap()`
2. `test_and_set()`
3. `read` and `write`
4. `swap`
5. `fetch_and_add`
6. `load_link` / `store_conditional`

### Software Spinlocks and Mutex locks

This uses hardware synchronisation instructions like the ones mentioned above. Although, this requires more memory than a hardware spinlock 

### Spinlocks

A spinlock provides mutex. It is simply a variable that is repeatedly checked for availability using atomic instructions:

```c
acquire() {
   // this is done using the test and set instruction, atomically!
   while(!available);
   available = false;
}

release() {
   available = true;
}
```

#### Busy Waiting

wastes CPU cycles. In a single processor environment, this is wasteful as no other process is able to run if there is busy wait.

spinlock is useful in a multiprocessor system when the anticipated waiting time is shorter than a quantum. The advantage over mutex lock here is that there is a context switch with mutex locks, since this thread must be put to sleep first, and if the waiting time is short, this is more wasteful than spinning.

### Mutex Lock

Requires **integration** with the kernel scheduler since it puts the waiting process to sleep to reduce busy wait. Context switch is involved, and thus this is an expensive operation to perform. should only be done when the waiting time is much longer than the time used for context switching

## Semaphores

**Generalised Mutex Lock**, implemented at the **kernel** level. This is a high level **software** solution that relies on **synchronisation hardware** and is considered more **robust** than mutex locks. These do not cause busy waiting either.

A semaphore is defined as:

1. `int numAvailableResources` whcih is defined in the kernel.
2. accesible only via `signal()` and `wait()`

Semaphores can be used in two ways:

1. **Binary** semaphore (0 or 1)
2. **Counting** semaphore (1 to N)

How they work: Semaphores integrate with the kernel scheduler to avoid busy waiting by putting the threads to sleep if there are no available resources.

```c
wait(semaphore* S) {
   
   // reduce the number of available resources
   --s->value;
   
   if(s->value < 0) // if the number of available resources was 0, it is now negative, hence wait.
      add this process to s->list and call block();
}

// The magnitude of the negative s->value indicates how many processes are waiting on the resource

signal(semaphore* S) {
   ++s->value;
   
    // if s-> value was < 0 it means that there was a process waiting. after ++, the value may be = 0.
   if(s->value <= 0)
      remove a process P from s->list and call wakeup(P);
}
```

note: `wait()` and `signal()` are **critical sections of the semaphore algorithm**. A lock must be used to ensure that there is mutex, and there is **busy waiting when `wait()` and `signal()`** are called. Semaphores do not completely eliminate busy waiting, however the busy waiting involved with the `wait(`) and `signal()` functions is way less than the busy waiting involved with using a spinlock.

### Applying semaphores to the MPC problem

shared vars:

- write index `int in`
- read index `int out`
- `char buf[N]`
- one binary and one counting semaphore

```c
char buf[N];
int in = 0; int out = 0;

semaphore chars = 0; 
semaphore space = N;
semaphore mutex_p = 1; 
semaphore mutex_c = 1;
```

Producer program:

```c
void send (char c){
   wait(space);
   wait(mutex_p);

   buf[in] = c;
   in = (in + 1)%N;

   signal(mutex_p);
   signal(chars);
}
```

```c
char rcv(){
   char c;
   wait(chars);
   wait(mutex_c);

   c = buf[out];
   out = (out+1)%N;

   signal(mutex_c);
   signal(space);
}
```

## Conditional Variables

Conditional variables can be used to ensure that certain code is executed in order by multiple processes. A process can wait for the completion of a given **event** on  a particular object. It is used to communicate between processes or threads when certain conditions become `true`.

An **event** is a _change_ in the state of some condition or object that a process can **listen** to. It can wait to be awakened later by a signalling process which actually changes the condition/object.

```c
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
pthread_cond_t p_cond_x = PTHREAD_COND_INITIALIZER;
```

Process 1:
```c
pthread_mutex_lock(&mutex);
// CRITICAL SECTION
// ...
cond_x = true;
pthread_cond_signal(&p_cond_x);
pthread_mutex_unlock(&mutex);
```

Process 2:
```c
pthread_mutex_lock(&mutex);
while(!cond_x)
   pthread_cond_wait(&p_cond_x, &mutex);  // yields mutex, and goes to sleep

// CRITICAL SECTION, can only be executed if cond_x == true
// ...
pthread_mutex_unlock(&mutex);
```

process 2 automatically reacquires the lock when it is awoken after process 1 sets `cond_x = true` and signals process 2. If another process has the mutex lock, process 2 won't be awoken. After being awoken, it will check if the `cond_x` is true before proceeding to the CS. This is important because process 1 may not have executed at all in the time that process 2 was sleeping

Conditional Variables allow us to block a process out of the CS based on an arbitrary condition, even when the CS is empty. Mutex locks cannot do this alone.
