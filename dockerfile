FROM node:16

ENV appDir /var/www/app/current

# Set the work directory
RUN mkdir -p ${appDir}
WORKDIR ${appDir}

# INSTALL NANO
RUN apt-get update && apt-get install -y nano

# Install pm2 *globally* so we can run our application
RUN npm i -g pm2

# Add application files (copiar los archivos compilados)
ADD ./.env ${appDir}
ADD ./dist ${appDir}/dist
ADD ./package.json ${appDir}
ADD ./package-lock.json ${appDir}
ADD ./tsconfig.build.json ${appDir}
ADD ./tsconfig.json ${appDir}
RUN mkdir -p ${appDir}/files/tmp

RUN npm ci --only=production

EXPOSE 3000
EXPOSE 4000

CMD ["pm2", "start", "dist/main.js", "--no-daemon"]