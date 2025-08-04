# Dockerfile

# --- 1. Etapa de Dependencias ---
# Instala las dependencias necesarias para la compilación
FROM node:18-alpine AS deps
WORKDIR /app

# Copia los archivos de manifiesto del paquete e instala las dependencias
COPY package.json package-lock.json* ./
RUN npm install

# --- 2. Etapa de Compilación ---
# Compila la aplicación Next.js para producción
FROM node:18-alpine AS builder
WORKDIR /app

# Copia las dependencias instaladas de la etapa anterior
COPY --from=deps /app/node_modules ./node_modules
# Copia el resto del código fuente de la aplicación
COPY . .

# Compila la aplicación
# La variable de entorno NEXT_TELEMETRY_DISABLED=1 desactiva la telemetría de Next.js
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# --- 3. Etapa de Producción ---
# Crea la imagen final, optimizada y ligera para producción
FROM node:18-alpine AS runner
WORKDIR /app

# Desactiva la telemetría de Next.js
ENV NEXT_TELEMETRY_DISABLED 1
# Establece el entorno a producción
ENV NODE_ENV=production

# Crea un usuario no root para mejorar la seguridad
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia los artefactos de compilación de la etapa anterior
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Cambia al usuario no root
USER nextjs

# Expone el puerto en el que se ejecuta la aplicación
EXPOSE 3000

# Define el comando para iniciar la aplicación
CMD ["npm", "start"]
