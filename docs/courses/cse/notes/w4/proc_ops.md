We can perform the following operations on processes:

1. spawning child processes
2. terminate the process
3. set up inter-process communication channels
4. change the process priority

And many more. All of these operations require an SVC.

## Process Creation

the `fork()` SVC can be used to create a **child** process from a **parent** process. Each child may furhter create more chilren processes, creating a process tree:

![pt](https://natalieagus.github.io/50005/assets/images/week3/8.png)

**Process ID**: each process is identified by a unique (on the system) process ID

`ps` on linux shows a list of processes with their pid.

### Child vs Parent Process

The new child process creates a duplicate of its parent's address space at the exact time the fork occurs. Parent and child processes execute in different address spaces (in isolation).

`fork()` returns 0 in the child process, but returns the child's process ID in the parent process. This can be used to make separate executions for the two processes.

`execlp()` SVC can be used to replace the address space of one process with another (basically start a new process in its place)

the `wait()` or `waitpid()` SVC can be used by a parent process to wait (blocking system call) for the child processes to finish execution. `wait()` blocks the parent process until one of its children processes have exited. It returns a `< 0` value if all child processes have exited

Once the child has finished execution and the parent process resumes, we say that the child has been **reaped**. It is necessary for every child process to be reaped by the parent using `wait()` for its PCB and scheduler releated resources to be cleaned up. (RAM is cleaned when child process exits either way)

`kill(pid, SIGKILL)` SVC kills a process, or it may terminate itself by `exit()`

### Orphaned Processes

Active child processes whoes parent process has been terminated. These can either be:

1. Terminated
2. Adopted by the `init/launchd` process

The `init` process on linux is one of the two first processes to run.

### Zombie Processes

Terminated child processes who were not reaped by their parent process. The RAM and other resources of these processes are freed by the OS, but not the PCB entry. Zombie processes are terminated by the OS if their parent process dies.