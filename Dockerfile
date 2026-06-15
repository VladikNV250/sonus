# syntax = docker/dockerfile:1

ARG NODE_VERSION=22.21.1
FROM node:${NODE_VERSION}-slim AS base

LABEL fly_launch_runtime="Node.js"

WORKDIR /app

ENV NODE_ENV="production"
ENV HOST="0.0.0.0"
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3 openssl

# Copy root workspace and package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY server/package.json ./server/
COPY client/package.json ./client/

# Install dependencies for the whole workspace
RUN pnpm install --frozen-lockfile

# Copy the rest of the workspace
COPY . .

# Build the server package
RUN pnpm --filter server run build

# Deploy the server package to a separate directory with only its production dependencies
RUN pnpm deploy --filter server --prod --legacy /prod/server

# Copy the compiled code to the deployed package
RUN cp -r /app/server/dist /prod/server/dist

# Final stage for app image
FROM base

# Install openssl for prisma
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y openssl && \
    rm -rf /var/lib/apt/lists/*

# Copy built application
COPY --from=build /prod/server /app

# The build context is now `/app` which corresponds to `server`
WORKDIR /app

EXPOSE 3000
CMD [ "npm", "run", "start" ]
