# 📦 Guía de Assets - Banco Ademi/Ademy

Esta guía documenta todos los assets (iconos, logos, banners, datos mock) copiados desde la app móvil de Banco Ademi para usar en la aplicación web.

---

## 📁 Estructura de Directorios

```
public/
├── logo_ademi.png                    # Logo principal de Ademi (color)
├── logo_ademi_blanco.png             # Logo Ademi en blanco
├── logo_bancocaribe.png              # Logo del partner Banco Caribe
├── logo_coopaspire.svg               # Logo Coopaspire (color)
├── logo_coopaspire_en_blanco.svg     # Logo Coopaspire blanco
├── visa.png                          # Logo de Visa
├── banner/
│   └── banner.png                    # Banner promocional
├── icon/
│   ├── tabler/                       # 46 iconos de Tabler Icons
│   │   ├── tabler-icon-wallet.svg
│   │   ├── tabler-icon-arrows-exchange-2.svg
│   │   ├── tabler-icon-credit-card.svg
│   │   ├── tabler-icon-user.svg
│   │   └── ... (43 más)
│   └── custom/                       # 5 iconos personalizados
│       ├── bank.svg
│       ├── card.svg
│       ├── key.svg
│       ├── loans.svg
│       └── pig.svg
└── mock_data/                        # 8 archivos JSON con datos de prueba
    ├── users.json
    ├── accounts.json
    ├── cards.json
    ├── transactions.json
    ├── loans.json
    ├── investments.json
    ├── beneficiaries.json
    └── notifications.json
```

---

## 🎨 Logos y Branding

### Logo Principal de Ademi
```tsx
// Uso en React/Next.js
<Image
  src="/logo_ademi.png"
  alt="Banco Ademi"
  width={250}
  height={80}
/>

// Para fondos oscuros, usar versión blanca:
<Image
  src="/logo_ademi_blanco.png"
  alt="Banco Ademi"
  width={250}
  height={80}
/>
```

**Uso en la app móvil:**
- `logo_ademi.png`: Pantalla de login, header de la app
- `logo_ademi_blanco.png`: Splash screen (fondo azul), tarjetas visuales

### Logos de Partners
```tsx
// Logo Banco Caribe
<Image src="/logo_bancocaribe.png" alt="Banco Caribe" width={150} height={50} />

// Logo Coopaspire (SVG)
<Image src="/logo_coopaspire.svg" alt="Coopaspire" width={150} height={50} />

// Logo Visa (para tarjetas)
<Image src="/visa.png" alt="Visa" width={60} height={40} />
```

---

## 🖼️ Banner Promocional

```tsx
// Banner usado en el dashboard principal
<Image
  src="/banner/banner.png"
  alt="Banner promocional"
  width={800}
  height={180}
  className="w-full object-cover rounded-lg"
/>
```

**Uso en la app móvil:**
- Se muestra en la parte superior del dashboard/home
- Dimensiones: ancho completo, altura ~180px
- Usado con `fit: BoxFit.cover` para responsividad

---

## 🔣 Iconos Tabler (46 SVGs)

Los iconos Tabler son vectoriales y se pueden usar con cualquier color/tamaño.

### Uso en React/Next.js

```tsx
// Opción 1: Con Image component
<Image
  src="/icon/tabler/tabler-icon-wallet.svg"
  alt="Wallet"
  width={24}
  height={24}
/>

// Opción 2: Como SVG inline (recomendado para cambiar colores)
import WalletIcon from '@/public/icon/tabler/tabler-icon-wallet.svg'

<WalletIcon
  className="w-6 h-6 text-blue-500"
  aria-label="Wallet"
/>
```

### Iconos Disponibles por Categoría

#### 🏦 Navegación y Productos
- `tabler-icon-wallet.svg` - Productos/Wallet
- `tabler-icon-arrows-exchange-2.svg` - Transacciones
- `tabler-icon-credit-card.svg` - Tarjetas
- `tabler-icon-home-bolt.svg` - Dashboard/Inicio
- `tabler-icon-stack-2.svg` - Menú apilado

#### 💳 Finanzas
- `tabler-icon-pig.svg` - Ahorros
- `tabler-icon-receipt-tax.svg` - Recibos/Impuestos
- `tabler-icon-file-pay.svg` - Pagos
- `tabler-icon-file-transfer.svg` - Transferencias
- `tabler-icon-arrow-bar-up.svg` - Depósito

