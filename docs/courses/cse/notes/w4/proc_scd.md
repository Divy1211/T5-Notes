A process is an active-dynamic entity, it changes its state overtime, which a program is a static entity

## Context

1. Contents of all the process' registers
2. PC
3. instruction (text section)
4. Dedicated address space
5. stack
6. data
7. heap

A program becomes a process when instructions from an executable are loaded into memory. **Concurrency** and **protection**

## Process Scheduling States

1. **New**: The process is being created
2. **Running**: The process is running
3. **Waiting**: The process is waiting for some event to occur (I/O)
4. **Ready**: The process is ready to be assigned to a processor to start execution
5. **Terminated**: The process has finished execution

## Process Table and Process Control Block

The system wide process table is a data struct that is maintained by the kernel to facilitate **context switching** and **scheduling**. Each process' metadata is **stored** by the kernel in a Process Control Block (PCB, aka Task Control Block). A process table is made of an array of PCBs, containing info about the current processes in the system

The PCB contains data such as:

1. Process state
2. PC
3. Regs
4. Scheduling Info: priority, pointers to scheduling queues and any other scheduling programs
5. Memory Management Info: Page tables, MMU-related info, memory limits
6. Accouting Info: CPU and real time used, time limits, account numbers, process id (pid)
7. I/O status Info: The list of I/O devices allocated to the process, a list of open files

In the linux kernel, the proctable is a **doubly linked list** whoes nodes are made up of `task_struct`s implemented in C. The kernel maintains a `current_pointer` to the process currently running in the CPU

## Context Switching

When a CPU switches execution between processes, the kernel has to store all the process' metadata (the updated `task_struct`) in the corresponding PCB and then load the new process' information from its PCB

**Context switch**: The mechanism of saving the states of the current process and restoring (loading) the state of a different process when switching the CPU to execute another process.

The advantages of rapid context switching is that it gives the **illusion** of concurrency in a single processor system

1. Improved responsiveness, multiple apps at ocne
2. Support for **multiprogramming**: **optimise** CPU usage, we cannot allow one single process to hog the CPU specially if the process blocks execution when waiting for I/O calls.

The drawbacks of context switches is pure **overhead** related to saving and restoring a context. Context switch times are highly dependent on hardware support, some hardware support rapid context switching out of the box, and circumvent the CPU entirely by having a dedicated unit for it.

