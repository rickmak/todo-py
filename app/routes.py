import logging

log = logging.getLogger(__name__)

route_map = {}


def viewconfig(path):
    global route_map

    def func_register(func):
        route_map[path] = func
        log.debug("register path %s", path)
        return func
    return func_register


def route_mapping(path):
    try:
        return route_map[path]
    except KeyError:
        log.debug("path %s", path)
        return None