#### 👤 Usuario y Autenticación
- `tabler-icon-user.svg` - Usuario
- `tabler-icon-users.svg` - Usuarios múltiples
- `tabler-icon-user-scan.svg` - Escaneo biométrico
- `tabler-icon-password-fingerprint.svg` - Huella dactilar
- `tabler-icon-password-mobile-phone.svg` - Autenticación móvil
- `tabler-icon-password-shield.svg` - Seguridad
- `tabler-icon-fingerprint.svg` - Biometría
- `tabler-icon-lock.svg` - Bloqueo/Seguridad
- `tabler-icon-logout.svg` - Cerrar sesión

#### 📄 Documentos y Datos
- `tabler-icon-id.svg` - Identificación/Cédula
- `tabler-icon-file-document.svg` - Documentos
- `tabler-icon-file-time.svg` - Tiempo/Historial
- `tabler-icon-certificate.svg` - Certificados

#### 🔔 Comunicación
- `tabler-icon-bell.svg` - Notificaciones
- `tabler-icon-mail.svg` - Email
- `tabler-icon-phone.svg` - Teléfono

#### 🌐 Redes Sociales
- `tabler-icon-brand-facebook.svg`
- `tabler-icon-brand-instagram.svg`
- `tabler-icon-brand-linkedin.svg`
- `tabler-icon-brand-tiktok.svg`
- `tabler-icon-brand-whatsapp.svg`
- `tabler-icon-brand-x.svg` (Twitter/X)
- `tabler-icon-brand-youtube.svg`

#### ⚙️ Utilidades y Acciones
- `tabler-icon-settings.svg` - Configuración
- `tabler-icon-adjustments-horizontal.svg` - Ajustes/Filtros
- `tabler-icon-edit.svg` - Editar
- `tabler-icon-trash.svg` - Eliminar
- `tabler-icon-chevron-left.svg` - Volver/Atrás
- `tabler-icon-share-3.svg` - Compartir
- `tabler-icon-star.svg` - Favorito
- `tabler-icon-bulb.svg` - Ideas/Tips

#### 📅 Tiempo y Fechas
- `tabler-icon-calendar-time.svg` - Calendario con hora
- `tabler-icon-calendar-celular.svg` - Calendario móvil

#### 👔 Otros
- `tabler-icon-person-with-tie.svg` - Ejecutivo/Profesional
- `tabler-icon-category-plus.svg` - Añadir categoría
- `tabler-icon-snowflake.svg` - Especial/Destacado

---

## 🎯 Iconos Personalizados (Custom SVGs)

Estos son iconos diseñados específicamente para la app bancaria.

### `bank.svg`
Icono de edificio bancario
```tsx
<Image src="/icon/custom/bank.svg" alt="Banco" width={64} height={64} />
```
**Uso:** Representar productos bancarios, cuentas

### `card.svg`
Icono de tarjeta de crédito/débito
```tsx
<Image src="/icon/custom/card.svg" alt="Tarjeta" width={48} height={48} />
```
**Uso:** Sección de tarjetas, pagos con tarjeta

### `key.svg`
Icono de llave (seguridad)
```tsx
<Image src="/icon/custom/key.svg" alt="Seguridad" width={32} height={32} />
```
**Uso:** Autenticación, cambio de PIN, seguridad

### `loans.svg`
Icono de préstamos
```tsx
<Image src="/icon/custom/loans.svg" alt="Préstamos" width={64} height={64} />
```
**Uso:** Sección de préstamos, solicitud de crédito

### `pig.svg`
Icono de alcancía (ahorros)
```tsx
<Image src="/icon/custom/pig.svg" alt="Ahorros" width={48} height={48} />
```
**Uso:** Cuentas de ahorro, metas de ahorro

---

## 📊 Mock Data - Datos de Prueba

### `users.json` (3 usuarios de prueba)

Estructura de usuario:
```json
{
  "id": "user_001",
  "documentId": "001-1234567-8",
  "documentType": "CEDULA",
  "firstName": "Juan",
  "lastName": "Pérez García",
  "email": "juan.perez@email.com",
  "phone": "(809) 555-1234",
  "dateOfBirth": "1985-03-15",
  "gender": "M",
  "address": {
    "street": "Av. Winston Churchill #45",
    "city": "Santo Domingo",
    "province": "Distrito Nacional",
    "postalCode": "10101",
    "country": "República Dominicana"
  },
  "profileImage": "https://i.pravatar.cc/150?u=user_001",
  "pin": "1234",
  "biometricEnabled": true,
  "twoFactorEnabled": true,
  "status": "ACTIVE"
}
```

