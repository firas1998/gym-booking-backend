FROM node:14-alpine AS development
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN apk add --no-cache bash
RUN npm run build


# Second Stage : Setup command to run your app using lightweight node image
FROM node:14-alpine AS production
WORKDIR /usr/src/app
COPY --from=development /usr/src/app ./
RUN apk add --no-cache bash
CMD ["npm", "run", "start:prod"]



#################################################
#COPY package*.json ./                          #
#RUN npm install --only=production              #
#COPY . .                                       #
#COPY --from=builder /usr/src/app/dist ./dist   #
#################################################