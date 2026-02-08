#!/bin/bash

# Script de Verificación - Banco ADEMI
# Verifica que los archivos críticos estén correctamente configurados para Next.js 16

echo "🔍 Verificando configuración del proyecto Banco ADEMI..."
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contador de errores
ERRORS=0

# 1. Verificar que existe src/proxy.ts
echo "1️⃣ Verificando src/proxy.ts..."
if [ -f "src/proxy.ts" ]; then
    # Verificar que tenga export default
    if grep -q "export default function proxy" "src/proxy.ts"; then
        echo -e "${GREEN}✅ proxy.ts existe y tiene la exportación correcta${NC}"
    else
        echo -e "${RED}❌ proxy.ts existe pero falta 'export default function proxy'${NC}"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo -e "${RED}❌ No existe src/proxy.ts${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 2. Verificar globals.css
echo "2️⃣ Verificando src/app/globals.css..."
if [ -f "src/app/globals.css" ]; then
    if grep -q "@tailwind base" "src/app/globals.css" && grep -q "var(--primary)" "src/app/globals.css"; then
        echo -e "${GREEN}✅ globals.css configurado correctamente con CSS Variables${NC}"
    else
        echo -e "${YELLOW}⚠️  globals.css existe pero podría necesitar actualización${NC}"
        ERRORS=$((ERRORS + 1))
    fi
else
    echo -e "${RED}❌ No existe src/app/globals.css${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 3. Verificar tailwind.config.ts
echo "3️⃣ Verificando tailwind.config.ts..."
if [ -f "tailwind.config.ts" ]; then
    if grep -q "primary.*#0095A9" "tailwind.config.ts"; then
        echo -e "${GREEN}✅ tailwind.config.ts tiene los colores de ADEMI${NC}"
    else
        echo -e "${YELLOW}⚠️  tailwind.config.ts podría necesitar los colores actualizados${NC}"
    fi
else
    echo -e "${RED}❌ No existe tailwind.config.ts${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 4. Verificar package.json
echo "4️⃣ Verificando package.json..."
if [ -f "package.json" ]; then
    if grep -q "\"next\"" "package.json"; then
        VERSION=$(grep "\"next\"" package.json | sed 's/.*: "//;s/".*//')
        echo -e "${GREEN}✅ package.json existe (Next.js $VERSION)${NC}"
    else
        echo -e "${YELLOW}⚠️  package.json existe pero no se encuentra Next.js${NC}"
    fi
else
    echo -e "${RED}❌ No existe package.json${NC}"
    ERRORS=$((ERRORS + 1))
fi
echo ""

# 5. Verificar node_modules
echo "5️⃣ Verificando dependencias instaladas..."
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✅ node_modules existe - Dependencias instaladas${NC}"
else
    echo -e "${YELLOW}⚠️  node_modules no existe - Ejecuta: npm install${NC}"
fi
echo ""

# 6. Verificar imágenes
echo "6️⃣ Verificando assets..."
if [ -f "public/logo/ademi.png" ]; then
    echo -e "${GREEN}✅ Logo ADEMI encontrado${NC}"
else
    echo -e "${YELLOW}⚠️  Falta public/logo/ademi.png${NC}"
fi

if [ -f "public/images/background-login.png" ]; then
    echo -e "${GREEN}✅ Imagen de fondo encontrada${NC}"
else
    echo -e "${YELLOW}⚠️  Falta public/images/background-login.png${NC}"
fi
echo ""

# 7. Verificar estructura de carpetas
echo "7️⃣ Verificando estructura de carpetas..."
REQUIRED_DIRS=(
    "src/app"
    "src/components/ui"
    "src/features/auth"
    "src/config"
    "src/utils"
)

for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo -e "${GREEN}✅ $dir${NC}"
    else
        echo -e "${RED}❌ Falta: $dir${NC}"
        ERRORS=$((ERRORS + 1))
    fi
done
echo ""

# Resumen final
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✨ ¡Todo listo! No se encontraron errores críticos.${NC}"
    echo ""
    echo "Puedes ejecutar:"
    echo "  npm run dev"
else
    echo -e "${RED}⚠️  Se encontraron $ERRORS errores/advertencias.${NC}"
    echo ""
    echo "Revisa los archivos marcados arriba y sigue la guía:"
    echo "  CORRECCION_NEXTJS16.md"
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"