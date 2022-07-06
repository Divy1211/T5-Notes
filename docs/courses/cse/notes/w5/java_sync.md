synchronised **methods** and **statements**.

Every java object has an associated binary lock.

Lock is acquired/released by invoking/exiting a synchronised method/block.

Synchronised member functions block all other synchronised methods from execution as well, but only for that particular instance. Other instances may call the same method without issues.

A call to a static synchronised function blocks other static synchronised functions only.

Threads waiting to acquire a lock wait in the entry set. Threads listening for an event wait in the wait set.

Every java object has a wait and entry set.

`wait();` and `notify();`

```java
public synchronized void doWork(int id) {
   while (turn != id) { // turn is a shared variable
       try {
           wait(); 
       } catch (InterruptedException e) {}
   }
   // CRITICAL SECTION
   // ...  
   turn = (turn + 1) % N;
   notify();
}
```

when calling `wait();` the mutex must be held by the caller. This is to ensure a TOCTOU condition doesn't happen.

`notify();` picks an arbitrary threat in the wait set and moves it into the entry set. The state of the thread is changed from locked to runnable.

`notify();` might not wake up the right thread whose `turn == id`. We can thus use `notifyAll();`

it is important to call `wait();` in a loop because

1. **Suprious** wakeup: without signal
2. **Extraneous** wakeup: when `turn != id` for you

A re-entrant lock is a lock that can re-acquire itself.

A non re-entrant will suffer from re-entrance lockout if we use recursion on it.

```java
// Create arrays of condition
Lock lock = new ReentrantLock();
ArrayList<Condition> condVars = new ArrayList<Condition>();
for(int i = 0; i<N; i++) condVars.add(lock.newCondition()); // create N conditions, one for each Thread
```

```java
// the function
public void doWork(int id)
{
   lock.lock();
   while (turn != myNumber)
   {
       try
       {
             condVars[id].await(); 
    }
       catch (InterruptedException e){}
   }
   // CS
   // assume there's some work to be done here...
   turn = (turn + 1) % 5;
   condVars[turn].signal(); 
   lock.unlock();
}
```