# Use --platform=$BUILDPLATFORM to run the build natively on the GitHub Runner (x86)
FROM --platform=$BUILDPLATFORM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
COPY package.json package-lock.json* pnpm-lock.yaml* ./

RUN apk add --no-cache libc6-compat && \
    if [ -f pnpm-lock.yaml ]; then \
      npm install -g pnpm && pnpm install; \
    elif [ -f package-lock.json ]; then \
      npm ci; \
    else \
      npm install; \
    fi

COPY . .

# Build the application
RUN npm run build

# --- Stage 2: Production (The final image will be ARM64) ---
# We don't use $BUILDPLATFORM here so it targets the platform specified in your YAML
FROM node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001 -G nodejs

# Copy only necessary files from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# CRITICAL: Re-install only production deps for ARM
# This is usually much lighter and less likely to crash QEMU
COPY package-lock.json* pnpm-lock.yaml* ./
RUN apk add --no-cache libc6-compat && \
    if [ -f pnpm-lock.yaml ]; then \
      npm install -g pnpm && pnpm install --prod; \
    elif [ -f package-lock.json ]; then \
      npm ci --omit=dev; \
    else \
      npm install --production; \
    fi

USER nextjs
EXPOSE 3000
CMD ["npm", "start"]