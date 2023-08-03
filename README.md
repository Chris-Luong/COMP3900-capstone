# capstone-project-3900w18cmuffin

capstone-project-3900w18cmuffin created by GitHub Classroom

## Setup Guide

This project has been containerised in a Docker container to help simplify the setup for the reader.

Note:

- Assumes the reader has basic knowledge of UNIX shell commands.
- Assumes the reader has Docker installed or has the capacity to understand how to install Docker.

Install Docker onto your operating system using the link below:
https://www.docker.com/get-started/.

Ensure Docker is installed on your system by running the command:

<blockquote>docker --version</blockquote> <br>

Ensure that PORT 3306, 8800, 8080 are all open and not in use on your local/physical machine.

<blockquote>netstat -ano | findstr :&lt;PORT&gt;</blockquote> <br>

Ensure that your current working directory is the root folder of the repo.

<blockquote>cwd</blockquote> <br>

Build and start the docker containers with the command:

<blockquote>docker-compose up --build</blockquote> <br>

The initial build process will take some time, after the build is complete, docker will commence the initialisation of each container. The initialisation also takes roughly 5 minutes on the first build. After this is complete, the container is automatically started so you can simply navigate to localhost:3000.

To shutdown the container:

<blockquote>docker-compose stop</blockquote> <br>

To start the container:

<blockquote>docker-compose start</blockquote> <br>

To remove/delete the container (note: this will mean you will have to spend time building and initialising the container again, don't run this command until you no longer need to use the container):

<blockquote>docker-compose down</blockquote> <br>

To attach to the container:

<blockquote>docker exec -it container_name bash</blockquote> <br>

To run mysql queries in the attached MySQL container:

<blockquote>mysql -u root -p password queuequicker -e "query;"</blockquote> <br>

To exit from the attached container:

<blockquote>exit</blockquote> <br>

To view stdout of container:

<blockquote>docker logs container_name</blockquote> <br>

Container Names:

<blockquote>backend</blockquote>
<blockquote>frontend</blockquote>
<blockquote>mysql</blockquote>
