# Web Application Penetration Testing

## Overview of Web Application Testing

- **Web application testing** focuses on identifying vulnerabilities and bugs in websites.
- Websites are exposed to the **internet**, which makes them vulnerable as anyone can access them.
- This exposure poses risks not only to the **servers** hosting the website but also to the **users** who interact with the website once it is compromised.
- **Code injection** involves writing malicious code where it shouldn't be, such as injecting code into a search bar. This can cause a range of security issues.
  - **JavaScript Code Injection** or **XSS (Cross-Site Scripting)**: Allows an attacker to execute malicious code within the website.
  - **SQL Injection**: Involves sending SQL queries through input fields, allowing the attacker to manipulate the database by retrieving or modifying data.
  - **Command Injection**: Some attacks target the server through input fields. For example, if a website pings other websites, an attacker could inject a different command instead of an IP address, causing the server to run malicious commands and return results to the attacker.
- **Bug Bounty Programs**: Websites offer rewards for discovering vulnerabilities and reporting them responsibly. This is a way to encourage external security experts to help secure websites.

## HTTP Request and Response

Understanding the basics of HTTP requests and responses is crucial for web app penetration testing.

### Components of an HTTP Request

- **Host**: Specifies the website domain being requested. Sometimes includes a **port number**, which indicates that the server may be hosting multiple websites.
- **User-Agent**: Identifies the browser making the request.
- **Cookies**: Often contain session-related data.
- **Auth Param**: May include authentication tokens like a **JWT** (JSON Web Token) for authentication.

### Components of an HTTP Response

- **Status Code**: Indicates the result of the request (e.g., 200 for success, 404 for not found).
- **Set-Cookie**: If defined, a cookie is set to store session or authentication information.
- **Cache-Control**: Specifies whether the browser should cache the content.
- **Content-Length**: Tells the size of the response content in bytes.
- **Content**: The actual data (HTML, JSON, etc.) that is returned by the server.

## Information Gathering Using `dirb`

To begin a web application security test, you need to gather information about the website. The **`dirb`** tool helps in identifying hidden directories and files.

Example command to start scanning:

```bash
dirb https://www.senecahackathon.com
```

## Using Burp Suite

**Burp Suite** is an essential tool for penetration testing. It allows you to intercept, modify, and forward HTTP requests and responses, essentially acting as a proxy between your browser and the target website.

### Setting Up Burp Suite with Firefox and Kali Linux

1. Open **Burp Suite** and go to the **Proxy** tab.
2. In **Proxy Settings**, configure the **Proxy Listeners** (e.g., set it to listen on **127.0.0.1:8080**).
3. Open **Firefox** and navigate to **Network Settings**.
4. Enable **Manual Proxy Configuration** and set the proxy to [http://burp:8080](http://burp:8080) (or `127.0.0.1`).
5. Check the option: **Use this proxy for HTTPS**.
6. Download and import Burp’s **SSL certificate** into Firefox:
   - In Firefox, go to **Preferences** → **Certificates** → **View Certificates** → **Import**.

### Helpful Resources

Watch this video to learn how to configure Burp Suite with Firefox and Kali Linux:
[Watch Tutorial](https://www.youtube.com/watch?v=nsxlnRqKYJA)
