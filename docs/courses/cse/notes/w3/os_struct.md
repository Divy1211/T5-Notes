Aside from Kernel and UI, an OS also comes with **system programs (utilities)** and **application programs**

## System Programs

1. **Basic** tools for low level activities
2. **Generic**, can be considered part of the system

They run in user mode

Following are common system programs:

### Package Managers

`ls, rm, mkdir` etc: file management

`brew` - MacOS

`apt` - Linux

`nano` - file modification

### Status Info

`top, ls, df`

### Programming Language Support

Compilers, Assemblers, Debuggers for common languages, and respective pkg managers `npm, pip`

### Program Loading and Execution

The system may provide absolute loaders, relocatable loaders, linkage editors, and overlay loaders

### Communication

Programs for **virtual** connections between processes, users and computers. `ssh, pip (|)`

### Background Services

**launching** certain system-program processes at boot time, network related system programs, device drivers.

Constantly running system program processes are known as **services**, **subsystems** or **daemon**

Examples of these:

1. `init` process (**systemd**: linux **launchd**: MacOS)
2. **Schedulers**
3. **Error Monitoring**
4. Print **Servers**

### Application Programs

User programs:

1. Specific user related tasks
2. Installed on demand
3. Require user interaction

System programs:

1. Used for operating hardware and common system usages
2. Preinstalled with OS
3. Run in the background, minimal to no user interaction

## User and System Goals

1. User goals: OS should be convenient to use, easy to learn, reliable, safe, fast
2. System goals: The system should be easy to design, implement, and maintain; and it should be flexible, reliable, error free, and efficient.

## Policy and Mechanism Separation

1. Policy: determines what will be done
2. Mechanism: determines how to do something

The separation of policy and mechanism is important for flexibility:

Policies are likely to change across places or over time. In the worst case, each change in policy would require a change in the underlying mechanism.

A general mechanism that is insensitive to policy changes is better. A change in policy would just require tweaking the parameters of the mechanism.

## OS Structures

### Monolithic Structure

A monolithic kernen is an OSA where the entire OS is working in the kernel space. It can operate **with or without dual mode**

#### Without dual mode

1. The interfaces and levels of functionality are **not well separated** (all programs can access hardware directly) The architecture (intel 8088) that MS-DOS was written for did not support dual mode
2. Application programs were able to use basic I/O routines to write directly to the display and disk drivers
3. Thus, vunerable to errant (or malicious) programs, causing entire system crashes when a user program fails

MS-DOS:

![msdos](https://natalieagus.github.io/50005/assets/images/week2/8.png)

#### With dual mode

The early Unix OS was layered to a **minimal** extent with very simple structuring.

![unix](https://natalieagus.github.io/50005/assets/images/week2/9.png)

The kernel provides FS management, CPU scheduling, memory management, and other OS functions through SVCs, all crammed into one level.

1. Pros: distinct performance advantage due to little overhead in SVC/communication within the kernel.
2. Cons: difficult to implement and maintain.

Other monolithic dual mode oS: BSD and Solaris

### Layered Approach

OS broken into layers, layer 0 is hardware layer and layer N is user interface layer.

![layers](https://natalieagus.github.io/50005/assets/images/week2/10.png)

Pros:
1. Simple to make and debug
2. Each layer is implemented with only the lower layer's operations - maintainability, abstraction

Cons:
1. Appropriately defining the layers and planning
2. Assume that the layer below our's works correctly
3. Assume that the bug is in our code, not a compiler
4. Sometimes, 2. and 3. are not true, specially with growing size of OS.
5. Longer SVC times

Eg: Windows NT

### Microkernel

very small kernel that provides minimal proc and mem man, in addition to communication functionality. The idea is to keep all non-essential code out of the kernel and implement them as system programs. Thus, we get a smaller kernel that only does:

1. IPC
2. Mem Man
3. Scheduling

Pros:
1. Extending the OS is easier as all new services are added to the user space and do not require constant modification of the kernel.

Cons:
1. Overhead due to frequent context switches. Example: Mach, Windows NT (first release was a microkernel).

### Hybrid Approach

Combine micro and monolithic kernels

Example: MacOS

1. Mach provides: IPC, scheduling, memory management
2. BSD provides: CLI, file system management, networking support, POSIX APIs implementations    

![hy](https://natalieagus.github.io/50005/assets/images/week2/13.png)

### Java Operating System (JX)

The JX OS is written almost entirely in Java. Such a system is known as **language-based extensible** system and runs in single address space (no virtualisation, or MMU). Thus it has difficulty maintaining memory protection

Language-based systems instead rely on type-safety features of the language. As a result, language-based systems are desirable on small hardware devices, which may lack hardware features that provide memory protection.

Since Java is a type-safe language, JX is able to provide isolation between running Java applications without hardware memory protection. This is called language based protection, where system calls and IPC in JX does not require an address-space switch.

JX organises its system according to domains:

![domains](https://natalieagus.github.io/50005/assets/images/week2/15.png)

Each domain is its own JVM

1. An abstract VM that can run on any OS
2. One JVM instance per application
3. Portable execution env. for java based apps
4. It maintains a heap used for allocating memory during object creation and threads within itself, as well as for garbage collection.

Domain zero is a microkernel responsible for low-level details, such as system initialisation and saving and restoring the state of the CPU. Written in C and assembly language. All other domains are written entirely in Java. Communication between domains occurs through a specific mechanism called portals. Protection within and between domains relies on the type safety of the Java language. However, since domain zero is not written in Java, it must be considered trusted (built by trusted sources)