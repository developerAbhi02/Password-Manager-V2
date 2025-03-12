import axios from 'axios';
import { PasswordEntry } from '../types';

const API_URL = 'http://localhost:5002/api';

// किसी भी अनुरोध के लिए टोकन सेट करने वाला इंटरसेप्टर जोड़ें
axios.interceptors.request.use(
  (config) => {
    const userJSON = localStorage.getItem('user');
    if (userJSON) {
      const user = JSON.parse(userJSON);
      if (user && user.token) {
        config.headers['Authorization'] = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// पासवर्ड एंट्री के लिए API कॉल

/**
 * उपयोगकर्ता के सभी पासवर्ड प्राप्त करें
 */
export const fetchPasswords = async (): Promise<PasswordEntry[]> => {
  try {
    const response = await axios.get(`${API_URL}/passwords`);
    return response.data;
  } catch (error) {
    console.error('पासवर्ड प्राप्त करने में त्रुटि:', error);
    throw error;
  }
};

/**
 * नया पासवर्ड बनाएं
 */
export const createPassword = async (passwordData: Omit<PasswordEntry, 'id' | 'createdAt' | 'updatedAt' | 'user'>): Promise<PasswordEntry> => {
  try {
    const response = await axios.post(`${API_URL}/passwords`, passwordData);
    return response.data;
  } catch (error) {
    console.error('पासवर्ड बनाने में त्रुटि:', error);
    throw error;
  }
};

/**
 * मौजूदा पासवर्ड अपडेट करें
 */
export const updatePassword = async (passwordData: PasswordEntry): Promise<PasswordEntry> => {
  try {
    const response = await axios.put(`${API_URL}/passwords/${passwordData._id || passwordData.id}`, passwordData);
    return response.data;
  } catch (error) {
    console.error('पासवर्ड अपडेट करने में त्रुटि:', error);
    throw error;
  }
};

/**
 * पासवर्ड हटाएं
 */
export const deletePassword = async (id: string): Promise<{ message: string }> => {
  try {
    console.log(`API Calling - DELETE password with ID: ${id}`);
    
    // ID में पूरा URL पथ सुनिश्चित करें
    // यदि ID में पहले से प्रश्न चिह्न या विशेष वर्ण हैं, तो उन्हें एनकोड करें
    const cleanId = id.replace(/[^a-zA-Z0-9]/g, '');
    console.log(`Clean ID for API request: ${cleanId}`);
    
    console.log(`Request URL: ${API_URL}/passwords/${cleanId}`);
    
    const response = await axios.delete(`${API_URL}/passwords/${cleanId}`);
    
    console.log('Delete API Response:', response);
    console.log('Delete API Response Status:', response.status);
    console.log('Delete API Response Data:', response.data);
    
    return response.data;
  } catch (error: any) {
    console.error('पासवर्ड हटाने में त्रुटि (विस्तृत):', error);
    console.error('त्रुटि अनुरोध:', error.request);
    console.error('त्रुटि प्रतिक्रिया:', error.response?.data);
    throw error;
  }
}; 