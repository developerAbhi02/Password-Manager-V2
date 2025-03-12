import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';

import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';
import { useLanguage } from './context/LanguageContext';
import { ToastProvider, useToast } from './components/Toast';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import PasswordForm from './components/PasswordForm';
import PasswordList from './components/PasswordList';
import PasswordCheckup from './components/PasswordCheckup';
import Settings from './components/Settings';
import Sidebar from './components/Sidebar';
import Modal from './components/Modal';
import ConfirmDialog from './components/ConfirmDialog';

import { PasswordEntry } from './types';
import { fetchPasswords, createPassword as apiCreatePassword, updatePassword as apiUpdatePassword, deletePassword as apiDeletePassword } from './services/api';

function AppContent() {
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const [editingPassword, setEditingPassword] = useState<PasswordEntry | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [passwordToDelete, setPasswordToDelete] = useState<string | null>(null);
  const { user } = useAuth();
  const { t } = useLanguage();
  const { showToast } = useToast();

  // अप्लिकेशन लोड होने पर पासवर्ड लोड करें
  useEffect(() => {
    if (user) {
      loadPasswords();
    } else {
      setPasswords([]);
    }
  }, [user]);

  // बैकएंड से पासवर्ड लोड करें
  const loadPasswords = async () => {
    try {
      const data = await fetchPasswords();
      setPasswords(data);
    } catch (error) {
      console.error('पासवर्ड लोड करने में त्रुटि:', error);
      showToast('Failed to load passwords', 'error');
    }
  };

  // नया पासवर्ड जोड़ने का हैंडलर
  const handleAddPassword = async (passwordData: Omit<PasswordEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newPassword = await apiCreatePassword(passwordData);
      setPasswords(prev => [...prev, newPassword]);
      setIsFormOpen(false);
      showToast(t('passwordAdded'), 'success');
    } catch (error) {
      console.error('पासवर्ड जोड़ने में त्रुटि:', error);
      showToast('Failed to add password', 'error');
    }
  };

  // पासवर्ड अपडेट करने का हैंडलर
  const handleUpdatePassword = async (passwordData: Omit<PasswordEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingPassword) return;

    try {
      const updatedPasswordData = {
        ...passwordData,
        id: editingPassword.id,
        _id: editingPassword._id,
        createdAt: editingPassword.createdAt,
        updatedAt: Date.now()
      };

      const result = await apiUpdatePassword(updatedPasswordData);
      
      setPasswords(prev => 
        prev.map(p => p.id === result.id || p._id === result._id ? result : p)
      );
      
      setEditingPassword(null);
      setIsFormOpen(false);
      showToast(t('passwordUpdated'), 'success');
    } catch (error) {
      console.error('पासवर्ड अपडेट करने में त्रुटि:', error);
      showToast('Failed to update password', 'error');
    }
  };

  // पासवर्ड हटाने का हैंडलर
  const handleDeletePassword = async (id: string) => {
    console.log('Initiating delete process for ID:', id);
    setPasswordToDelete(id);
    setShowConfirmDialog(true);
  };

  // पासवर्ड हटाने की पुष्टि
  const confirmDeletePassword = async () => {
    if (!passwordToDelete) {
      console.error('No password ID to delete!');
      return;
    }
    
    try {
      console.log('Confirming deletion of password with ID:', passwordToDelete);
      
      // API कॉल से पहले पासवर्ड का अस्तित्व सुनिश्चित करें
      const passwordExists = passwords.some(p => 
        p.id === passwordToDelete || p._id === passwordToDelete
      );
      
      if (!passwordExists) {
        console.error('Password with ID does not exist in state:', passwordToDelete);
        showToast('Password not found', 'error');
        setShowConfirmDialog(false);
        setPasswordToDelete(null);
        return;
      }
      
      // पासवर्ड हटाएं
      const result = await apiDeletePassword(passwordToDelete);
      console.log('Delete API response:', result);
      
      // स्टेट अपडेट करें - immediate UI update
      setPasswords(prevPasswords => {
        // जिन पासवर्ड्स को रखना है उन्हें फिल्टर करें (हटाए जा रहे पासवर्ड को छोड़कर)
        return prevPasswords.filter(p => 
          (p.id !== passwordToDelete) && (p._id !== passwordToDelete)
        );
      });
      
      // सक्सेस मैसेज दिखाएं
      showToast(t('passwordDeleted'), 'success');
      console.log('Delete process completed successfully');
      
      // डायलॉग बंद करें और ID रीसेट करें
      setShowConfirmDialog(false);
      setPasswordToDelete(null);
      
      // पासवर्ड लिस्ट को रिफ्रेश करें
      loadPasswords();
      
    } catch (error) {
      console.error('पासवर्ड हटाने में त्रुटि:', error);
      showToast('Failed to delete password', 'error');
      // हमेशा डायलॉग को बंद करें और ID रीसेट करें, भले ही त्रुटि हो
      setShowConfirmDialog(false);
      setPasswordToDelete(null);
    }
  };

  // संपादन मोड शुरू करने का हैंडलर
  const handleEditPassword = (password: PasswordEntry) => {
    setEditingPassword(password);
    setIsFormOpen(true);
  };

  // फॉर्म बंद करने का हैंडलर
  const handleCancelForm = () => {
    setEditingPassword(null);
    setIsFormOpen(false);
  };

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  }

  // पासवर्ड लिस्ट कंपोनेंट
  const PasswordsView = () => (
    <div>
      <div className="page-header">
        <h1 className="page-title">{t('passwords')}</h1>
        <button 
          className="add-password-btn"
          onClick={() => setIsFormOpen(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          {t('addPassword')}
        </button>
      </div>
      <div className="fade-in">
        <PasswordList 
          passwords={passwords} 
          onEdit={handleEditPassword}
          onDelete={handleDeletePassword}
        />
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <Sidebar />
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<PasswordsView />} />
          <Route path="/checkup" element={<PasswordCheckup onEdit={handleEditPassword} />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        
        {/* पॉपअप मॉडल में पासवर्ड फॉर्म */}
        <Modal isOpen={isFormOpen} onClose={handleCancelForm}>
          <PasswordForm 
            initialData={editingPassword || undefined}
            onSubmit={editingPassword ? handleUpdatePassword : handleAddPassword}
            onCancel={handleCancelForm}
          />
        </Modal>

        {/* कन्फर्मेशन डायलॉग */}
        <ConfirmDialog 
          isOpen={showConfirmDialog}
          onClose={() => setShowConfirmDialog(false)}
          onConfirm={confirmDeletePassword}
          title={t('confirmDelete')}
          message={t('confirmDeleteMessage')}
        />

        <footer>
          <p>&copy; {new Date().getFullYear()} Pass-X - {t('securePasswords')}</p>
        </footer>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <ToastProvider>
              <div className="app-container">
                <Navbar />
                <div className="content-container">
                  <AppContent />
                </div>
              </div>
            </ToastProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
