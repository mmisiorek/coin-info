Coin-info
==================================

Fast running
---------------

You need to execute command:

.. code-block:: bash

    docker-compose up

Everything should install properly. The React.js application should be running on port 5000 of localhost,
and API for getting the average should be on the port 3456 of your localhost.

Coin-info Back-end application
==================================

It is written with Node.js+Express.js. It is written with Node.js+Express.js. The application is going to add 50 random transactions
when it is in development mode and the blockchain is empty (the current block number is equal to 0).


Installation
---------------

Build and run the container the parent directory please run command:

.. code-block:: bash

    docker-compose up --build backend

When you use the development environment of the application (set in docker-compose.yml file)
you need to wait unit the test transactions are inserted into the blockchain.

Testing
---------------

Run the container with the command:

.. code-block:: bash

    docker-compose run backend bash

And later in the container execute:

.. code-block:: bash

    jasmine

Linting
--------------

Run the container with the command:

.. code-block:: bash

    docker-compose run backend bash

And later in the container execute:

.. code-block:: bash

    npm run lint

Coin-info Front-end application
==================================

It is written with React.js+Redux.

Installation
---------------

Build and run the container the parent directory please run command:

.. code-block:: bash

    docker-compose build frontend

Running
---------------

Run the Docker's container for this purpose:

.. code-block:: bash

    docker-compose up frontend

And now you can run it in the browser:

    http://localhost:5000

Building
---------------

Run the Docker's container with the command:

.. code-block:: bash

    docker-compose run frontend bash

And inside the container:

.. code-block:: bash

    npm build

Testing
---------------

Run the container with the command:

.. code-block:: bash

    docker-compose run frontend bash

And later in the container execute:

.. code-block:: bash

    npm test
