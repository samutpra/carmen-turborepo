ARG IMAGE=node:latest

# Common
FROM $IMAGE as builder

WORKDIR /app
RUN npm install turbo
COPY . .
RUN npm i

# Dev
FROM builder as dev
CMD [""]

# PROD middle step
FROM builder as prod-build
RUN npm run build
RUN npm prune --production

# Prod
FROM $IMAGE as prod
COPY --chown=node:node --from=prod-build /app/dist /app/dist
COPY --chown=node:node --from=prod-build /app/node_modules /app/node_modules
COPY --chown=node:node --from=prod-build /app/.env /app/.env

ENV NODE_ENV=production
ENTRYPOINT [ "node" ,"./main.js"]
WORKDIR /app/dist
CMD [""]