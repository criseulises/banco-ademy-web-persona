'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { colors } from '@/styles/colors';

interface Account {
  id: string;
  userId: string;
  accountNumber: string;
  accountType: string;
  currency: string;
  balance: number;
  availableBalance: number;
  holdBalance: number;
  status: string;
  nickname: string;
  interestRate: number;
}

interface Product {
  title: string;
  subtitle: string;
  accountNumber: string;
  balance: string;
  icon: string;
  type: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const banners = [
    '/banner/banner-1.png',
    '/banner/banner-2.png',
    '/banner/banner-3.png',
    '/banner/banner-4.png',
    '/banner/banner-5.png',
  ];

  const filters = [
    { label: 'Cuentas', icon: '/icon/custom/pig.svg', value: 'cuentas' },
    { label: 'Tarjetas', icon: '/icon/custom/card.svg', value: 'tarjetas' },
    { label: 'Préstamos', icon: '/icon/custom/loans.svg', value: 'prestamos' },
    { label: 'Inversiones', icon: '/icon/custom/bank.svg', value: 'inversiones' },
  ];

  useEffect(() => {
    // Cargar cuentas, tarjetas y préstamos desde el mock data
    Promise.all([
      fetch('/mock_data/accounts.json').then(res => res.json()),
      fetch('/mock_data/cards.json').then(res => res.json()),
      fetch('/mock_data/loans.json').then(res => res.json()),
    ])
      .then(([accountsData, cardsData, loansData]) => {
        const accountProducts: Product[] = accountsData.accounts.map((account: Account) => ({
          title: account.nickname || 'Mi Cuenta',
          subtitle: account.accountType,
          accountNumber: account.accountNumber,
          balance: `RD$ ${account.balance.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          icon: '/icon/custom/pig.svg',
          type: 'cuentas',
        }));

        const cardProducts: Product[] = cardsData.cards.map((card: any) => ({
          title: card.nickname,
          subtitle: `Tarjeta de ${card.cardType.toLowerCase()}`,
          accountNumber: card.cardNumber,
          balance: card.cardType === 'CREDITO'
            ? `RD$ ${(card.availableCredit || 0).toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
            : 'Tarjeta de débito',
          icon: '/icon/custom/card.svg',
          type: 'tarjetas',
        }));

        const loanProducts: Product[] = loansData.loans.map((loan: any) => ({
          title: loan.nickname || loan.purpose,
          subtitle: 'Préstamo',
          accountNumber: loan.loanNumber || loan.id,
          balance: `RD$ ${loan.outstandingBalance.toLocaleString('es-DO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          icon: '/icon/custom/loans.svg',
          type: 'prestamos',
        }));

        // Productos adicionales (inversiones) - mantener los ejemplos
        const otherProducts: Product[] = [
          {
            title: 'Certificado Financiero',
            subtitle: 'Inversión a plazo',
            accountNumber: '001019876543210',
            balance: 'RD$ 500,000.00',
            icon: '/icon/custom/bank.svg',
            type: 'inversiones',
          },
        ];

        setProducts([...accountProducts, ...cardProducts, ...loanProducts, ...otherProducts]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading products:', error);
        setLoading(false);
      });
  }, []);

  const filteredProducts = selectedFilter
    ? products.filter((p) => p.type === selectedFilter)
    : products;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: colors.background }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: colors.primary }}></div>
          <p style={{ color: colors.textSecondary }}>Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Saludo */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold" style={{ color: colors.textPrimary }}>
            ¡Buenos días,{' '}
            <span style={{ color: colors.primary }}>Cristian</span>!
          </h1>
        </div>

        {/* Banner Carousel */}
        <div className="relative mb-8 rounded-xl overflow-hidden shadow-lg">
          <div className="relative h-[200px] md:h-[250px]">
            <Image
              src={banners[currentBanner]}
              alt="Banner"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Indicadores */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  backgroundColor: index === currentBanner ? colors.secondary : 'white',
                  opacity: index === currentBanner ? 1 : 0.5,
                }}
              />
            ))}
          </div>

          {/* Flechas de navegación */}
          <button
            onClick={() => setCurrentBanner((prev) => (prev === 0 ? banners.length - 1 : prev - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-all"
          >
            <span className="text-xl">‹</span>
          </button>
          <button
            onClick={() => setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1))}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-all"
          >
            <span className="text-xl">›</span>
          </button>
        </div>

        {/* Título Productos */}
        <h2 className="text-2xl font-bold mb-4" style={{ color: colors.textPrimary }}>
          Productos
        </h2>

        {/* Filtros */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() =>
                setSelectedFilter(selectedFilter === filter.value ? null : filter.value)
              }
              className="flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all whitespace-nowrap"
              style={{
                borderColor: selectedFilter === filter.value ? colors.secondary : colors.grey300,
                backgroundColor: selectedFilter === filter.value ? colors.secondary + '10' : 'white',
                color: selectedFilter === filter.value ? colors.secondary : colors.grey600,
              }}
            >
              <Image
                src={filter.icon}
                alt={filter.label}
                width={20}
                height={20}
                className="flex-shrink-0"
                style={{
                  filter: selectedFilter === filter.value
                    ? 'brightness(0) saturate(100%) invert(58%) sepia(94%) saturate(3583%) hue-rotate(352deg) brightness(100%) contrast(97%)'
                    : 'brightness(0) saturate(0%) brightness(60%)'
                }}
              />
              <span className="font-semibold">{filter.label}</span>
            </button>
          ))}
        </div>

        {/* Lista de Productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              onClick={() => {
                if (product.type === 'cuentas') {
                  router.push(`/cuentas/${product.accountNumber}`);
                } else if (product.type === 'tarjetas') {
                  router.push(`/tarjetas/${product.accountNumber}`);
                } else if (product.type === 'prestamos') {
                  router.push(`/prestamos/${product.accountNumber}`);
                }
              }}
              className="bg-white rounded-2xl p-6 cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1" style={{ color: colors.textPrimary }}>
                    {product.title}
                  </h3>
                  <p className="text-sm" style={{ color: colors.textSecondary }}>
                    {product.subtitle}
                  </p>
                </div>
                <Image
                  src={product.icon}
                  alt={product.subtitle}
                  width={32}
                  height={32}
                  className="flex-shrink-0"
                  style={{
                    filter: selectedFilter === product.type
                      ? 'brightness(0) saturate(100%) invert(58%) sepia(94%) saturate(3583%) hue-rotate(352deg) brightness(100%) contrast(97%)'
                      : 'brightness(0) saturate(0%) brightness(60%)'
                  }}
                />
              </div>

              <div className="space-y-3">
                <p className="text-sm" style={{ color: colors.grey500 }}>
                  {product.accountNumber}
                </p>
                <p className="text-2xl font-bold" style={{ color: colors.textPrimary }}>
                  {product.balance}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
