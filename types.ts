

export enum OrderStatus {
    Pending = 'Pending',
    Bundled = 'Bundled',
    InTransit = 'In Transit',
    InWarehouse = 'In Warehouse',
    OutForDelivery = 'Out for Delivery',
    Delivered = 'Delivered',
    Paid = 'Paid',
    Cancelled = 'Cancelled'
}

export enum PaymentStatus {
    NotPaid = 'Not Paid',
    PartiallyPaid = 'Partially Paid',
    FullyPaid = 'Fully Paid'
}

export interface CustomerOrder {
    id: string;
    customerId: string;
    customerName: string;
    customerPhone: string;
    customerPhone2?: string;
    productLink?: string;
    orderDescription?: string;
    totalPrice: number;
    logisticsId?: string;
    bundleId?: string;
    status: OrderStatus;
    createdAt: Date;
    orderDate: Date;
    paidAmount: number;
    estimatedDueDate?: Date;
}

export interface SupplierBundle {
    id: string;
    name: string;
    logisticsReferenceId: string;
    totalCost: number;
    paymentAccountId: string;
    orderIds: string[];
    createdAt: Date;
    paymentRecorded: boolean;
}

export enum TransactionType {
    Debit = 'Debit',
    Credit = 'Credit'
}

export interface Transaction {
    id: string;
    accountId: string;
    date: Date;
    description: string;
    amount: number;
    type: TransactionType;
    referenceId?: string; // e.g., OrderID, BundleID
    partyName?: string; // "Received from" or "Paid to"
    customerId?: string;
    employeeId?: string;
    receiptNumber?: string; // Physical receipt number from voucher
    voucherId: string; // Groups multiple transactions into a single voucher
    voucherNumber: string; // User-facing voucher number (e.g., RV-001)
}

export enum PaymentMethodType {
    Cash = 'Cash',
    Bank = 'Bank',
    EWallet = 'E-Wallet',
    MasterCard = 'MasterCard',
    MobileCredit = 'Mobile Credit'
}

export enum AccountCategory {
    Asset = 'Asset',
    Liability = 'Liability',
    Equity = 'Equity',
    Revenue = 'Revenue',
    COGS = 'Cost of Goods Sold',
    OperatingExpense = 'Operating Expense',
}

export enum AccountType {
    Cash = 'Cash',
    Bank = 'Bank or Credit Card',
    EWallet = 'E-Wallet',
    MobileCredit = 'Mobile Credit',
    AccountsReceivable = 'Accounts Receivable',
    OtherCurrentAsset = 'Other Current Asset',
    FixedAsset = 'Fixed Asset',
    AccountsPayable = 'Accounts Payable',
    OtherCurrentLiability = 'Other Current Liability',
    Equity = 'Equity',
    Revenue = 'Revenue',
    COGS = 'Cost of Goods Sold',
    OperatingExpense = 'Operating Expense',
}

export interface Account {
    id: string;
    code: string;
    name: string;
    nameKurdish: string;
    parentId: string | null;
    category: AccountCategory;
    accountType: AccountType;
    balance: number;
    isDeletable: boolean; 
    shareholderId?: string;
    // For frontend tree structure
    children?: Account[];
    isPostable?: boolean;
}


export interface Shareholder {
    id:string;
    name: string;
    profitSharePercentage: number;
    capitalContributions: number;
}

export interface DailyReconciliation {
    id: string;
    date: Date;
    agentName: string;
    expectedAmount: number;
    actualAmount: number;
}

export interface Customer {
    id: string;
    name?: string;
    phone1: string;
    phone2?: string;
    address: string;
    createdAt: Date;
    email?: string;
}

export interface CustomerStatement {
    customerId: string;
    customerName: string;
    customerPhone: string;
    startDate: string;
    endDate: string;
    openingBalance: number;
    closingBalance: number;
    totalDebit: number; // For the period
    totalCredit: number; // For the period
    statementRows: (CustomerOrder | Transaction)[];
}

export interface AccountLedger {
    accountId: string;
    accountName: string;
    accountCode: string;
    startDate: string;
    endDate: string;
    openingBalance: number;
    closingBalance: number;
    totalDebit: number;
    totalCredit: number;
    transactions: Transaction[];
}

export interface GeneralLedgerNode {
    account: Account;
    openingBalance: number;
    closingBalance: number;
    totalDebit: number;
    totalCredit: number;
    transactions: Transaction[];
    level: number;
    isPostable: boolean;
    children: GeneralLedgerNode[];
}

export interface TrialBalanceNode {
    account: Account;
    debit: number;
    credit: number;
    children: TrialBalanceNode[];
    level: number;
}

