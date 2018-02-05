Coin-info Back-end application
==================================

It is written with Node.js+Express.js.

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