**Uso en React:**
```tsx
const loadUsers = async () => {
  const response = await fetch('/mock_data/users.json');
  const data = await response.json();
  return data.users;
}
```

### `accounts.json` (6 cuentas de prueba)

Tipos de cuenta:
- `AHORRO` - Cuenta de ahorros (interés 3.5%)
- `CORRIENTE` - Cuenta corriente (sin interés)
- `NOMINA` - Cuenta nómina (interés 2.0%)
- `PLAZO_FIJO` - Depósito a plazo fijo (interés 7.5%)

Estructura:
```json
{
  "id": "acc_001",
  "userId": "user_001",
  "accountNumber": "1001234567890",
  "accountType": "AHORRO",
  "currency": "DOP",
  "balance": 125450.50,
  "availableBalance": 125450.50,
  "holdBalance": 0.00,
  "status": "ACTIVE",
  "nickname": "Mi Cuenta de Ahorro",
  "interestRate": 3.5
}
```

### `cards.json` (5 tarjetas de prueba)

Tipos de tarjeta:
- `DEBITO` - Tarjeta de débito
- `CREDITO` - Tarjeta de crédito

Marcas:
- `VISA`
- `MASTERCARD`
- `AMEX` (American Express)

Estructura:
```json
{
  "id": "card_001",
  "cardNumber": "4532123456789012",
  "cardType": "DEBITO",
  "brand": "VISA",
  "holderName": "JUAN PEREZ GARCIA",
  "expiryDate": "12/28",
  "status": "ACTIVE",
  "creditLimit": 200000.00,
  "availableCredit": 165432.50,
  "contactless": true,
  "dailyLimit": 50000.00,
  "internationalEnabled": true
}
```

### `transactions.json`

Tipos de transacción:
- `TRANSFERENCIA_ENVIADA` / `TRANSFERENCIA_RECIBIDA`
- `PAGO_PRESTAMO`
- `PAGO_TARJETA`
- `RETIRO_ATM`
- `DEPOSITO`
- `PAGO_SERVICIO`
- `COMPRA_COMERCIO`

### `loans.json`

Tipos de préstamo:
- `PERSONAL` - Préstamo personal
- `VEHICULO` - Préstamo de vehículo
- `HIPOTECARIO` - Préstamo hipotecario
- `CONSUMO` - Préstamo de consumo

Estados:
- `ACTIVO` - Préstamo activo
- `PAGADO` - Completamente pagado
- `VENCIDO` - Con pagos atrasados

### `investments.json`

Tipos de inversión:
- `FONDO_MUTUO` - Fondos mutuos
- `PLAZO_FIJO` - Depósito a plazo fijo
- `ACCIONES` - Inversión en acciones
- `BONOS` - Bonos del gobierno

### `beneficiaries.json`

Beneficiarios guardados para transferencias rápidas:
```json
{
  "id": "ben_001",
  "userId": "user_001",
  "accountNumber": "1009876543210",
  "holderName": "María Rodríguez Santos",
  "bankCode": "ADEMI",
  "accountType": "AHORRO",
  "nickname": "María - Hermana",
  "isFavorite": true
}
```

### `notifications.json`

Tipos de notificación:
- `TRANSACCION` - Notificaciones de transacciones
- `SEGURIDAD` - Alertas de seguridad
- `PROMOCION` - Promociones y ofertas
- `RECORDATORIO` - Recordatorios de pagos
- `SISTEMA` - Mensajes del sistema

---

## 🎯 Patrones de Uso en la App Móvil (Flutter)

### Pantalla de Login
**Assets usados:**
- `/logo_ademi.png` - Logo principal
- `/icon/tabler/tabler-icon-mail.svg` - Campo de email
- `/icon/tabler/tabler-icon-password-mobile-phone.svg` - Campo de contraseña

### Dashboard/Home
**Assets usados:**
- `/banner/banner.png` - Banner promocional superior
- `/icon/tabler/tabler-icon-wallet.svg` - Botón de productos
- `/icon/tabler/tabler-icon-arrows-exchange-2.svg` - Botón de transacciones
- `/icon/custom/bank.svg` - Tarjeta de cuentas
- `/icon/custom/card.svg` - Tarjeta de tarjetas
- `/icon/custom/loans.svg` - Tarjeta de préstamos
- `/icon/custom/pig.svg` - Tarjeta de ahorros

