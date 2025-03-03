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

### Basic Scans

#### TCP SYN Scan

```bash
sudo nmap -sS 192.168.64.11
```

The SYN scan is the default scan when running as root. It's considered "stealthy" because it doesn't complete the TCP three-way handshake.

#### TCP Connect Scan

```bash
sudo nmap -sT 192.168.64.11
```

This scan completes the full TCP connection, making it more detectable on networks with monitoring. It produces more noise as it creates full connections in system logs.

#### UDP Scan

```bash
sudo nmap -sU 192.168.64.11
```

UDP scans are essential as many exploitable services run on UDP. These scans are typically slower than TCP scans due to the connectionless nature of UDP.

**Tip:** Press the up arrow key during a scan to view the percentage of completion.

### Advanced Scanning Options

#### OS Detection

```bash
sudo nmap -O 192.168.64.11
```

For OS detection to work properly, the target must have at least one open and one closed port. This allows Nmap to analyze response patterns that are unique to different operating systems.

#### Service Version Detection

```bash
sudo nmap -sV 192.168.64.11
```

This scan identifies the version of services running on open ports, which is crucial for vulnerability assessment.

```bash
sudo nmap -sV --version-intensity 9 192.168.64.11
```

The version intensity can be adjusted from 0-9 (default is 7). Higher values provide more accurate results but take longer to complete.

#### Aggressive Scan

```bash
sudo nmap -A 192.168.64.11
```

This enables OS detection, version detection, script scanning, and traceroute. While comprehensive, it's easily detectable by security monitoring systems.

### Port and Host Range Scanning

#### Host Discovery

```bash
sudo nmap -sn 192.168.64.1-255
```

Performs a ping scan to determine which hosts are online without port scanning them.

#### Specific Port Scanning

```bash
sudo nmap -p 80 192.168.64.1-255
```

Scans only port 80 across the specified IP range.

#### Multiple Port Scanning

```bash
sudo nmap -p 80,1000,3000 192.168.64.1-255
```

Scans specific ports across the IP range.

#### Port Range Scanning

```bash
sudo nmap -p 80-2000 192.168.64.1-255
```

Scans all ports from 80 to 2000 across the IP range.

#### All Ports Scanning

```bash
sudo nmap -p 1-65535 192.168.64.1-255
```

Scans all 65,535 TCP ports (very time-consuming).

#### Fast Scan

```bash
sudo nmap -F 192.168.64.1-255
```

Scans only the 100 most common ports, significantly reducing scan time.

### Port States Explained

When scanning, Nmap reports ports in one of these states:

1. **Open**: The port is actively accepting connections; a service is listening and accessible.

2. **Closed**: No application is listening on this port, but the port is accessible (packets reach it). The target responds with rejection packets (like TCP RST).

3. **Filtered**: A firewall or other network device is preventing Nmap from determining if the port is open. Packets sent receive no response or are dropped, often resulting in timeouts.

4. **Unfiltered**: (Less common) The port is accessible, but Nmap can't determine if it's open or closed. The response is ambiguous, usually only seen in specific scan types like TCP-ACK scans.

### Firewall and IDS Evasion Techniques

#### Understanding Firewalls and IDS

- **Network Firewalls**: Filter traffic at network boundaries
- **Host-based Firewalls**: Run on individual systems
- **IDS (Intrusion Detection System)**: Monitors networks for suspicious activity

Filtered ports typically indicate firewall presence as packets are being dropped or blocked.

#### Packet Fragmentation

```bash
sudo nmap -f 192.168.64.11
```

Splits TCP headers into multiple packets to evade detection by some packet filters.

#### Custom MTU (Maximum Transmission Unit)

```bash
sudo nmap --mtu 16 192.168.64.11
```

Sets a custom MTU size (must be a multiple of 8). This technique has limited effectiveness against modern firewalls.

#### Decoy Scanning

```bash
sudo nmap -D RND:5 192.168.64.11
```

Generates 5 random decoy source addresses to obscure your actual scanning IP.

```bash
sudo nmap -D 192.168.1.2,192.168.1.3,ME 192.168.64.11
```

Specifies exact decoy IPs with your real IP (ME) included in the sequence.

#### IP Spoofing

```bash
sudo nmap -S 10.0.0.1 192.168.64.11
```

Spoofs your source IP address. Note that you won't receive scan results as they'll be sent to the spoofed IP.

### Additional Evasion Techniques

- **Skip Host Discovery**:

  ```bash
  sudo nmap -Pn 192.168.64.11
  ```

  Treats all hosts as online, bypassing ping blocks.

- **Specify Network Interface**:

  ```bash
  sudo nmap -e eth0 192.168.64.11
  ```

  Forces Nmap to use a specific network interface.

- **Source Port Specification**:

  ```bash
  sudo nmap -g 53 192.168.64.11
  ```

  Sets the source port, potentially bypassing firewalls that allow traffic from certain ports (like DNS).

- **Timing Templates**:

  ```bash
  sudo nmap -T0 192.168.64.11  # Paranoid - Extremely slow
  sudo nmap -T1 192.168.64.11  # Sneaky - Very slow
  sudo nmap -T2 192.168.64.11  # Polite - Slows down to consume less bandwidth
  sudo nmap -T3 192.168.64.11  # Normal - Default timing
  sudo nmap -T4 192.168.64.11  # Aggressive - Faster, assumes reliable network
  sudo nmap -T5 192.168.64.11  # Insane - Very fast, may miss open ports
  ```

  Adjusts scan timing for different levels of stealth or speed.

### Advanced Concepts

#### Honeypots

Purposely vulnerable machines designed to attract attackers and study their techniques. When scanning, be aware that some systems may be honeypots intended to detect and track scanning activities.

#### Nmap Scripting Engine (NSE)

```bash
sudo nmap --script=vuln 192.168.64.11
```

Runs vulnerability detection scripts against the target.

```bash
sudo nmap --script=default 192.168.64.11
```

Runs the default script set (equivalent to `-sC`).

#### Output Formats

```bash
sudo nmap -oN scan_results.txt 192.168.64.11  # Normal output
sudo nmap -oX scan_results.xml 192.168.64.11  # XML output
sudo nmap -oG scan_results.gnmap 192.168.64.11  # Grepable output
sudo nmap -oA scan_results 192.168.64.11  # All formats
```

Saves scan results in various formats for further analysis or documentation.
