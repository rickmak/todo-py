import logging
from wsgiref.simple_server import make_server

from app import todo_app

logging.basicConfig(level=logging.DEBUG)


with make_server('', 6543, todo_app) as httpd:
    print("Serving HTTP on port 6543...")
    # Respond to requests until process is killed
    httpd.serve_forever()
