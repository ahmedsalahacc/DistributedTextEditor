'''
implements the notebook middleware part having the websockets pools that connects 
between the clients and the server
'''
from flask import Blueprint, request, abort


router = Blueprint("notebookMiddleware", __name__)


#-------# Routes #-------#
# @NOTE THIS IS A TEST
@router.route('/notebook')
def index():
    return {
        'code': 200,
        'message': 'ok'
    }
