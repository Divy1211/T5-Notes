A thread is defined as a **segment** of a process.

A process can have multiple threads, and we can define thread as a basic unit of CPU utilization; it comprises of:

1. Thread ID,
2. PC
3. Registers
4. Stack

Since threads of one process operate in the same address space, heaps are shared.

## Benefits of MT

1. Responsiveness. If one thread of the program is blocked, other threads can continue to provide user interaction.
2. Multiprocessor architecture => parallel programming
3. Easy resource sharing and communication
4. Cheaper than multiprocessing (context switch between threads is more light-weight)

| Multiprocessing                                                       | Multithreading
|:-                                                                     | :-                                                                                |
| concurrency and protection                                            | Only concurrency                                                                  |
| IPC is expensive (need svc and context switch)                        | Thread switching cheaper since same addr space                                    |
| parallel process exec is always available on a multicore architecture | Parallel thread execution depends on the type of threads and may not be available |
| synchronisaiton by svc and kernel                                     | Synchronisation by dev                                                            |
| Managed by the kernel scheduler (full ctxs + svc + flush mmu)         | Managed by thread scheduler (ctxs light, only regs and stack, may not need svc)   |

## Types of threads

### User Level Thread

green threads

1. scheduled by runtime libs or venv, not kernel. Kernel is unaware of their existance!
2. managed in user space, cheaper to (de)alloc
3. can run on any system, take up thread data structure
4. simple management done in user space, no svc, efficient
5. scheduling may be bad
6. what is used in Java/C (pthreads)

### Kernel Level Thread

1. scheduled by kernel, shares data with kernel but has own stack/regs. lightweight proc
2. managed in kernel space, take up more res to (de)alloc
3. need kernel support, take up kernel data structure
4. significant overhead and kernel complexity, ctxs as expensive as svc.
5. scheduling is efficiently done by kernel itself
6. may not be associated with a processes
7. implement bkg tasks in kerel, (async handling or waiting for event)
8. kernel can use them to service multiple SVCs concurrently
9. Need a TCB

## Thread Mapping

1. kernel level thread: virtual processor
2. user level thread: thread

### Many to One

Many user threads are mapped to one kernel thread

Pros:

1. Thread man done by lib in user mode => efficient
2. As many threads as devs want

Cons:

1. EVERY user thread is blocked if ANY thread makes a blocking svc since kernel is unaware of user level threads
2. Multiple threads unable to access the kernel at the same time, not actually concurrent even on multicore architectures

### One to One

One user thread mapped to one kernel thread

Pros:

1. Blocking svc on one thread doesn't affect the others
2. True concurrency

Cons:

1. Overhead related to creating a kernel thread
2. Number of threads limited

### Many to Many

Best of both worlds, multiplexed many user level threads to equal or lesser number of kernel threads.

1. Users can create as many threads as they like
2. As many concurrent threads as virtual cores

A variation of many to many is a two level model, where some threads may be mapped to one-one with kernel threads. Kernel may allocate more kernel threads to a single process on demand.

## Hyper Threading

1. A single CPU appears as two (or more) logical CPUs to the kernel.
2. physical cores split into multiple virtual cores
3. increases efficiency as the kernel assumes that there are two independent CPUs for utilisation
4. The idea is similar to pipelining/context switching on the hardware level

1. **Data parallelism**: Perform the same operation on different cores on subsets of the same dataset.
2. **Task parallelism**: Delegation, may or may not be operating on the same dataset

## Amdahl's Law

if $\alpha$ is the fraction of the program that must be executed serially, then the maximum speedup that can be gained when running this program with $N$ processors is:

$$\cfrac{1}{\alpha + \cfrac{1-\alpha}{N}}$$

## Appendix

### Daemons

- Bkg process that performs a specific function or system task.
- User mode.
- System programs that are kept out of the kernel

1. Generally persistent
2. No controlling terminal, (controlling `tty` process group (`tpgid`) `-1`)
3. Parent init
4. Own process group `id` and session `id`

### Linux Startup

1. BIOS -> Bootloader -> OS -> setup system functions that are crucial for hardware and memory paging, perform the majority of system setups pertaining to interrupts, memory management, device, and driver initialization
2. `idle` and `init` user processes, `init` starts more daemons
3. Display Manager (explorer.exe) is a daemon -> Lock screen -> session (set of programs, UI elements, etc which form a complete desktop env)
