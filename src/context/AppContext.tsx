import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type User = { name: string; email: string };
export type GraphType = "line" | "bar";
export type AccountSettings = {
  nickname: string;
  email: string;
  graphType: GraphType;
  graphArea: boolean;
  verified: boolean;
};
export type Wallet = {
  currency: "RUB" | "EUR";
  balance: number;
  pending: number;
  payout: string;
};
export type StoreTemplate = "funtime" | "reallyworld" | "holyworld";
export type Store = {
  id: string;
  name: string;
  slug: string;
  template: StoreTemplate;
  status: "Опубликован" | "Черновик";
  createdAt: string;
};
export type Payment = {
  id: string;
  player: string;
  product: string;
  amount: number;
  status: "Оплачен" | "Возврат";
  date: string;
};
export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  popular?: boolean;
};

const seedProducts: Product[] = [
  { id: "vip", name: "VIP", category: "Привилегии", price: 199, description: "Набор команд, префикс и 3 дома" },
  { id: "premium", name: "Premium", category: "Привилегии", price: 499, description: "Расширенные команды и 7 домов", popular: true },
  { id: "legend", name: "Legend", category: "Привилегии", price: 990, description: "Максимум возможностей навсегда" },
  { id: "keys", name: "5 ключей", category: "Кейсы", price: 249, description: "Пять ключей от редкого кейса" },
];

const seedPayments: Payment[] = [
  { id: "AV-82041", player: "Steve_2010", product: "Premium", amount: 499, status: "Оплачен", date: "Сегодня, 14:32" },
  { id: "AV-82040", player: "Alexandra", product: "5 ключей", amount: 249, status: "Оплачен", date: "Сегодня, 14:09" },
  { id: "AV-82039", player: "mrCreeper", product: "Legend", amount: 990, status: "Оплачен", date: "Сегодня, 13:41" },
  { id: "AV-82038", player: "KALINA", product: "VIP", amount: 199, status: "Оплачен", date: "Сегодня, 12:18" },
];

const defaultSettings: AccountSettings = {
  nickname: "alexkalinin",
  email: "alexander@example.ru",
  graphType: "line",
  graphArea: true,
  verified: false,
};

const defaultWallets: Wallet[] = [
  { currency: "RUB", balance: 12_458.78, pending: 1_249, payout: "Счёт не подключён" },
  { currency: "EUR", balance: 186.4, pending: 0, payout: "Счёт не подключён" },
];

type AccountRecord = User & { password: string };
type AppState = {
  user: User | null;
  authOpen: boolean;
  setAuthOpen: (open: boolean) => void;
  login: (email: string, password: string) => string | null;
  register: (name: string, email: string, password: string) => string | null;
  logout: () => void;
  deleteAccount: () => void;
  settings: AccountSettings;
  saveSettings: (settings: AccountSettings) => void;
  changeEmail: (email: string) => string | null;
  changePassword: (currentPassword: string, newPassword: string) => string | null;
  verifyAccount: () => void;
  wallets: Wallet[];
  payments: Payment[];
  stores: Store[];
  createStore: (data: Omit<Store, "id" | "status" | "createdAt">) => Store;
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  removeProduct: (id: string) => void;
  addPayment: (player: string, product: Product) => Payment;
};

const Context = createContext<AppState | null>(null);
const SESSION = "aveon-session";
const ACCOUNTS = "aveon-accounts";
const PAYMENTS = "aveon-payments";
const PRODUCTS = "aveon-products";
const SETTINGS = "aveon-settings";
const WALLETS = "aveon-wallets";
const STORES = "aveon-stores";

function read<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

