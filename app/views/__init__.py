from ..routes import viewconfig


@viewconfig('/ping')
def echo(payload):
    return 'pong'
