
A **file** is a uniquely named collection of related information that is stored on the secondary storage. It acts as a logical storage unit in the computer, defined by the OS.

Two types of entities in a file system:

1. Directories - has a structured namespace
2. Files

A file consists of metadata and attributes (stored in the inode) such as name, size, datetime of creation, userId, etc. Its content is a group of data bytes

A file can have a file extension which (usually) indicates the type of file that it is.

## File Interpreters

NTFS, FAT, EXT4

1. OS Kernels:
    1. unix based OS implement directories as special files.
    2. it knows the difference between directories and regular files\
    3. supports executable files
    4. Doesn't understand any other formats
2. System programs
    1. Compilers (.c) , Linkers and Loaders (elf)
3. User applications
    1. VLC (mp3, mp4)
    2. MS Word (.docx) etc.

### File Attrs

A file has the following attrs:

1. Name
2. Identifier: usually a number (stored in inode) that identifies the file within the file system. It is the non-human-readable name for the file
3. Type/Format
4. Location (pointer)
5. Size
6. Protection and Access control information
7. Time and date of creation/modification, owner

`ls -ali` shows the files with their permissions and identifiers

## File Interface

1. create
2. read
3. write
4. delete
5. reposition
6. truncate (`file.length = 0`)

### Creation

1. free space is available
2. An entry for the new file must be made in the directory (OS)

### Read/Write

1. `open()` (must have perms)
2. `read()/write()` on file pointer (byte by bye)
3. `close()`

### File Deletion

1. free the space occupied by the file
2. Remove its entry from the directory

### Truncation

1. We keep the file's attributes, but its lengnth is set to 0
2. The space for the file is released

### Reposition

1. `open()`
2. move the file pointer to another portion of the file (say byte `N`) `lseek()`

### Complex operations

`copy` can be performed by `create`ing a new file, `opening` and `read`ing the old file and `write`ing to the new file

## The File System

**Maintains and organises a physical secondary storage**

A file system controls how data is **stored** and **retrieved** in a system.

It is a **set of rules (and features)** used to determine the way data is stored.

FS **logically** separates the segments of data on a disk and gives each piece a unique name. Each group of data is the contents of a file, and file attributes may be stored elsewhere. The structural and logical rules used to manage these groups of data are called a "file system".

FSs may vary between OSs, but there are a few that are widely used:

1. File Allocation Table (FAT) (Win)
2. NTFS (default on Win)
3. ext4 (linux)
4. Universal Disk Format UDF (DVDs)
5. Hierarchical File System (HFS) (macOS)
6. Apple File System (AFS) (macOS)

## Unix file system data structures

![unix](https://natalieagus.github.io/50005/assets/images/week6/4.png)

1. File Descriptor Table: FD table per process -> Contains file descriptors which are numbers that uniquely (per proc) identify an open file in a computer's OS. Each FD is associated with a file pointer that points to the SWOFT.
2. System Wide Open File Table (SWOFT): Contains a list of all opened files, sockets, devices (anything that uses `open()`)
    - `cp`: current pointer (pointer to the specific byte of the file being read)
    - `Access status`: such as read/write/append/execute etc.
    - `Open count`: How many FD table entries point to it. We cannot remove open file entries unless their ref count reaches 0
    - `Inode pointer`: A pointer to a Unix inode table.
3. Inode Table: short for Index Node Table or File Contorl Block (FCB): **database** of all **file attributes** and the **locations** of their contents
    - Does not store filename

## File System Mapping

1. Multiple FD table entries can point to the same swoft
    1. FD pass to another proc by sockets
    2. FD inherited from parent after `fork()`
    3. Single process can have two or more FDs that ref the same file. `dup()` or `dup2()`. Two FDs created this way affect each other

2. Multiple swoft entries can point to the same inode. This happens when multiple files call `open()` on the same file. Two FDs do not affect each other this way.

## Appendix

### Inode

![ap](https://natalieagus.github.io/50005/assets/images/week6/10.png)

### The physical fs
logical fs is the interface. this is what happens on bare metal

1. Boot Control Block per Volume. Contains the information needed by the system to boot an OS from that volume
2. Volume Control Block. contains volume details, such as number of blocks, block size, free block count, free block pointers, free FCB count and FCB pointers.
3. Directory Structure. used to organise files
4. FCB. one entry per file, contains attrs, has a unique id and associated with a directory entry.

Volume vs Partition:

1. A single volume can span multiple disks, a partition is created on a single disk.
2. Volumes have names (C:\) partitions are only identified by numbers.
3. Partitions are more sutited for individual devices, volumes are more suited for network attached storages

### Mounting fs during boot

**root** partition which contain OS kernel and sometimes other system files, is mounted **at boot time**. The system has an **in-memory mount table** that contains information about each mounted volume. Other volumes can be automatically mounted at boot time or later, depending on the operating system.

The mount procedure:

1. The OS is given the **name** of the device and the **mount point** - the location w/i the file structure where the fs is to be attached
2. Typically, the mount point is an empty directory.

In memory information about the fs is loaded at mount time and there are three data structs related to this:

1. Mount Table: ![mt](https://natalieagus.github.io/50005/assets/images/week6/11.png)
2. Inode Table: contains directory structure and file pointers to the actual data on secondary storage or cached memory. ![img.png](https://natalieagus.github.io/50005/assets/images/week6/12.png)
3. swoft
4. FDT ![fdt](https://natalieagus.github.io/50005/assets/images/week6/13.png)

## Searching for a file

Since a directory is also a file, it has its own inode number. Its contents are other filenames (can also be dirs, subdirs) and their inode numbers.

Each volume/partition also contains information about its own fs. The volume table of contents is a list of entries in the device directory that have info like filenames, size, etc.

## Purpose

1. Locate: a (group of) files quickly
2. Naming:
    - same name for different files in different directories
    - same name for different extensions
    - same file can have different names (links)
3. Organisation

## Folder

A folder is a GUI concept, because of the icons. The term directory is more **broad** and refers to a general collection of files

## Directory operations

All of these involve modifying the dir:

1. `create/delete`: create/delete a file or subdi
2. `list`
3. `rename`: a file
4. `search`: for a file
5. `traverse`: `cd`

## Directory structure

### Single level

All files in one folder

### Two level

Separate folder per user

### Tree level

Unique path to reach file (no links)

## File Links

Different filenames may point to the same inode entry. These are formally called links

### Hard Link

Extra names mapped to the same inode entry. Multiple "files" can point to the same content. Each hard link increases the ref count of the file in the inode entry.

`.` and `..` are hard links!

In unix, directories cannot be hard linked, this is done to keep the directory structure acyclic. Symbolic links should be used instead

### Symlinks

Symbolic Links are simply files whose content is a text string (reference to another file/dir) which is automatically interpreted and followed by the OS as a path to another file/dir.

Symlinks aka soft links. dirs can be linked with symlinks.

Symlinks do not increase the ref count. Will break if the original file that it is pointing to is deleted (although this is not a consequence of ref count not being `++`). The link will work again if the deleted file is recreated

## Graph Directory Structure

### Acyclic

multiple paths can reach the same file (links)

### General

Self referencing can cause infinite loops. Reference counting does not work if there are self references. Performance issues with searching and traversal


