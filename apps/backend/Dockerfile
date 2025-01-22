ARG IMAGE=node:latest

# Common
FROM $IMAGE AS builder

WORKDIR /app
RUN npm i -g @nestjs/cli turbo
COPY . .
RUN npm i
RUN npm run build

# Dev
FROM builder AS dev
CMD [""]

# PROD middle step
FROM builder AS prod-build
RUN npm prune --production

# Prod
FROM $IMAGE AS prod
COPY --chown=node:node --from=prod-build /app/dist /app/dist
COPY --chown=node:node --from=prod-build /app/node_modules /app/node_modules
COPY --chown=node:node --from=prod-build /app/.env /app/.env

ENV NODE_ENV=production
ENTRYPOINT [ "node" ,"./main.js"]
WORKDIR /app/dist
CMD [""]