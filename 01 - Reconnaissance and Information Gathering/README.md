# Reconnaissance and Information Gathering

This is the first step in pen-testing used to gather data about the target:

- **Active information gathering:** Use Kali Linux machine to get as much data about the machine while interacting with it.
- **Passive information gathering:** You usually have a middle source and all the information goes through that middle source. This is similar to a Google search.

## What information are we looking for?

- The first thing we search is their IP Address.
- If it is a company, we would want to gain information about the employees like phone numbers or emails.
- We would like to know what softwares the company uses. If there is a software that has a vulnerability that can be exploited, that would be our way in.

## Getting the target's IP Address

- By pinging a website, you send ICMP packets to it and you are also able to get the IP Address of the website.
- You can also do this using the `nslookup` tool.
- You can also use the `whois` tool.

## WhatWeb Stealthy Scan

[Kali Docs for `whatweb` command](https://www.kali.org/tools/whatweb/). I have used a [basic node server](./basic-node-server/) that I created for testing.

```bash
sudo ifconfig
whatweb 192.168.1.1-192.168.1.255 --aggression 3 -v --no-errors
```

### WhatWeb Aggression Levels

- **Level 1 (Stealthy)**: Single request per target, passive detection only
- **Level 2**: Makes a handful of requests, generally safe for most websites
- **Level 3**: More aggressive, makes many requests to thoroughly fingerprint the target
- **Level 4**: Highly aggressive, performs extensive crawling and testing (can take hours to days)

### Common WhatWeb Options

```bash
# Basic scan of a single target
whatweb example.com

# Scan with increased verbosity
whatweb example.com -v

# Scan multiple IP addresses in a range
whatweb 192.168.1.1-192.168.1.255

# Output results to a file (formats: txt, xml, json, etc.)
whatweb example.com --log-json=results.json

# Scan with custom user agent
whatweb example.com --user-agent="Mozilla/5.0"

# Scan with HTTP authentication
whatweb example.com --user=username --password=password

# Scan through a proxy
whatweb example.com --proxy=http://proxy:port
```

### Interpreting Results

WhatWeb identifies:

- Server technologies (Apache, Nginx, Node.js, etc.)
- CMS platforms (WordPress, Drupal, etc.)
- JavaScript libraries
- Advertising networks
- Analytics tools
- Security headers
- And many other web technologies and configurations

For highest stealth during penetration testing, use aggression level 1. For more thorough scans where stealth isn't critical, levels 2-3 provide good results while level 4 should be used only when comprehensive results are required and time isn't a constraint.

## Using `theHarvester` and `Hunter.io`

[theHarvester Docs](https://www.kali.org/tools/theharvester/)

```bash
theHarvester -d senecahackathon.com -b all
```

Harvester does not always work properly so you should always scan it multiple times to see if you get any different results.

You can use [hunter.io](https://hunter.io/) to get the emails of people.
