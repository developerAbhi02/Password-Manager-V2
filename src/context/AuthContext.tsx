import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

// API बेस URL
const API_URL = 'http://localhost:5002/api';

// उपयोगकर्ता टाइप
interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

// ऑथ कंटेक्स्ट टाइप
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// डिफॉल्ट मान के साथ कंटेक्स्ट बनाएं
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {}
});

// ऑथ कंटेक्स्ट प्रोवाइडर प्रॉप्स
interface AuthProviderProps {
  children: ReactNode;
}

// ऑथ कंटेक्स्ट प्रोवाइडर
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // पहले लोड पर, लोकल स्टोरेज से यूजर लोड करें
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // लॉगिन फंक्शन
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API_URL}/users/login`, { email, password });
      
      // यूजर और टोकन को लोकल स्टोरेज में सहेजें
      localStorage.setItem('user', JSON.stringify(response.data));
      
      // स्टेट अपडेट करें
      setUser(response.data);
      
      // Axios के लिए डिफॉल्ट हेडर सेट करें
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    } catch (err: any) {
      setError(err.response?.data?.message || 'लॉगिन में त्रुटि हुई');
      console.error('लॉगिन त्रुटि:', err);
    } finally {
      setLoading(false);
    }
  };

  // रजिस्टर फंक्शन
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API_URL}/users`, { name, email, password });
      
      // यूजर और टोकन को लोकल स्टोरेज में सहेजें
      localStorage.setItem('user', JSON.stringify(response.data));
      
      // स्टेट अपडेट करें
      setUser(response.data);
      
      // Axios के लिए डिफॉल्ट हेडर सेट करें
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    } catch (err: any) {
      setError(err.response?.data?.message || 'रजिस्ट्रेशन में त्रुटि हुई');
      console.error('रजिस्ट्रेशन त्रुटि:', err);
    } finally {
      setLoading(false);
    }
  };

  // लॉगआउट फंक्शन
  const logout = () => {
    // लोकल स्टोरेज से यूजर हटाएं
    localStorage.removeItem('user');
    
    // स्टेट क्लियर करें
    setUser(null);
    
    // Axios हेडर हटाएं
    delete axios.defaults.headers.common['Authorization'];
  };

  // Axios के लिए डिफॉल्ट हेडर सेट करें
  useEffect(() => {
    if (user && user.token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ऑथ कंटेक्स्ट का उपयोग करने के लिए हुक
export const useAuth = () => useContext(AuthContext); 