function persist(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => read<User | null>(SESSION, null));
  const [authOpen, setAuthOpen] = useState(false);
  const [settings, setSettings] = useState<AccountSettings>(() => read(SETTINGS, defaultSettings));
  const [wallets, setWallets] = useState<Wallet[]>(() => read(WALLETS, defaultWallets));
  const [stores, setStores] = useState<Store[]>(() => read(STORES, []));
  const [payments, setPayments] = useState<Payment[]>(() => read(PAYMENTS, seedPayments));
  const [products, setProducts] = useState<Product[]>(() => read(PRODUCTS, seedProducts));

  useEffect(() => persist(PAYMENTS, payments), [payments]);
  useEffect(() => persist(PRODUCTS, products), [products]);
  useEffect(() => persist(SETTINGS, settings), [settings]);
  useEffect(() => persist(WALLETS, wallets), [wallets]);
  useEffect(() => persist(STORES, stores), [stores]);

  const login = (email: string, password: string) => {
    const accounts = read<AccountRecord[]>(ACCOUNTS, []);
    const account = accounts.find(
      (item) => item.email.toLowerCase() === email.toLowerCase() && item.password === password,
    );
    if (!account) return "Неверная почта или пароль";
    const next = { name: account.name, email: account.email };
    setUser(next);
    persist(SESSION, next);
    setSettings((current) => ({ ...current, nickname: current.nickname || account.name, email: account.email }));
    setAuthOpen(false);
    return null;
  };

  const register = (name: string, email: string, password: string) => {
    const accounts = read<AccountRecord[]>(ACCOUNTS, []);
    if (accounts.some((item) => item.email.toLowerCase() === email.toLowerCase())) {
      return "Аккаунт с такой почтой уже существует";
    }
    const account = { name, email, password };
    persist(ACCOUNTS, [...accounts, account]);
    const next = { name, email };
    setUser(next);
    persist(SESSION, next);
    setSettings((current) => ({ ...current, nickname: name, email }));
    setAuthOpen(false);
    return null;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(SESSION);
    window.location.hash = "home";
  };

  const deleteAccount = () => {
    if (!user) return;
    const accounts = read<AccountRecord[]>(ACCOUNTS, []);
    persist(ACCOUNTS, accounts.filter((account) => account.email !== user.email));
    logout();
  };

  const saveSettings = (next: AccountSettings) => {
    setSettings(next);
    if (user && next.nickname !== user.name) {
      const nextUser = { ...user, name: next.nickname };
      setUser(nextUser);
      persist(SESSION, nextUser);
    }
  };

  const changeEmail = (email: string) => {
    if (!user) return "Сессия не найдена";
    const accounts = read<AccountRecord[]>(ACCOUNTS, []);
    if (accounts.some((account) => account.email.toLowerCase() === email.toLowerCase() && account.email !== user.email)) {
      return "Этот адрес уже используется";
    }
    const nextUser = { ...user, email };
    setUser(nextUser);
    persist(SESSION, nextUser);
    persist(ACCOUNTS, accounts.map((account) => account.email === user.email ? { ...account, email } : account));
    setSettings((current) => ({ ...current, email }));
    return null;
  };

  const changePassword = (currentPassword: string, newPassword: string) => {
    if (!user) return "Сессия не найдена";
    const accounts = read<AccountRecord[]>(ACCOUNTS, []);
    const account = accounts.find((item) => item.email === user.email);
    if (!account || account.password !== currentPassword) return "Текущий пароль введён неверно";
    persist(ACCOUNTS, accounts.map((item) => item.email === user.email ? { ...item, password: newPassword } : item));
    return null;
  };

  const verifyAccount = () => setSettings((current) => ({ ...current, verified: true }));

  const createStore = (data: Omit<Store, "id" | "status" | "createdAt">) => {
    const store: Store = { ...data, id: crypto.randomUUID(), status: "Опубликован", createdAt: "Только что" };
    setStores((current) => [store, ...current]);
    return store;
  };

  const addProduct = (product: Omit<Product, "id">) => {
    setProducts((current) => [...current, { ...product, id: crypto.randomUUID() }]);
  };

  const removeProduct = (id: string) => setProducts((current) => current.filter((p) => p.id !== id));

  const addPayment = (player: string, product: Product) => {
    const payment: Payment = {
      id: `AV-${Math.floor(10000 + Math.random() * 89999)}`,
      player,
      product: product.name,
      amount: product.price,
      status: "Оплачен",
      date: "Только что",
    };
    setPayments((current) => [payment, ...current]);
    setWallets((current) => current.map((wallet) => wallet.currency === "RUB"
      ? { ...wallet, balance: Math.round((wallet.balance + product.price * 0.97) * 100) / 100 }
      : wallet));
    return payment;
  };

  const value = useMemo(() => ({
    user, authOpen, setAuthOpen, login, register, logout, deleteAccount,
    settings, saveSettings, changeEmail, changePassword, verifyAccount,
    wallets, payments, stores, createStore, products, addProduct, removeProduct, addPayment,
  }), [user, authOpen, settings, wallets, payments, stores, products]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useApp() {
  const value = useContext(Context);
  if (!value) throw new Error("useApp must be used inside AppProvider");
  return value;
}