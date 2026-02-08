# Script de Verificación - Banco ADEMI (PowerShell)
# Verifica que los archivos críticos estén correctamente configurados para Next.js 16

Write-Host "🔍 Verificando configuración del proyecto Banco ADEMI..." -ForegroundColor Cyan
Write-Host ""

$ErrorCount = 0

# 1. Verificar que existe src/proxy.ts
Write-Host "1️⃣ Verificando src/proxy.ts..." -ForegroundColor White
if (Test-Path "src/proxy.ts") {
    $content = Get-Content "src/proxy.ts" -Raw
    if ($content -match "export default function proxy") {
        Write-Host "✅ proxy.ts existe y tiene la exportación correcta" -ForegroundColor Green
    } else {
        Write-Host "❌ proxy.ts existe pero falta 'export default function proxy'" -ForegroundColor Red
        $ErrorCount++
    }
} else {
    Write-Host "❌ No existe src/proxy.ts" -ForegroundColor Red
    $ErrorCount++
}
Write-Host ""

# 2. Verificar globals.css
Write-Host "2️⃣ Verificando src/app/globals.css..." -ForegroundColor White
if (Test-Path "src/app/globals.css") {
    $content = Get-Content "src/app/globals.css" -Raw
    if (($content -match "@tailwind base") -and ($content -match "var\(--primary\)")) {
        Write-Host "✅ globals.css configurado correctamente con CSS Variables" -ForegroundColor Green
    } else {
        Write-Host "⚠️  globals.css existe pero podría necesitar actualización" -ForegroundColor Yellow
        $ErrorCount++
    }
} else {
    Write-Host "❌ No existe src/app/globals.css" -ForegroundColor Red
    $ErrorCount++
}
Write-Host ""

# 3. Verificar tailwind.config.ts
Write-Host "3️⃣ Verificando tailwind.config.ts..." -ForegroundColor White
if (Test-Path "tailwind.config.ts") {
    $content = Get-Content "tailwind.config.ts" -Raw
    if ($content -match "primary.*#0095A9") {
        Write-Host "✅ tailwind.config.ts tiene los colores de ADEMI" -ForegroundColor Green
    } else {
        Write-Host "⚠️  tailwind.config.ts podría necesitar los colores actualizados" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ No existe tailwind.config.ts" -ForegroundColor Red
    $ErrorCount++
}
Write-Host ""

# 4. Verificar package.json
Write-Host "4️⃣ Verificando package.json..." -ForegroundColor White
if (Test-Path "package.json") {
    $content = Get-Content "package.json" -Raw
    if ($content -match '"next"') {
        $version = ($content | Select-String -Pattern '"next":\s*"([^"]+)"').Matches.Groups[1].Value
        Write-Host "✅ package.json existe (Next.js $version)" -ForegroundColor Green
    } else {
        Write-Host "⚠️  package.json existe pero no se encuentra Next.js" -ForegroundColor Yellow
    }
} else {
    Write-Host "❌ No existe package.json" -ForegroundColor Red
    $ErrorCount++
}
Write-Host ""

# 5. Verificar node_modules
Write-Host "5️⃣ Verificando dependencias instaladas..." -ForegroundColor White
if (Test-Path "node_modules") {
    Write-Host "✅ node_modules existe - Dependencias instaladas" -ForegroundColor Green
} else {
    Write-Host "⚠️  node_modules no existe - Ejecuta: npm install" -ForegroundColor Yellow
}
Write-Host ""

# 6. Verificar imágenes
Write-Host "6️⃣ Verificando assets..." -ForegroundColor White
if (Test-Path "public/logo/ademi.png") {
    Write-Host "✅ Logo ADEMI encontrado" -ForegroundColor Green
} else {
    Write-Host "⚠️  Falta public/logo/ademi.png" -ForegroundColor Yellow
}

if (Test-Path "public/images/background-login.png") {
    Write-Host "✅ Imagen de fondo encontrada" -ForegroundColor Green
} else {
    Write-Host "⚠️  Falta public/images/background-login.png" -ForegroundColor Yellow
}
Write-Host ""

# 7. Verificar estructura de carpetas
Write-Host "7️⃣ Verificando estructura de carpetas..." -ForegroundColor White
$RequiredDirs = @(
    "src/app",
    "src/components/ui",
    "src/features/auth",
    "src/config",
    "src/utils"
)

foreach ($dir in $RequiredDirs) {
    if (Test-Path $dir) {
        Write-Host "✅ $dir" -ForegroundColor Green
    } else {
        Write-Host "❌ Falta: $dir" -ForegroundColor Red
        $ErrorCount++
    }
}
Write-Host ""

# Resumen final
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
if ($ErrorCount -eq 0) {
    Write-Host "✨ ¡Todo listo! No se encontraron errores críticos." -ForegroundColor Green
    Write-Host ""
    Write-Host "Puedes ejecutar:" -ForegroundColor White
    Write-Host "  npm run dev" -ForegroundColor Yellow
} else {
    Write-Host "⚠️  Se encontraron $ErrorCount errores/advertencias." -ForegroundColor Red
    Write-Host ""
    Write-Host "Revisa los archivos marcados arriba y sigue la guía:" -ForegroundColor White
    Write-Host "  CORRECCION_NEXTJS16.md" -ForegroundColor Yellow
}
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan