from http.server import HTTPServer, SimpleHTTPRequestHandler
import os

# Set the directory to the current script location
os.chdir(os.path.dirname(os.path.abspath(__file__)))

# Basic server configuration
server = HTTPServer(('127.0.0.1', 80), SimpleHTTPRequestHandler)
print("Server starting on http://127.0.0.1:80")
print("Press Ctrl+C to stop")

try:
    server.serve_forever()
except KeyboardInterrupt:
    print("\nServer stopped")