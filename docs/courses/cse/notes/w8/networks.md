f## Components of a network

1. End systems, **clients** running network apps
2. Communication links: fiber optics, radio
3. Packet switches: forward packets. **routers** and **switches**
4. Protocols: TCP, ID, UDP, HTTP, etc.

## The internet

A network of networks - Interconnected ISP

### Componenets of the Internet

1. Standards (open, free)
    - RFC: Request For Comments
    - IETF: Internet Engineering Task Force
2. Infrastructure that provides services to applications
    - Web, VoIP, email, games
3. Programming interface to apps
    - hooks that allow sending and receiving app programs to connect to the internet
    - provides service options, analogus to postal service
    - Socket APIs

## Important Properties for the Internet

1. Interoperability: standard communication protocols (HTTP, TCP, UDP, IP, ARP, whatever-P), conventions.
    - Each `P` deals with a  unit of data called a _packet_. Each packet has a **H**: header and a **P**: payload.
    - protocols define format, order of msgs sent and received among network entities, and actions taken on msg transmission and receipt
2. Shared resources: Internet is a shared resource.
    - Time division multiplexing (TDM, eg: RCS)
    - Frequency division multiplexing (FDM, eg: multiprocessors)
    - Data traffic is _bursty_. Packet switching & statistical multiplexing:
        - 1 Mbps link.
        - Each user 100 Kbps **when** active.
        - Active 10% of the time.
        - Packet occupies the link on demand only
        - FDM or TDM - fixed dedicated fraction of link
3. Complex interacting components
    - Many pieces to a network: naming, routing, reliability, lots of apps
    - Emergent Behaviour
    - Layering reduces interactions from $\mathcal{O}(N^2)$ to $\mathcal{O}(N)$ where $N$ is the number of modules
    - Internet protocol stack:
        - Application (FTP, HTTP)
        - Transport (TCP, UDP)
        - Network (IP, routing)
        - Link: data transfer b/n neighbouring network elements (Ethernet, Wifi)
        - Physical: Hardware
        - Cascaded headers
4. Scalability
