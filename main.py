from http.server import HTTPServer, SimpleHTTPRequestHandler

# Define the IP addresses allowed to access the server
whitelist = ["192.168.0.1"]

class WhitelistedRequestHandler(SimpleHTTPRequestHandler):
    def check_client_address(self):
        # Get the client's IP address
        ip = self.client_address[0]
        
        # Check if the IP address is in the whitelist
        if ip not in whitelist:
            self.send_error(403, "Forbidden")
            return False
        else:
            return True

# Set up the server
server_address = ("", 8000)
httpd = HTTPServer(server_address, WhitelistedRequestHandler)
# Start the server
print("Server is running...")
httpd.serve_forever()
