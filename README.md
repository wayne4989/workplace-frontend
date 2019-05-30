# PeerUp
**The Social Network For Students. Connecting peers with similar interests**

Install
=======
**yarn or yarn instal (First install yarn - npm install -g yarn)**

Building
=======

To build your application in `dev mode`, you can simply run  
`npm run dev`

To build your application in `staging mode(using heroku api)`, you can simply run  
`NODE_ENV=staging npm run dev`

Deployment
=======

```
# Login Into Docker HUB
docker login

# Build App
./docker-build.sh productionBuild

# Push Repo with proper tagged verion (Do not forgot to change version)
docker push peersview/peersview-front:v0.0.11

# Login Into front-end server
ssh 

# Login DockerHub again if needed (Requires one time only)
docker login

# Pull Repo with proper tagged verion (Do not forgot to change version)
docker pull peersview/peersview-front:v0.0.11

# Stop the existing running container

# Start New Container (Wait for 3 minutes)
docker run -d --restart unless-stopped --name peersview-front --publish 443:443 peersview/peersview-front:v0.0.11
```
