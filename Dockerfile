FROM oven/bun:latest

COPY package.json ./
COPY bun.lockb ./
COPY src ./src
COPY sing-box ./sing-box
COPY .env.local ./.env.local

EXPOSE 3000

RUN bun install

CMD bun run dev
