#!/bin/bash

# Globals
BUILD_SCRIPT_DIR=
REPO_DIR=
NODE_PACKAGE_FILE_CONTENTS=
NODE_PACKAGE_NAME=
NODE_PACKAGE_VERSION=
CONTAINER_NAME=
IMAGE_NAME=
IMAGE_VERSION=

init()
{
  BUILD_SCRIPT_DIR=$(cd "$(dirname "$0")" ; pwd -P)
  REPO_DIR=${BUILD_SCRIPT_DIR}

  setNodePackageFileContents
  setNodePackageName
  setNodePackageVersion

  CONTAINER_NAME=${NODE_PACKAGE_NAME}
  IMAGE_NAME="peersview/${NODE_PACKAGE_NAME}"
  IMAGE_VERSION="${NODE_PACKAGE_VERSION}"
}

setNodePackageName()
{
  NODE_PACKAGE_NAME=$(echo "${NODE_PACKAGE_FILE_CONTENTS}" | grep '^  "name": ' | sed -e 's/^.*: "\(.*\)",$/\1/')
  echo ${NODE_PACKAGE_NAME}
}

setNodePackageVersion()
{
  NODE_PACKAGE_VERSION=$(echo "${NODE_PACKAGE_FILE_CONTENTS}" | grep '^  "version": ' | sed -e 's/^.*"\([0-9]*\.[0-9]*\.[0-9]*\)",$/\1/')

  echo ${NODE_PACKAGE_VERSION}
}

setNodePackageFileContents()
{
  NODE_PACKAGE_FILE_CONTENTS="$(cat ${REPO_DIR}/package.json)"

  if [[ "${NODE_PACKAGE_FILE_CONTENTS}" = "" ]] ; then
    echo "Exiting due to unexpected file contents"
    exit 1
  fi
}

productionBuild()
{
  docker build \
    --tag ${IMAGE_NAME}:v${IMAGE_VERSION} \
    --build-arg npmConfigProduction=false \
    --build-arg nodeEnv=production \
    --build-arg peersviewApi=https://peersview.com/api/v1/ \
    --file Dockerfile \
    .
}

developmentBuild()
{
  docker build \
    --tag ${IMAGE_NAME}:v${IMAGE_VERSION} \
    --file Dockerfile \
    .
}

pushImage()
{
  docker push ${IMAGE_NAME}:v${IMAGE_VERSION}

}

runDevContainer()
{

  docker run --rm --name ${CONTAINER_NAME} \
    --publish 80:8080 \
    ${IMAGE_NAME}:v${IMAGE_VERSION}
}

runProductionContainer()
{
  docker run --rm --name ${CONTAINER_NAME} \
    --publish 443:443 \
    ${IMAGE_NAME}:v${IMAGE_VERSION}
}

killContainer()
{
  docker container kill ${CONTAINER_NAME}
}

removeContainer()
{
  # docker container rm ${CONTAINER_NAME}
  docker rmi $(docker images | grep ${IMAGE_NAME} | awk '{print $3}')
}

rebuildImage()
{
  killContainer
  removeContainer
  buildImage
  sleep 1
  runContainer
}

enterContainer() {
  docker exec -it ${CONTAINER_NAME} /bin/bash
}

run() {
  local COMMAND=$1

  case ${COMMAND} in
    productionBuild)
      productionBuild
      ;;
    developmentBuild)
      developmentBuild
      ;;
    push)
      pushImage
      ;;
    rebuild)
      rebuildImage
      ;;
    runDev)
      runDevContainer
      ;;
    runProduction)
      runProductionContainer
      ;;
    kill)
      killContainer
      ;;
    remove)
      removeContainer
      ;;
    ssh)
      enterContainer
      ;;
    *)
      echo "Usage: $0 [ productionBuild | developmentBuild | rebuild | runDev | runProduction | kill | remove | ssh ]"
      ;;
  esac
}

init
run $1
