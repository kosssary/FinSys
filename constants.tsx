
import React from 'react';
import {
    LayoutGrid,
    TrendingUp,
    ShoppingCart,
    Wallet,
    Truck,
    Users,
    Settings,
    ChevronRight
} from 'lucide-react';

export const SIDEBAR_CONFIG = [
  {
    key: 'dashboard',
    title: 'Dashboard',
    icon: <LayoutGrid size={20} />,
    path: '/',
  },
  {
    key: 'sales',
    title: 'Sales',
    icon: <TrendingUp size={20} />,
    subItems: [
      { title: 'Orders', path: '/orders' },
      { title: 'Customers', path: '/customers' },
      { title: 'Statements', path: '/customer-statements' },
    ],
  },
  {
    key: 'purchasing',
    title: 'Purchasing',
    icon: <ShoppingCart size={20} />,
    subItems: [
      { title: 'Bundles', path: '/bundles' },
      { title: 'Supplier Bills', path: '/supplier-bills' },
    ],
  },
  {
    key: 'financials',
    title: 'Financials',
    icon: <Wallet size={20} />,
    subItems: [
      { type: 'header', title: 'Transactions' },
      { title: 'Receipts', path: '/receipts' },
      { title: 'Disbursements', path: '/disbursements' },
      { title: 'Journal Vouchers', path: '/journal-vouchers' },
      { type: 'header', title: 'Accounting' },
      { title: 'General Ledger', path: '/general-ledger' },
      { title: 'Trial Balance', path: '/trial-balance' },
      { type: 'header', title: 'Reports' },
      { title: 'Financial Summary', path: '/financial-summary' },
      { title: 'Profit & Loss', path: '/profit-and-loss' },
      { title: 'Balance Sheet', path: '/balance-sheet' },
    ],
  },
  {
    key: 'operations',
    title: 'Operations',
    icon: <Truck size={20} />,
    subItems: [
        { title: 'Internal Transport', path: '/internal-transport'},
        { title: 'Warehouse Management', path: '/warehouse-management'}
    ]
  },
  {
    key: 'people',
    title: 'People',
    icon: <Users size={20} />,
    subItems: [
      { title: 'Employees', path: '/employees' },
      { title: 'Payroll', path: '/payroll' },
      { title: 'Partners', path: '/partners' },
    ],
  },
  {
    key: 'settings',
    title: 'Settings',
    icon: <Settings size={20} />,
    subItems: [
      { title: 'Chart of Accounts', path: '/chart-of-accounts' },
      { title: 'System Settings', path: '/system-settings' },
    ],
  },
];


export const IQ_CITIES = [
    "Anbar", "Babil", "Baghdad", "Basra", "Dhi Qar", "Diyala", "Dohuk",
    "Erbil", "Karbala", "Kirkuk", "Maysan", "Mosul", "Muthanna", "Najaf",
    "Qadisiyyah", "Saladin", "Sulaymaniyah", "Wasit"
].sort();