import socket
import termcolor

def scan(target, ports):
    print(termcolor.colored(f"[*] Scanning target {target}", "blue"))
    for port in range(1, ports):
        scan_port(target, port)

def scan_port(ipaddress, port):
    try:
        sock = socket.socket()
        sock.connect((ipaddress, port))
        print(termcolor.colored(f"[+] Port {str(port)} is open", "green"))
        sock.close()
    except:
        print(termcolor.colored(f"[-] Port {str(port)} is closed", "red"))
        
targets = input("[*] Enter targets to scan (split them by ,): ")
ports = int(input("[*] Enter how many ports you want to scan: "))

if "," in targets:
    print(termcolor.colored("[*] Scanning multiple targets", "blue"))
    for ip_addr in targets.split(","):
        scan(ip_addr.strip(" "), ports)
else:
    scan(targets, ports)
        