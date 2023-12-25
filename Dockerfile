FROM node:21-alpine AS development
ENV REACT_APP_CLIENT_ID 8e88d795-9878-4725-8f49-7280f3bf203c
ENV REACT_APP_AUTHORITY https://login.microsoftonline.com/common
ENV REACT_APP_REDIRECT_URI http://localhost:3000/
ENV REACT_APP_POST_LOGOUT_REDIRECT_URI http://localhost:3000/
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .
EXPOSE 3000
CMD [ "yarn", "start" ]