### Navegación Inferior
**Assets usados:**
- `/icon/tabler/tabler-icon-wallet.svg` - Tab de Productos
- `/icon/tabler/tabler-icon-arrows-exchange-2.svg` - Tab de Transacciones
- `/icon/tabler/tabler-icon-settings.svg` - Tab de Configuración
- `/icon/tabler/tabler-icon-user.svg` - Tab de Perfil

### Tarjetas (Cards)
**Assets usados:**
- `/logo_ademi_blanco.png` - Logo en la tarjeta visual
- `/visa.png` - Logo de Visa
- `/icon/tabler/tabler-icon-credit-card.svg` - Icono de tarjeta

### Redes Sociales (Footer)
**Assets usados:**
- `/icon/tabler/tabler-icon-brand-facebook.svg`
- `/icon/tabler/tabler-icon-brand-instagram.svg`
- `/icon/tabler/tabler-icon-brand-whatsapp.svg`
- Etc.

---

## 💡 Tips de Implementación en Next.js/React

### 1. Optimizar SVGs con SVGR

Instala SVGR para importar SVGs como componentes:
```bash
npm install @svgr/webpack
```

Configura en `next.config.js`:
```js
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};
```

Uso:
```tsx
import WalletIcon from '@/public/icon/tabler/tabler-icon-wallet.svg';

<WalletIcon className="w-6 h-6 text-blue-600" />
```

### 2. Crear Componente de Iconos Reutilizable

```tsx
// components/Icon.tsx
import { FC } from 'react';

interface IconProps {
  name: string;
  size?: number;
  className?: string;
}

export const Icon: FC<IconProps> = ({ name, size = 24, className = '' }) => {
  return (
    <img
      src={`/icon/tabler/tabler-icon-${name}.svg`}
      alt={name}
      width={size}
      height={size}
      className={className}
    />
  );
};

// Uso:
<Icon name="wallet" size={32} className="text-blue-500" />
```

### 3. Cargar Mock Data

```tsx
// hooks/useMockData.ts
import { useState, useEffect } from 'react';

export function useMockData<T>(filename: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/mock_data/${filename}.json`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      });
  }, [filename]);

  return { data, loading };
}

// Uso:
const { data: users, loading } = useMockData<{ users: User[] }>('users');
```

### 4. TypeScript Types para Mock Data

```tsx
// types/mockData.ts
export interface User {
  id: string;
  documentId: string;
  documentType: 'CEDULA' | 'PASAPORTE';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'M' | 'F';
  address: Address;
  profileImage: string;
  pin: string;
  biometricEnabled: boolean;
  twoFactorEnabled: boolean;
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
}

export interface Account {
  id: string;
  userId: string;
  accountNumber: string;
  accountType: 'AHORRO' | 'CORRIENTE' | 'NOMINA' | 'PLAZO_FIJO';
  currency: 'DOP' | 'USD';
  balance: number;
  availableBalance: number;
  holdBalance: number;
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
  nickname: string;
  interestRate: number;
}

export interface Card {
  id: string;
  userId: string;
  accountId: string;
  cardNumber: string;
  cardType: 'DEBITO' | 'CREDITO';
  brand: 'VISA' | 'MASTERCARD' | 'AMEX';
  holderName: string;
  expiryDate: string;
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED';
  creditLimit?: number;
  availableCredit?: number;
  contactless: boolean;
  dailyLimit: number;
  internationalEnabled: boolean;
}
```

---

## 📝 Resumen

✅ **Total de Assets Copiados:**
- 6 Logos (PNG/SVG)
- 46 Iconos Tabler (SVG)
- 5 Iconos personalizados (SVG)
- 1 Banner promocional (PNG)
- 8 Archivos JSON con datos mock

✅ **Listo para usar en:**
- Next.js
- React
- Cualquier framework web moderno

✅ **Beneficios:**
- Iconos vectoriales escalables
- Datos mock realistas para desarrollo
- Mismo branding que la app móvil
- Optimizado para web

---

**Última actualización:** 2026-02-08
**Proyecto:** Banco Ademy Web Application
**Fuente:** Banco Ademi Mobile App (Flutter)
