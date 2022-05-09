'''
implements the notebook server part having the websockets recievers
that adds the states to a queue according to the arriving order to be processed
in the files
'''
from flask import Blueprint, request, abort


router = Blueprint("notebook", __name__)


#-------# Routes #-------#
@router.route('/notebook')
def index():
    return {
        'code': 200,
        'message': 'ok'
    }
