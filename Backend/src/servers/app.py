'''
initializes and initiates the server
'''
import os

from flask import Flask, request, redirect, jsonify, url_for
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

# CONSTANTS
DEBUG = True
PORT = 5000


def createFlaskApp() -> tuple:
    '''
    Create a flask app with the predefined settings
    Returns
    -------
    app : Flask
        initialized flask app with the predefined settings 
    '''
    # create flask app
    app = Flask(__name__)

    # inititalizing extensions
    CORS(app)

    # setting flask configs
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = "INSERT DB URI"  # @TODO

    # Blueprints
    from controllers.notebook_server import router as notebookRouter
    app.register_blueprint(notebookRouter)

    return app


# create flask app
app = createFlaskApp()

if __name__ == "__main__":
    # run flask app
    app.run(debug=DEBUG, port=PORT)
