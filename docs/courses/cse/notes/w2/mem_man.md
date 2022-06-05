The kernel manages all the memory devices (RAM, Disk, Cache) so that they can be shared among many processes. The hierarchical storage structure requires a concrete form of memory management, since the same data may appear in different levels of the storage system

## Virtual Memory

The kernel implements virtual memory. It must support:

1. Demand paging
2. Keep track of which memory is used by what
3. Decide which processes and data to move in and out of RAM
4. Mapping files into a process address space
5. Allocate and Deallocate memory as needed
   1. if RAM is full, start using swap space
6. Manage the **pagetable** and any operations associated with it

Note: CPU Caches are managed entirely by hardware (replacement, hit, miss, etc), however the Kernel may do some initial setup (policy)

### MMU

The MMU is a **hardware** component that handles the translation of VA to PA. It uses the **pagetable**, which is set up by the kernel who also determines the rules for address mapping. The kernel only programs the MMU to perform VA -> PA mapping

### Cache performance

Hit ratio $\color{yellow}\alpha$

Hit access time $\color{yellow}\tau$

Miss access time $\color{yellow}\epsilon$

Effective access time: $\alpha \tau + (1-\alpha)\epsilon$

## Process Management

The kernel is also responsible for process management, **multiprogramming** and **time sharing**

### Multiprogramming

Multiprogramming means that the CPU is always being utilised by some process or the other. It is the kernel's job to ensure that the CPU never goes idle. It improves efficiency.

The reason for need of multiprogramming is that:

1. Single users must not hog the CPU/IO devices
   1. CLK speed of modern comps vroom (Ghz)
   2. Too fast for just one process
   3. CPU goes idle if only one process uses it (since the process may be I/O, or disk loading, etc.)
2. A **subset** of the total jobs in the system is kept in the memory + swap space
3. One job per CPU is selected to be run by the scheduler
4. When a particular job has to wait, a context switch is performed

### Timesharing

Multiprocessing also allows for timesharing.

Time sharing refers to context switches that are performed so fast that the users observe the system as interactive and seemingly capable of running a lot of processes simultaneously despite only having a limited number of CPUs.

Timesharing is the logical extension of multiprogramming. It results in an interactive computer system, which provides direct communication between the user and the system

## Process vs Program

Process - active entity, has a context, state changing over time. Needs resources (CPU, RAM, I/O) to run.

Program - passive entity, lines of instructions. Does not require resources

The kernel allocates the resources required for the process when it is started, and also cleans them up after the process when it terminates.

**Kernel is not a process**. There may be kernel threads. For instance, an I/O handler is a program that is written JUST to handle certain events.

The kernel is special instructions that user processes jump to, via SVCs and Interrupts. It is part of every user process (**piggybacks**) and not one by itself!

## Process Manager

Part of kernel scheduler. Manages and keeps track of system wide **process table**.

Responsible for:

1. Creating/Terminating both user and system processes
2. Pausing and resuming processes in the case of interrupts
3. Sync-ing processes and providing interprocess communication
4. Provides mechanisms to handle dead locks

## Security and Protection

The kernel provides a mechanism for controlling access of a process to resources defined by the OS

1. User IDs
2. Group IDs

are associated with each process and file that determine its "priviledge" level. **Priviledge Escalation** is an event by which a user can change their ID to another effective ID with more rights.

Kernel also provides **defensive security measures** to protect the computer against internal and external attacks, via firewall, encryption, etc. Network security issues