The OS provides services for user programs. The goal of an OS is to allow the users of a computer to use it in a more efficient manner

## Basic Support

1. Program Execution: load into memory and run the program on request. Program can end its own execution normally or via an error
2. I/O Operations:
3. File System: read/write/create/delete/search for files and directories, see file's meta info. Permission management
4. Interprocess Communication: Shared Memory/Message Passing - packets moved between process by the OS. This includes a communication protocol to connect to the internet where processes in different physical computers can communicate
5. Error Detection: The OS should be aware of potential errors. CPU errors, memory errors (power failures, etc.) in I/O devices. For each error, the OS must know how to appropriately deal with it.

## Sharing Resources

**Diagnostics** reports and computer **sharing** feature:

1. Resource sharing: Multiple users or multiple jobs running at the same time. Resources handled: CPU, memory, file storage, I/O
2. Resource accounting: Record keeping that can be used for accounting (billing users for usage) or accumulating usage stats

## Network Security

**Protection** and **security** against external threads

1. Access to system resources is controlled
2. Defend against invalid requests coming from external hardware/IO devices
3. Record network traffic and connections for detecting break ins

## UI

1. GUI or CLI
2. Write instructions and make SVC

### GUI 

The GUI or Desktop Env is what we usually call **home screen** or **desktop**. It characterises the look and feel of the OS.

### CLI

Command Line Interpreter is what we usually call **the terminal** or **command prompt**. The user issues **successive** commands to the program in the form of text. Commands in a shell can be **built in** or invocations for **system programs**


