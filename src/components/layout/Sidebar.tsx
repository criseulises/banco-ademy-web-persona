'use client';

import { useState } from 'react';
import Image from 'next/image';

interface SubMenuItem {
  label: string;
  href: string;
}

interface MenuItem {
  icon: string;
  label: string;
  href?: string;
  subItems?: SubMenuItem[];
}

const Sidebar = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>(['Transferencias', 'Pagos']);

  const menuItems: MenuItem[] = [
    {
      icon: '/icon/sidebar/transferencia.svg',
      label: 'Transferencias',
      subItems: [
        { label: 'Propias', href: '/transferencias/propias' },
        { label: 'A terceros', href: '/transferencias/terceros' },
        { label: 'Programadas', href: '/transferencias/programadas' },
      ],
    },
    {
      icon: '/icon/sidebar/tabler-icon-cash.svg',
      label: 'Pagos',
      subItems: [
        { label: 'Tarjetas', href: '/pagos/tarjetas' },
        { label: 'Préstamos', href: '/pagos/prestamos' },
        { label: 'Servicios', href: '/pagos/servicios' },
        { label: 'Impuestos', href: '/pagos/impuestos' },
        { label: 'Recargas', href: '/pagos/recargas' },
        { label: 'Programados', href: '/pagos/programados' },
      ],
    },
    {
      icon: '/icon/sidebar/tabler-icon-file-time.svg',
      label: 'Movimientos',
      href: '/movimientos',
    },
    {
      icon: '/icon/sidebar/tabler-icon-category-plus.svg',
      label: 'Solicitudes',
      href: '/solicitudes',
    },
    {
      icon: '/icon/sidebar/tabler-icon-phone.svg',
      label: 'Contacto',
      href: '/contacto',
    },
    {
      icon: '/icon/sidebar/tabler-icon-users.svg',
      label: 'Beneficiarios',
      href: '/beneficiarios',
    },
    {
      icon: '/icon/sidebar/tabler-icon-home-bolt.svg',
      label: 'Servicios',
      href: '/servicios',
    },
    {
      icon: '/icon/sidebar/cartera.svg',
      label: 'Configuración',
      href: '/configuracion',
    },
  ];

  const toggleItem = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  return (
    <aside className="w-[280px] h-screen bg-white border-r border-gray-200 overflow-y-auto">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center">
            <Image
              src="/icon/sidebar/cartera.svg"
              alt="Mis productos"
              width={24}
              height={24}
              className="text-cyan-500"
            />
          </div>
          <h2 className="text-[17px] font-semibold text-cyan-500">
            Mis productos
          </h2>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="py-3">
        {menuItems.map((item, index) => (
          <div key={index}>
            {/* Main Item */}
            <button
              onClick={() => item.subItems && toggleItem(item.label)}
              className={`w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors duration-150 ${
                !item.subItems ? 'cursor-pointer' : ''
              }`}
            >
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                <Image
                  src={item.icon}
                  alt={item.label}
                  width={22}
                  height={22}
                  className="opacity-80"
                />
              </div>
              <span className="text-[15px] font-semibold text-gray-800 flex-1 text-left">
                {item.label}
              </span>
              {item.subItems && (
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                    expandedItems.includes(item.label) ? 'rotate-90' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </button>

            {/* Sub Items */}
            {item.subItems && expandedItems.includes(item.label) && (
              <div className="relative">
                {/* Vertical connecting line */}
                <div className="absolute left-[42px] top-0 bottom-0 w-[1.5px] bg-gray-300" />
                
                {item.subItems.map((subItem, subIndex) => (
                  <div key={subIndex} className="relative">
                    {/* Horizontal connecting line */}
                    <div className="absolute left-[42px] top-[18px] w-[20px] h-[1.5px] bg-gray-300" />
                    
                    <a
                      href={subItem.href}
                      className="flex items-center pl-[74px] pr-5 py-[10px] hover:bg-gray-50 transition-colors duration-150 group"
                    >
                      <span className="text-[14px] text-gray-600 group-hover:text-gray-900 transition-colors">
                        {subItem.label}
                      </span>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;