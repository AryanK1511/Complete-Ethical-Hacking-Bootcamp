# Scanning

This is the second phase of penetration testing and is more focused on the target's technology and how to exploit the vulnerabilities that this technology might have.

## The Theory Behind Scanning

- We will send TCP and UDP packets to the target which will allow us to get information from the target.
- We are looking for open ports in a machine. Secure machines have all ports closed.
- If the software that a company runs on open ports is outdated and has vulnerabilities, we can exploit them.

## TCP and UDP

- TCP stands for Transmission Control Protocol
- TCP is the most commonly used protocol on the internet
- Used when loading webpages, clicking links, signing in, posting comments
- TCP is not one-way communication
- Based on three-way handshake process
- Step 1: SYN - client sends Synchronized Sequence Number to start communication
- Step 2: SYN/ACK - server responds to client's request
- Step 3: ACK - client acknowledges server response, establishing reliable connection
- TCP guarantees packets arrive in order by numbering them
- Server sends acknowledgment messages back to sender
- Sender will resend packets if correct response not received
- All packets are checked for errors
- TCP prioritizes reliability
- No data is lost or corrupted in transit
- UDP stands for User Datagram Protocol
- Datagram is same as a packet of information
- UDP works similarly to TCP but without error checking
- UDP is much faster than TCP
- Used when speed is more important than error correction
- Common uses: live broadcasts and online games
- UDP doesn't care if packets reach their destination
- UDP won't resend missing packets
- Cannot request missing packets again with UDP

## Netdiscover

- The first part of scanning a network is to see what machines you have on a network.
- ARP (Address Resolution Protocol) is a networking protocol used to discover the link layer address (such as a MAC address) associated with a given network layer address (typically an IPv4 address). When a device wants to communicate with another device on a local network, it needs both the IP address (which it already knows) and the MAC address (which it needs to discover) of the destination device.
- ARP is not good to communicate with hosts since if you have never communicated with the host before it does not show up as th einfo is read from arp tables. so we use netdiscover.
- To use arp, use the `arp -a` command.
- To use netdiscover, use the `sudo netdiscover` command.
- Use the `netstat -nr` command to check the address of your router.

## Using `nmap`
