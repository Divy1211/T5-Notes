## Security Conditions

1. Confidentiality: only the sender - receiver know the contents, encryption
2. Authentication: sender - receiver confirm the identity of each other
3. Message Integrity: Ensuring that the message has not been altered in transit or afterwards
4. Access & Availability: Services must be accessible and available users

## What can a malicious person do

1. Eavesdrop
2. Insert/Delete/Modify Messages
3. Impersonate (spoof/phishing)
4. Hijacking: Taking over
5. DoS

## Encryption Algorithm

1. Security by secrecy
2. Security by obscurity

Symmetric (both same)/Asymmetric (different enc/dec) keys

1. Sub cipher, key: mapping

## Data Encryption Standard (DES)

- 56 bit symmetric key, 64 bit plaintext input (padding if needed)
- Block cipher w/ block cipher chaining
- DES 56 bit key encrypted phrase is decrypted in less than a day
- no known analytic attack
- DES more secure
    - 3DES: encrypt 3 times with 3 different keys
- Operation:
    - 16 identical rounds
    - choose 48 different bits of key Ki
    - 64 bit input - permute -> L1 R1 -> L2, R2 = f(L1, R1, K1) repeat ... L17, R17 - permute -> 64 bit output

## Advanced Encryption Standard (AES)

- 128, 192 or 256 bit keys, 128 bit data blocks
- brute force that takes 1s on DES will take 149T years on AES

## Symmetric Key Enc

1. Secret shared key
2. Diffie Hellman key exchange

## Public Key (Asymmetric) Enc

1. Diffie Hellman76, RSA78
2. No secret key shared
3. Public enc key known to all
4. Private (aka Secret) dec key known only to receiver

How does it work?

1. PK can enc SK can dec.
2. You generate a pair and give out the PK
3. People send you a message by enc with your PK so only you can dec with your SK

### RSA

Generating a PK SK Pair:

1. Two large primes = $p, q$ (1024 bits)
2. $n = pq$ and $z = (p-1)(q-1)$
3. pick $e$ : $e < n$ and $gcd(e, z) = 1$
4. pick $d$ : $ed = 1 (\mod z)$
5. PK = $(n, e)$ & SK = $(n, d)$
6. $c = m^e (\mod n)$
7. $m = c^d (\mod n)$
8. This works because $(m^e (\mod n))^d = m (mod n)$. Why?

This is secure if $n$ is large because to figure out $d$ from $(n, e)$ you need to find the prime factors of $n$ to compute $z$

1. PK(SK(m)) = SK(PK(m)) = m

This means that if a sender encrypts a message with their SK, only their PK can decrypt it => authentication! Thus, a sender's SK acts as their Digital Signature

RSA is slow, because the numbers involved are big, and exponentiation on big numbers is expensive. Thus, RSA is used to establish a shared (session key) Ks to be used with DES or another algo. Enter Diffie Hellman

### Diffie Hellman Key Exchange

## Message Digests, Digital Fingerprints

Computationally expensive to do an SK encryption of the entire message everytime a message is sent. Solution: Fixed length hashing (collisions possible but rare, also computationally infeasable to find an m such that x = H(x)). Sender can now send this encrypted hash value as a fingerprint.

### Susceptibility:

Man in the middle attack. Solution: Certification Authorities. CAs are trusted 3rd parties which sign a sender's PK with their digital fingerprint (known to everyone by default, comes preinstalled/comes with browser). To get someone's PK, ask CA for their certificate and use the CA's PK to decrypt it!

