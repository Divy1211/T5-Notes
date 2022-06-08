Processes need to cooperate for the following reasons:

1. Information sharing
2. Speeding up communication
3. Modularity and convenience

Thus, IPC mechanisms are supported by the kernel:

1. Shared memory
2. Message passing (sockets)

## Shared Memory

Created using a system call. The kernel allocates and establishes a region in the memory and returns it to the calling process. Once established, all accesses to it are treated like normal user memory access and no assistance from the kernel is required.

Using the `shmget` system call. `SHM_KEY` is a unique integer that must be known to both the processes in order to use the same shared memory.

```cpp
int shmid = shmget(SHM_KEY, 1024, 0666 | IPC_CREAT);
```

Using `shmat` attaches the shared memory into the process' own address space:

```cpp
void* str = shmat(shmid, NULL, 0);
```

![shm](https://natalieagus.github.io/50005/assets/images/week3/13.png)

The shared memory can be detached from the virtual address space of the process using:

```cpp
shmdt(str);
```

Finally, the shared memory control function can be used to free/destroy the memory. This must be done by the last process reading from it.

```cpp
shmctl(shmid, IPC_RMID, NULL);
```

synchronisation issues.

## Message Passing

Message passing allows two processes to communicate synchronously, usnig svcs.

### Socket

A socket is one endpoint of a two-way communication link between two programs running on the network with the help of the kernel:

1. It is a concatenation of an IP address, e.g: 127.0.0.1 for localhost
2. And TCP (connection-oriented) or UDP (connectionless) port, e.g: 8080.

- When concatenated together, they form a socket, e.g: 127.0.0.1:8080. All socket connections between two communicating processes must be unique!

When on the same machine, two processes can communicate using the IP `localhost` and an  **unused** port number. `read()` and `write()` data using svc

![socket](https://natalieagus.github.io/50005/assets/images/week3/15.png)

![socket2](https://natalieagus.github.io/50005/assets/images/week3/14.png)

One process uses the `write()` svc to copy data from its own space to kernel space, then the other process uses the `read()` svc to copy the data from kernel space into its space

### Message Queue

Another interface for message passing. Uses svcs: `ftok`, `msgget()`, `msgsnd()`, `msgrcv()` (can be both blocking/non blocking)

![mque](https://natalieagus.github.io/50005/assets/images/week3/16.png)

Kernel maintains the message queue - any process can read from/write to it

## Differences:

| Message Passing                                   | Shared Memory                                                                 |
|:-                                                 | :-                                                                            |
| One svc per msg, quicker for low # of msgs        | `shmget` and `shmat` are expensive svcs but subsequent uses of `shm` are fast |
| 1-1                                               | Many processes can use the same block of shared memory                        |
| Faster for smaller amounts of data (svc overhead) | Faster for larger amounts of data (`shmget` and `shmat` overhead)             |
| No synchronisaiton needed (thx kernel)            | Synchronisation needed (need dev)                                             |
| Nothing needs to be freed                         | Needs to be freed or will exist even after process terminates                 |


