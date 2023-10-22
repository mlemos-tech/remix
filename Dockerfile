from node:18.18.2

WORKDIR /app
COPY . /app

RUN npm install --global --unsafe-perm exp
RUN npm i

EXPOSE 3000

ENTRYPOINT [ "./entrypoint.sh" ]

CMD [ "./node_modules/.bin/pm2", "logs" ]