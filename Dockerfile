FROM node:16-alpine AS builder
WORKDIR '/app'
COPY package.json .
RUN npm install

ENV REACT_APP_SERVICE_ID changeme
ENV REACT_APP_TEMPLATE_ID changeme
ENV REACT_APP_PUBLIC_KEY changeme
ENV REACT_APP_PROTOCOL_LINK https://www.protocols.io/view/heron-data-suite-biomedical-quantitative-analysis-8epv5xwj5g1b/v1
ENV REACT_APP_GLYCO_API http://localhost:8000/api/glyco/excel

COPY . .
RUN npm run build
#output of build is in .../app/build


# copy into directory on nginx docker hub page instructions
# starting container starts nginx for us
# multistep process avoids bulky node_modules and source code

FROM nginx

#need to expose for elasticbeanstalk
#does nothing for us as developer
#just informs dev on what port to map
#but elasticbeanstalk uses it to port map
EXPOSE 3000 
#remember our nginx listens to port 3000

# copy our default config over to nginx image
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf



COPY --from=builder /app/build/ /usr/share/nginx/html

EXPOSE 80

# remember nginx uses port 80
# so in port mapping -p <my port>:80


