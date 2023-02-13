FROM node:18.14-alpine

ARG APP_USER_ID
ARG PROJECT_DIRECTORY
ARG APP_USER

ENV APP_USER             ${APP_USER}
ENV USER_HOME_DIRECTORY  /home/${APP_USER}
ENV APP_PATH             ${PROJECT_DIRECTORY}
ENV NODE_MODULES_DIR     ${APP_PATH}/node_modules

# Upgrade packages.
RUN apk --no-cache --available upgrade

# Install system dependencies required both at runtime and build time.
RUN apk add --no-cache build-base \
  git curl bash vim \
  bash-completion openssh

RUN deluser --remove-home node

RUN adduser -s /bin/bash -u ${APP_USER_ID} -h ${USER_HOME_DIRECTORY} -D ${APP_USER} && \
  mkdir -p ${APP_PATH} ${NODE_MODULES_DIR} ${DOT_NPM} && \
  chown -R ${APP_USER}:${APP_USER} ${APP_PATH} ${NODE_MODULES_DIR} ${DOT_NPM}

COPY --chown=${APP_USER} docker/entrypoint.sh ${USER_HOME_DIRECTORY}/entrypoint.sh
RUN chmod +x ${USER_HOME_DIRECTORY}/entrypoint.sh

USER ${APP_USER}
WORKDIR ${APP_PATH}

COPY --chown=${APP_USER} . .