export interface VoucherLine {
    description: string;
    amount: number;
    referenceId?: string;
    receiptNumber?: string;
    partyName?: string;
    customerId?: string;
    commission?: number;
    accountId?: string; // For disbursements
}

export interface Voucher {
    voucherId: string;
    voucherNumber: string;
    date: Date;
    accountId: string; // The primary asset account (Debit for Receipt, Credit for Disbursement)
    type: TransactionType;
    lines: VoucherLine[];
    totalAmount: number;
}


export interface JournalVoucherLine {
    accountId: string;
    description: string;
    debit: number;
    credit: number;
    customerId?: string;
    employeeId?: string;
    partyName?: string;
    referenceId?: string; 
}

export interface JournalVoucher {
    voucherId: string;
    voucherNumber: string;
    date: Date;
    description: string; // General description for the whole JV
    lines: JournalVoucherLine[];
    sourceReference?: {
        type: 'Order' | 'Receipt' | 'Disbursement' | 'Bundle' | 'Payroll';
        id: string;
    };
}

export interface FinancialSummaryData {
    assets: {
        cashAndBanks: { total: number; accounts: { name: string; id: string; balance: number }[] };
        moneyWithOthers: { total: number; accounts: { name: string; id: string; balance: number }[] };
        investedInGoods: { total: number; accounts: { name: string; id: string; balance: number }[] };
        fixedAssets: { total: number; accounts: { name: string; id: string; balance: number }[] };
        total: number;
    };
    liabilitiesAndEquity: {
        debtsToOthers: { total: number; accounts: { name: string; id: string; balance: number }[] };
        ownersStake: { total: number; accounts: { name: string; id: string; balance: number }[] };
        total: number;
    };
}

export interface ProfitAndLossData {
    revenue: {
        operatingRevenue: { total: number; accounts: { name: string; id: string; balance: number }[] };
        otherIncome: { total: number; accounts: { name: string; id: string; balance: number }[] };
        total: number;
    };
    cogs: {
        total: number;
        accounts: { name: string; id: string; balance: number }[];
    };
    grossProfit: number;
    expenses: {
        operatingExpenses: { total: number; accounts: { name: string; id: string; balance: number }[] };
        total: number;
    };
    netProfit: number;
}

// --- Dashboard Types ---
export interface Kpi {
    value: number;
    comparison: number; // Percentage change vs. previous period
    sparkline: { date: string; value: number }[];
}

export interface DashboardData {
    // KPIs
    netProfit: Kpi;
    totalRevenue: Kpi;
    grossProfitMargin: Kpi;
    totalExpenses: Kpi;
    newOrders: Kpi;
    averageOrderValue: Kpi;

    // Widgets
    keyBalances: {
        cash: number;
        banks: number;
        eWallets: number;
    };
    capitalAllocation: {
        accountsReceivable: number;
        goodsInTransit: number;
    };
    topUnpaidInvoices: {
        customerId: string;
        customerName: string;
        orderId: string;
        amountDue: number;
        daysOverdue: number;
    }[];
    recentTransactions: Transaction[];

    // Charts
    financialTrend: { date: string; revenue: number; profit: number; expenses: number }[];
    cashFlowTrend: { date: string; cashIn: number; cashOut: number }[];
    expenseBreakdown: { name: string; value: number; accountId: string }[];
}


// --- Employee & Payroll Types ---
export interface Employee {
    id: string;
    fullName: string;
    position: string;
    startDate: Date;
    basicMonthlySalary: number;
    paymentMethod: string; // e.g., 'Cash', 'Bank Transfer', could be enum
    isActive: boolean;
}

export enum EmployeeLedgerTransactionType {
    AdvanceTaken = 'Advance / Loan Taken',
    SalaryAccrued = 'Salary Accrued',
    AdvanceRepayment = 'Advance Repayment',
    SalaryPaid = 'Salary Paid'
}

export interface EmployeeLedgerEntry {
    id: string;
    employeeId: string;
    date: Date;
    transactionType: EmployeeLedgerTransactionType;
    description: string;
    debit: number;
    credit: number;
    referenceVoucherId: string;
}

export interface PayrollEmployee {
    employeeId: string;
    employeeName: string;
    basicSalary: number;
    advanceBalance: number; // Opening advance balance for the period
    deduction: number;
    netSalary: number;
}

export interface Payroll {
    id: string;
    period: string; // e.g., "2024-07"
    processingDate: Date;
    status: 'Draft' | 'Finalized' | 'Paid';
    employees: PayrollEmployee[];
    totalGrossSalary: number;
    totalDeductions: number;
    totalNetSalary: number;
    accrualJournalId?: string;
    paymentJournalId?: string;
}