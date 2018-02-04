# Coin-info Front-end application

It is written with React.js+Redux.

## Installation

Build and run the container the parent directory please run command:

.. code-block:: bash

    docker-compose build frontend

## Running

Run the Docker's container for this purpose:

.. code-block:: bash

    docker-compose up frontend

And now you can run it in the browser:

    http://localhost:5000

## Building

Run the Docker's container with the command:

.. code-block:: bash

    docker-compose run frontend bash

And inside the container:

.. code-block:: bash

    npm build

## Testing

Run the container with the command:

.. code-block:: bash

    docker-compose run frontend bash

And later in the container execute:

.. code-block:: bash

    npm test
