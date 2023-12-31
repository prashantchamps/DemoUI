FROM node:21-alpine AS development
ARG REACT_APP_CLIENT_ID
ARG REACT_APP_AUTHORITY
ARG REACT_APP_REDIRECT_URI
ARG REACT_APP_POST_LOGOUT_REDIRECT_URI
ENV REACT_APP_CLIENT_ID ${REACT_APP_CLIENT_ID}
ENV REACT_APP_AUTHORITY ${REACT_APP_AUTHORITY}
ENV REACT_APP_REDIRECT_URI ${REACT_APP_REDIRECT_URI}
ENV REACT_APP_POST_LOGOUT_REDIRECT_URI ${REACT_APP_POST_LOGOUT_REDIRECT_URI}
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 80
CMD [ "yarn", "start" ]