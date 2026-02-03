FROM node:18-alpine

RUN addgroup -S appgroup && adduser -S appuser -G appgroup \
  && mkdir -p /app /data \
  && chown -R appuser:appgroup /app /data

WORKDIR /app

COPY app/package*.json ./
RUN npm ci --omit=dev

COPY app/ ./

USER appuser

ENV PORT=3000
ENV DATA_DIR=/data
VOLUME ["/data"]

EXPOSE 3000

CMD ["npm", "start"]
