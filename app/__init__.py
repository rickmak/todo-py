import os
import logging
import json

# For registering all view config
from .views import * # noqa
from .routes import route_mapping

log = logging.getLogger(__name__)
STATIC_PATH = "/static"
BLOCK_SIZE = 4096


def serve_static(environ, start_response):
    path = environ["PATH_INFO"][1:]
    try:
        fn = os.path.join(os.path.dirname(__file__), path)
        log.debug("Open file: %s", fn)
        fp = open(fn, "rb")
        log.debug("Opened file: %s", fn)
    except FileNotFoundError:
        start_response("404 Not Found", [
            ("Content-type", "application/json")
        ])
        return ""

    headers = []
    if path[-5:] == ".html":
        headers.append(("Content-Type", "text/html"))
    elif path[-3:] == ".js":
        headers.append(
            ("Content-Type", "application/x-javascript; charset=utf-8")
        )

    start_response("200 OK", headers)
    if "wsgi.file_wrapper" in environ:
        return environ["wsgi.file_wrapper"](fp, BLOCK_SIZE)
    else:
        return iter(lambda: fp.read(BLOCK_SIZE), "")


def todo_app(environ, start_response):
    if environ["PATH_INFO"].startswith(STATIC_PATH):
        return serve_static(environ, start_response)

    view = route_mapping(environ["PATH_INFO"])
    if view is None:
        start_response("404 Not Found", [
            ("Content-type", "application/json")
        ])
        return ""
    log.debug("route matched")
    try:
        request_body_size = int(environ.get("CONTENT_LENGTH", 0))
    except ValueError:
        request_body_size = 0

    try:
        payload = json.loads(environ["wsgi.input"].read(request_body_size))
        log.debug("payload decode")
        response = view(payload)
        log.debug(response)
    except ValueError:
        start_response("400 Bad Request", [
            ("Content-type", "application/json")
        ])
        return ""
    except Exception:
        start_response("500 Internal Server Error", [
            ("Content-type", "application/json")
        ])
        return ""

    status = "200 OK"
    headers = [
        ("Content-type", "application/json"),
        ("Content-Length", str(len(response)))
    ]
    start_response(status, headers)
    return [bytes(response, "utf-8")]
