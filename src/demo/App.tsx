import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  INITIAL_CUSTOMERS, 
  INITIAL_HISTORY, 
  INITIAL_PROFILE, 
  Customer, 
  VisitHistory, 
  CollectorProfile 
} from './types';
import { PhoneFrame } from './components/PhoneFrame';
import { LoginScreen } from './components/LoginScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { TasksScreen } from './components/TasksScreen';
import { DetailScreen } from './components/DetailScreen';
import { CheckinScreen } from './components/CheckinScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { HistoryScreen } from './components/HistoryScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { 
  Layers, 
  Smartphone, 
  RotateCcw, 
  Settings, 
  Sparkles, 
  CheckCircle,
  Eye,
  Info,
  ExternalLink,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type ViewMode = 'canvas' | 'simulator';
type ScreenId = 'login' | 'dashboard' | 'tugas' | 'detail' | 'checkin' | 'checkout' | 'history' | 'profil';

export default function App() {
  const navigate = useNavigate();

  // Global Workspace Configuration
  const [viewMode, setViewMode] = useState<ViewMode>('simulator');
  const [activeTheme, setActiveTheme] = useState<'classic-blue' | 'modern-indigo'>('classic-blue');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active Simulator State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreenId, setCurrentScreenId] = useState<ScreenId>('login');
  
  // Selected Customer for Details / Check-In flow
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('cust-1');

  // Stateful copy of mock database for realistic updates
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [historyList, setHistoryList] = useState<VisitHistory[]>(INITIAL_HISTORY);
  const [collectorProfile, setCollectorProfile] = useState<CollectorProfile>(INITIAL_PROFILE);

  // Selected Customer Object
  const currentCustomer = useMemo(() => {
    return customers.find(c => c.id === selectedCustomerId) || customers[0];
  }, [customers, selectedCustomerId]);

  // Toast notifier helper
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Reset state to initial mockups values
  const handleResetWorkspace = () => {
    setCustomers(INITIAL_CUSTOMERS);
    setHistoryList(INITIAL_HISTORY);
    setCollectorProfile(INITIAL_PROFILE);
    setIsLoggedIn(false);
    setCurrentScreenId('login');
    setSelectedCustomerId('cust-1');
    showToast('Workspace data berhasil di-reset kembali ke kondisi awal.');
  };

  // Handle Login
  const handleLoginSuccess = (email: string) => {
    setIsLoggedIn(true);
    setCurrentScreenId('dashboard');
    showToast(`Selamat datang kembali, Andi Setiawan!`);
  };

  // Handle start customer visit
  const handleStartVisit = (customer: Customer) => {
    setSelectedCustomerId(customer.id);
    setCurrentScreenId('checkin');
  };

  // Handle check-in success
  const handleCheckInSuccess = (selfie: string, locationPhoto: string) => {
    setCurrentScreenId('checkout');
    showToast(`Check-In berhasil! Lokasi Anda terekam akurat. Timer kunjungan dimulai.`);
  };

  // Handle check-out success & database write back!
  const handleCheckOutSuccess = (resultData: {
    status: 'Lunas' | 'Tertagih Sebagian' | 'Janji Bayar' | 'Tidak di Tempat' | 'Kendala';
    collectedAmount: number;
    promiseDate?: string;
    notes: string;
  }) => {
    // 1. Update customer's status in memory
    const updatedCustomers = customers.map(c => {
      if (c.id === selectedCustomerId) {
        let newStatus = c.status;
        if (resultData.status === 'Lunas') newStatus = 'Lunas';
        else if (resultData.status === 'Janji Bayar') newStatus = 'Janji Bayar';
        else if (resultData.status === 'Kendala') newStatus = 'Overdue';
        
        return {
          ...c,
          status: newStatus,
          paidAmount: c.paidAmount + resultData.collectedAmount,
          remainingAmount: Math.max(0, c.remainingAmount - resultData.collectedAmount),
        };
      }
      return c;
    });
    setCustomers(updatedCustomers);

    // 2. Prepend a new record to the visit history logs
    const newHistoryItem: VisitHistory = {
      id: `hist-${Date.now()}`,
      customerName: currentCustomer.name,
      invoiceNo: currentCustomer.invoiceNo,
      amount: resultData.collectedAmount,
      timestamp: `Kamis, 9 Juli 2026 (09:12 - 09:25)`,
      status: resultData.status,
      notes: resultData.notes,
    };
    setHistoryList([newHistoryItem, ...historyList]);

    // 3. Update profile performance score & totals
    setCollectorProfile(prev => {
      const addedVisits = prev.totalVisits + 1;
      const addedRevenue = prev.totalCollected + resultData.collectedAmount;
      const scoreGain = resultData.status === 'Lunas' ? 3 : resultData.status === 'Tertagih Sebagian' ? 2 : 1;
      const newScore = Math.min(100, prev.performanceScore + scoreGain);
      
      return {
        ...prev,
        totalVisits: addedVisits,
        totalCollected: addedRevenue,
        performanceScore: newScore,
        performanceBadge: newScore >= 80 ? 'Baik' : 'Cukup',
      };
    });

    // 4. Return to main list & notify success
    setCurrentScreenId('tugas');
    showToast(`Kunjungan untuk ${currentCustomer.name} berhasil diselesaikan dan dicatat!`);
  };

  // Switch tab in simulator
  const handleTabChange = (tab: 'dashboard' | 'tugas' | 'history' | 'profil') => {
    if (!isLoggedIn) {
      showToast('Silakan login terlebih dahulu untuk mengakses menu utama.');
      return;
    }
    
    if (tab === 'dashboard') setCurrentScreenId('dashboard');
    else if (tab === 'tugas') setCurrentScreenId('tugas');
    else if (tab === 'history') setCurrentScreenId('history');
    else if (tab === 'profil') setCurrentScreenId('profil');
  };

  // Directly load a specific screen into the simulator from the mockup grid
  const launchScreenInSimulator = (screen: ScreenId, customCustId?: string) => {
    setViewMode('simulator');
    if (screen === 'login') {
      setIsLoggedIn(false);
      setCurrentScreenId('login');
    } else {
      setIsLoggedIn(true);
      setCurrentScreenId(screen);
    }
    if (customCustId) {
      setSelectedCustomerId(customCustId);
    }
    showToast(`Menampilkan Screen: ${screen.toUpperCase()} dalam simulator interaktif.`);
  };

  // Header background classes based on theme selection
  const headerBgClass = activeTheme === 'classic-blue' ? 'bg-blue-900' : 'bg-indigo-900';

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col antialiased">
      
      {/* Dynamic Toast Alert Popups */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full px-4"
          >
            <div className="bg-emerald-500 text-white font-semibold text-xs px-4 py-3.5 rounded-xl shadow-2xl flex items-center gap-2.5 border border-emerald-400">
              <CheckCircle className="w-5 h-5 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Body Layout */}
      <main className="flex-1 overflow-hidden flex flex-col relative bg-slate-950">
        
        {/* Floating Back Button */}
        <button
          onClick={() => navigate('/demo')}
          className="absolute top-4 left-4 z-50 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-lg border border-slate-700 flex items-center gap-2 transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Pilihan Peran
        </button>

        <div className="flex-1 flex items-center justify-center p-0 md:p-8 bg-slate-900 h-screen overflow-hidden">
          
          <PhoneFrame
            isLoginScreen={currentScreenId === 'login'}
            activeTab={
              currentScreenId === 'dashboard' ? 'dashboard' :
              currentScreenId === 'tugas' ? 'tugas' :
              currentScreenId === 'history' ? 'history' :
              currentScreenId === 'profil' ? 'profil' :
              'none'
            }
            onTabChange={handleTabChange}
            screenTitle={
              currentScreenId === 'login' ? '' :
              currentScreenId === 'dashboard' ? 'Dashboard' :
              currentScreenId === 'tugas' ? 'Tugas Hari Ini' :
              currentScreenId === 'detail' ? 'Detail Pelanggan' :
              currentScreenId === 'checkin' ? 'Check-In Kunjungan' :
              currentScreenId === 'checkout' ? 'Input Hasil & Check-Out' :
              currentScreenId === 'history' ? 'History Kunjungan' :
              currentScreenId === 'profil' ? 'Profil Saya' : ''
            }
            onBack={
              (currentScreenId === 'detail' || currentScreenId === 'checkin' || currentScreenId === 'checkout')
                ? () => {
                    if (currentScreenId === 'detail') setCurrentScreenId('tugas');
                    else if (currentScreenId === 'checkin') setCurrentScreenId('detail');
                    else if (currentScreenId === 'checkout') setCurrentScreenId('checkin');
                  }
                : undefined
            }
          >
            {/* Dynamically render active screens inside phone frame based on selection */}
            {currentScreenId === 'login' && (
              <LoginScreen onLoginSuccess={handleLoginSuccess} />
            )}

            {currentScreenId === 'dashboard' && (
              <DashboardScreen 
                customers={customers}
                onSelectCustomer={(c) => { setSelectedCustomerId(c.id); setCurrentScreenId('detail'); }}
                onNavigateToTab={handleTabChange}
              />
            )}

            {currentScreenId === 'tugas' && (
              <TasksScreen 
                customers={customers}
                onSelectCustomer={(c) => { setSelectedCustomerId(c.id); setCurrentScreenId('detail'); }}
              />
            )}

            {currentScreenId === 'detail' && (
              <DetailScreen 
                customer={currentCustomer}
                onBack={() => setCurrentScreenId('tugas')}
                onStartVisit={handleStartVisit}
              />
            )}

            {currentScreenId === 'checkin' && (
              <CheckinScreen 
                customer={currentCustomer}
                onBack={() => setCurrentScreenId('detail')}
                onCheckInSuccess={handleCheckInSuccess}
              />
            )}

            {currentScreenId === 'checkout' && (
              <CheckoutScreen 
                customer={currentCustomer}
                onCancel={() => setCurrentScreenId('detail')}
                onCheckout={handleCheckOutSuccess}
              />
            )}

            {currentScreenId === 'history' && (
              <HistoryScreen 
                historyList={historyList}
              />
            )}

            {currentScreenId === 'profil' && (
              <ProfileScreen 
                profile={collectorProfile}
                onLogout={() => { setIsLoggedIn(false); setCurrentScreenId('login'); showToast('Anda telah logout dari aplikasi.'); }}
              />
            )}
          </PhoneFrame>

        </div>
      </main>
    </div>
  );
}
