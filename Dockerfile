# --- Stage 1: Build ---
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    # Install build dependencies
    COPY package.json package-lock.json* pnpm-lock.yaml* ./
    
    RUN \
      apk add --no-cache libc6-compat && \
      if [ -f pnpm-lock.yaml ]; then \
        npm install -g pnpm && pnpm install; \
      elif [ -f package-lock.json ]; then \
        npm ci; \
      else \
        npm install; \
      fi
    
    COPY . .
    
    RUN npm run build
    
    # --- Stage 2: Production ---
    FROM node:20-alpine AS runner
    
    WORKDIR /app
    
    ENV NODE_ENV=production
    
    # Optional: use a non-root user for better security
    RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001 -G nodejs
    
    # Copy only necessary files
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/package.json ./package.json
    
    # Install only production deps
    COPY package-lock.json* pnpm-lock.yaml* ./
    RUN \
      if [ -f pnpm-lock.yaml ]; then \
        npm install -g pnpm && pnpm install --prod; \
      elif [ -f package-lock.json ]; then \
        npm ci --omit=dev; \
      else \
        npm install --production; \
      fi
    
    # Use non-root user
    USER nextjs
    
    EXPOSE 3000
    
    CMD ["npm", "start"]
    