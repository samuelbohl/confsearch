FROM node:20-alpine

WORKDIR /app

# Install yarn
RUN apk add --no-cache yarn

# Copy package.json and yarn.lock (if it exists)
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

EXPOSE 8080

CMD ["yarn", "start"]