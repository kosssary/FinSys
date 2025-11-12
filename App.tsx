
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Bundles from './pages/Bundles';
import Receipts from './pages/Receipts';
import Disbursements from './pages/Disbursements';
import Finance from './pages/Finance';
import AccountsReceivable from './pages/AccountsReceivable';
import CustomerStatements from './pages/CustomerStatements';
import Customers from './pages/Customers';
import Shareholders from './pages/Shareholders';
import Reports from './pages/Reports';
import JournalVouchers from './pages/JournalVouchers';
import ChartOfAccounts from './pages/ChartOfAccounts';
import AccountLedger from './pages/AccountLedger';
import GeneralLedger from './pages/GeneralLedger';
import FinancialSummary from './pages/FinancialSummary';
import ProfitAndLoss from './pages/ProfitAndLoss';
import Employees from './pages/Employees';
import EmployeeProfile from './pages/EmployeeProfile';
import Payroll from './pages/Payroll';
import { SIDEBAR_CONFIG } from './constants';

const getPageTitle = (pathname: string): string => {
    for (const item of SIDEBAR_CONFIG) {
        if (item.path === pathname) {
            return item.title;
        }
        if (item.subItems) {
            for (const subItem of item.subItems) {
                if ('path' in subItem && subItem.path === pathname) {
                    return subItem.title;
                }
            }
        }
    }
    // Handle dynamic routes
    if (pathname.startsWith('/employees/')) return 'Employee Profile';
    if (pathname.startsWith('/accounts/')) return 'Account Ledger';

    return 'Dashboard'; // Default title
};


const App: React.FC = () => {
    const location = useLocation();
    const pageTitle = getPageTitle(location.pathname);

    const PlaceholderPage: React.FC<{title: string}> = ({title}) => (
        <div className="text-center p-10">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h1>
            <p className="text-gray-500 dark:text-gray-400">This page is under construction.</p>
        </div>
    );

    return (
        <div className="p-4 md:p-6 lg:p-8 min-h-screen text-slate-800 dark:text-slate-200">
            <div className="bg-slate-50 dark:bg-[#171D2C] rounded-3xl shadow-2xl shadow-slate-300/20 dark:shadow-black/20 flex h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)] lg:h-[calc(100vh-4rem)]">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Header title={pageTitle} />
                    <main className="flex-1 overflow-auto p-6">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            
                            {/* Sales */}
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/customers" element={<Customers />} />
                            <Route path="/customer-statements" element={<CustomerStatements />} />
                            
                            {/* Purchasing */}
                            <Route path="/bundles" element={<Bundles />} />
                            <Route path="/supplier-bills" element={<PlaceholderPage title="Supplier Bills" />} />

                            {/* Financials */}
                            <Route path="/receipts" element={<Receipts />} />
                            <Route path="/disbursements" element={<Disbursements />} />
                            <Route path="/journal-vouchers" element={<JournalVouchers />} />
                            <Route path="/general-ledger" element={<GeneralLedger />} />
                            <Route path="/trial-balance" element={<Finance />} />
                            <Route path="/financial-summary" element={<FinancialSummary />} />
                            <Route path="/profit-and-loss" element={<ProfitAndLoss />} />
                            <Route path="/balance-sheet" element={<PlaceholderPage title="Balance Sheet" />} />

                             {/* Operations */}
                            <Route path="/internal-transport" element={<PlaceholderPage title="Internal Transport" />} />
                            <Route path="/warehouse-management" element={<PlaceholderPage title="Warehouse Management" />} />

                            {/* People */}
                            <Route path="/employees" element={<Employees />} />
                            <Route path="/employees/:employeeId" element={<EmployeeProfile />} />
                            <Route path="/payroll" element={<Payroll />} />
                            <Route path="/partners" element={<Shareholders />} />

                            {/* Settings */}
                            <Route path="/chart-of-accounts" element={<ChartOfAccounts />} />
                            <Route path="/system-settings" element={<PlaceholderPage title="System Settings" />} />
                            
                            {/* Deprecated / To be removed */}
                            <Route path="/finance" element={<Finance />} />
                            <Route path="/accounts/:accountId/ledger" element={<AccountLedger />} />
                            <Route path="/receivables" element={<AccountsReceivable />} />
                            <Route path="/reports" element={<Reports />} />
                            <Route path="/shareholders" element={<Shareholders />} />
                        </Routes>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default App;
