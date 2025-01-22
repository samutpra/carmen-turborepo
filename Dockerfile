ARG IMAGE=node:latest

FROM ${IMAGE} as builder

WORKDIR /app

COPY . .

RUN npm i

FROM builder as dev

CMD [""]