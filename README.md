# पासवर्ड मैनेजर

यह एक सरल पासवर्ड मैनेजर वेब एप्लिकेशन है जो आपके पासवर्ड को सुरक्षित रूप से संग्रहित करने में मदद करता है। इसे React, TypeScript और Vite का उपयोग करके बनाया गया है।

## विशेषताएँ

- पासवर्ड सुरक्षित रूप से संग्रहित करें (AES एन्क्रिप्शन का उपयोग करके)
- पासवर्ड जोड़ें, संपादित करें और हटाएं
- पासवर्ड जनरेटर टूल
- श्रेणी और खोज द्वारा पासवर्ड फ़िल्टर करें
- पासवर्ड के लिए अतिरिक्त जानकारी जैसे URL, नोट्स और श्रेणी संग्रहित करें
- मोबाइल-अनुकूल डिज़ाइन

## स्थापना और उपयोग

इस प्रोजेक्ट को चलाने के लिए, आपको अपने सिस्टम पर Node.js और npm इंस्टॉल होना चाहिए।

1. प्रोजेक्ट को क्लोन या डाउनलोड करें:
```
git clone https://github.com/yourusername/pass-x.git
cd pass-x
```

2. आवश्यक पैकेज इंस्टॉल करें:
```
npm install
```

3. डेवलपमेंट सर्वर शुरू करें:
```
npm run dev
```

4. अपने ब्राउज़र में http://localhost:5173 पर जाएँ (या वह पोर्ट जो Vite आपको बताता है)

## बिल्ड करें

प्रोडक्शन के लिए ऐप का बिल्ड करने के लिए:

```
npm run build
```

आप अपने बिल्ड को `dist` डायरेक्टरी में पा सकते हैं।

## सुरक्षा नोट

इस ऐप में, हम पासवर्ड को लोकल स्टोरेज में एन्क्रिप्ट करके संग्रहित करते हैं। जबकि एन्क्रिप्शन सुरक्षा प्रदान करता है, कृपया ध्यान दें कि यह एक शैक्षिक या व्यक्तिगत उपयोग के लिए ऐप है और इसका उपयोग महत्वपूर्ण या संवेदनशील पासवर्ड के लिए वाणिज्यिक या उच्च-सुरक्षा वातावरण में नहीं किया जाना चाहिए।

वास्तविक उपयोग के लिए, आप निम्न सुधार कर सकते हैं:
- सर्वर-साइड एन्क्रिप्शन के साथ बैकएंड एपीआई जोड़ें
- मास्टर पासवर्ड प्रोटेक्शन जोड़ें
- दो-फैक्टर प्रमाणीकरण जोड़ें
- सुरक्षित और अधिक जटिल एन्क्रिप्शन रणनीतियों का उपयोग करें

## टेक्नोलॉजी

- React
- TypeScript
- Vite
- CryptoJS (एन्क्रिप्शन के लिए)
- UUID (यूनिक ID जनरेशन के लिए)

## लाइसेंस

ISC

<think>I need to create a comprehensive README.md file for the Pass-X password manager application in both Hindi and English. The user wants me to include all screenshots, but since I don't have access to actual screenshots from their application, I'll need to create placeholders and instructions for where to add screenshots.

The existing README.md seems to be quite basic, so I'll create a more detailed version that showcases all the features of the application that I've learned about from our previous conversations, including:

1. The Indian flag-inspired theme
2. AES-256 encryption
3. Password checkup
4. Day/Night mode
5. Multilingual support (Hindi and English)
6. Password generation
7. Categories management
8. The enhanced logo and UI elements we've worked on

I'll structure the README with proper sections:
- Description/Introduction
- Key features
- Screenshots (with placeholders)
- Installation and setup
- Technologies used
- Usage guide
- Security notes
- Contributors
- License

Since they want it in both Hindi and English, I'll provide each section in both languages.</think># Pass-X: सुरक्षित पासवर्ड मैनेजर / Secure Password Manager

<div align="center">
  <img src="screenshots/pass-x-logo.png" alt="Pass-X Logo" width="150"/>
  <p><i>यहां Pass-X लोगो का स्क्रीनशॉट रखें / Place screenshot of Pass-X logo here</i></p>
</div>

## 📝 विवरण / Description

**हिंदी:**
Pass-X एक सुरक्षित और उपयोगकर्ता-मित्र पासवर्ड मैनेजर है जो आपके सभी ऑनलाइन खातों के लिए पासवर्ड सुरक्षित रूप से स्टोर करता है। यह AES-256 एन्क्रिप्शन का उपयोग करके आपके पासवर्ड को सुरक्षित रखता है और भारतीय ध्वज के रंगों से प्रेरित अनोखे डिज़ाइन के साथ आता है। दिन और रात मोड के साथ, यह आपकी आंखों पर कम दबाव डालता है और अंग्रेजी और हिंदी दोनों में उपलब्ध है।

**English:**
Pass-X is a secure and user-friendly password manager that safely stores passwords for all your online accounts. It uses AES-256 encryption to keep your passwords secure and comes with a unique design inspired by the colors of the Indian flag. With day and night modes, it puts less strain on your eyes and is available in both English and Hindi.

## ✨ मुख्य विशेषताएं / Key Features

**हिंदी:**
- **सुरक्षित पासवर्ड भंडारण**: AES-256 एन्क्रिप्शन के साथ अल्ट्रा-सिक्योर स्टोरेज
- **पासवर्ड चेकअप**: कमजोर, दोहराए गए और समझौता किए गए पासवर्डों का पता लगाना
- **पासवर्ड जनरेटर**: मजबूत और अद्वितीय पासवर्ड बनाना
- **श्रेणी प्रबंधन**: पासवर्डों को विभिन्न श्रेणियों में व्यवस्थित करना
  - व्यापार, व्यापार ईमेल, मनोरंजन, वित्त, गेम्स, समाचार, शॉपिंग, सोशल मीडिया, खेल, तकनीक, यात्रा, उपयोगिताएँ, और अन्य
- **दिन और रात मोड**: उपयोगकर्ता के अनुकूल इंटरफेस के लिए हल्के और गहरे थीम
- **बहुभाषा समर्थन**: अंग्रेजी और हिंदी भाषाओं में उपलब्ध
- **मोबाइल-अनुकूल डिज़ाइन**: सभी डिवाइसों पर अच्छी तरह से काम करता है

**English:**
- **Secure Password Storage**: Ultra-secure storage with AES-256 encryption
- **Password Checkup**: Detection of weak, reused, and compromised passwords
- **Password Generator**: Creation of strong and unique passwords
- **Category Management**: Organization of passwords into various categories
  - Business, Business Email, Entertainment, Finance, Games, News, Shopping, Social Media, Sports, Tech, Travel, Utilities, and Other
- **Day and Night Mode**: Light and dark themes for user-friendly interface
- **Multilingual Support**: Available in English and Hindi languages
- **Mobile-Friendly Design**: Works well on all devices

## 🖼️ स्क्रीनशॉट / Screenshots

### लॉगिन पेज / Login Page
<div align="center">
  <img src="screenshots/login.png" alt="Login Page" width="600"/>
  <p><i>यहां लॉगिन पेज का स्क्रीनशॉट रखें / Place screenshot of login page here</i></p>
</div>

### रजिस्टर पेज / Register Page
<div align="center">
  <img src="screenshots/register.png" alt="Register Page" width="600"/>
  <p><i>यहां रजिस्टर पेज का स्क्रीनशॉट रखें / Place screenshot of register page here</i></p>
</div>

### पासवर्ड डैशबोर्ड / Password Dashboard
<div align="center">
  <img src="screenshots/dashboard.png" alt="Password Dashboard" width="600"/>
  <p><i>यहां पासवर्ड डैशबोर्ड का स्क्रीनशॉट रखें / Place screenshot of password dashboard here</i></p>
</div>

### पासवर्ड जोड़ना / Adding Password
<div align="center">
  <img src="screenshots/add_password.png" alt="Add Password" width="600"/>
  <p><i>यहां पासवर्ड जोड़ने के फॉर्म का स्क्रीनशॉट रखें / Place screenshot of add password form here</i></p>
</div>

### पासवर्ड चेकअप / Password Checkup
<div align="center">
  <img src="screenshots/password_checkup.png" alt="Password Checkup" width="600"/>
  <p><i>यहां पासवर्ड चेकअप का स्क्रीनशॉट रखें / Place screenshot of password checkup here</i></p>
</div>

### डार्क मोड / Dark Mode
<div align="center">
  <img src="screenshots/dark_mode.png" alt="Dark Mode" width="600"/>
  <p><i>यहां डार्क मोड का स्क्रीनशॉट रखें / Place screenshot of dark mode here</i></p>
</div>

### हिंदी भाषा / Hindi Language
<div align="center">
  <img src="screenshots/hindi_language.png" alt="Hindi Language" width="600"/>
  <p><i>यहां हिंदी भाषा का स्क्रीनशॉट रखें / Place screenshot of Hindi language here</i></p>
</div>

## 🚀 स्थापना और सेटअप / Installation and Setup

**हिंदी:**
### आवश्यकताएँ:
- Node.js (v14 या उससे ऊपर)
- npm (v6 या उससे ऊपर)
- MongoDB

### स्थापना के चरण:
1. इस रिपॉजिटरी को क्लोन करें:
   ```
   git clone https://github.com/yourusername/pass-x.git
   cd pass-x
   ```

2. फ्रंटएंड निर्भरताओं को इंस्टॉल करें:
   ```
   cd password-manager
   npm install
   ```

3. बैकएंड निर्भरताओं को इंस्टॉल करें:
   ```
   cd ../server
   npm install
   ```

4. बैकएंड में `.env` फ़ाइल बनाएं और अपने MongoDB कनेक्शन स्ट्रिंग और JWT सीक्रेट को सेट करें:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5002
   ```

5. सर्वर शुरू करें:
   ```
   npm run dev
   ```

6. फ्रंटएंड शुरू करें:
   ```
   cd ../password-manager
   npm run dev
   ```

7. अपने ब्राउज़र में `http://localhost:5173` (या जो भी पोर्ट आपके वाइट सर्वर द्वारा असाइन किया गया है) पर जाएं।

**English:**
### Requirements:
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB

### Installation Steps:
1. Clone this repository:
   ```
   git clone https://github.com/yourusername/pass-x.git
   cd pass-x
   ```

2. Install frontend dependencies:
   ```
   cd password-manager
   npm install
   ```

3. Install backend dependencies:
   ```
   cd ../server
   npm install
   ```

4. Create a `.env` file in the backend and set your MongoDB connection string and JWT secret:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=5002
   ```

5. Start the server:
   ```
   npm run dev
   ```

6. Start the frontend:
   ```
   cd ../password-manager
   npm run dev
   ```

7. Navigate to `http://localhost:5173` (or whatever port your Vite server assigns) in your browser.

## 🛠️ प्रौद्योगिकियां / Technologies Used

**हिंदी:**
- **फ्रंटएंड**:
  - React
  - TypeScript
  - Vite
  - React Router
  - Context API (स्टेट मैनेजमेंट)
  - CSS (कस्टम स्टाइलिंग)
  - React Icons

- **बैकएंड**:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT प्रमाणीकरण

- **सुरक्षा**:
  - AES-256 एन्क्रिप्शन
  - JWT टोकन
  - सुरक्षित HTTP कुकीज़

**English:**
- **Frontend**:
  - React
  - TypeScript
  - Vite
  - React Router
  - Context API (state management)
  - CSS (custom styling)
  - React Icons

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
  - JWT Authentication

- **Security**:
  - AES-256 Encryption
  - JWT Tokens
  - Secure HTTP Cookies

## 📱 उपयोग गाइड / Usage Guide

**हिंदी:**
1. **रजिस्टर/लॉगिन**: नया खाता बनाएं या अपने मौजूदा खाते में लॉगिन करें।
2. **पासवर्ड जोड़ें**: "पासवर्ड जोड़ें" बटन पर क्लिक करें और अपने पासवर्ड विवरण भरें:
   - वेबसाइट URL
   - उपयोगकर्ता नाम
   - शीर्षक
   - पासवर्ड
   - श्रेणी
   - नोट्स (वैकल्पिक)
3. **पासवर्ड खोजें**: खोज बार का उपयोग करके अपने पासवर्ड खोजें या श्रेणी फ़िल्टर का उपयोग करें।
4. **पासवर्ड प्रबंधित करें**: मौजूदा पासवर्डों को संपादित या हटा सकते हैं।
5. **पासवर्ड चेकअप**: पासवर्ड चेकअप फीचर का उपयोग करके अपने पासवर्डों की सुरक्षा की जांच करें। यह:
   - कमजोर पासवर्डों को हाइलाइट करता है
   - दोहराए गए पासवर्डों को हाइलाइट करता है
   - समझौता किए गए पासवर्डों को हाइलाइट करता है
6. **पासवर्ड जनरेट करें**: मजबूत और अद्वितीय पासवर्ड उत्पन्न करने के लिए पासवर्ड जनरेटर का उपयोग करें।
7. **थीम बदलें**: लाइट और डार्क मोड के बीच स्विच करें।
8. **भाषा बदलें**: अंग्रेजी और हिंदी के बीच स्विच करें।

**English:**
1. **Register/Login**: Create a new account or login to your existing account.
2. **Add Password**: Click on the "Add Password" button and fill in your password details:
   - Website URL
   - Username
   - Title
   - Password
   - Category
   - Notes (optional)
3. **Search Passwords**: Use the search bar to find your passwords or use category filters.
4. **Manage Passwords**: Edit or delete existing passwords.
5. **Password Checkup**: Use the password checkup feature to check the security of your passwords. It:
   - Highlights weak passwords
   - Highlights reused passwords
   - Highlights compromised passwords
6. **Generate Passwords**: Use the password generator to create strong and unique passwords.
7. **Change Theme**: Switch between light and dark mode.
8. **Change Language**: Switch between English and Hindi.

## 🔒 सुरक्षा विशेषताएं / Security Features

**हिंदी:**
- सभी पासवर्ड AES-256 एन्क्रिप्शन का उपयोग करके स्टोर किए जाते हैं।
- सर्वर पर कोई पासवर्ड प्लेनटेक्स्ट में नहीं रखा जाता है।
- सत्र प्रबंधन के लिए सुरक्षित HTTPOnly कुकीज़ का उपयोग किया जाता है।
- पासवर्ड की ताकत मीटर उपयोगकर्ताओं को मजबूत पासवर्ड बनाने में मदद करता है।
- नियमित पासवर्ड चेकअप संभावित सुरक्षा खतरों से अलर्ट करता है।
- विश्वसनीय कनेक्शन को सुनिश्चित करने के लिए HTTPS का उपयोग करें।

**English:**
- All passwords are stored using AES-256 encryption.
- No passwords are kept in plaintext on the server.
- Secure HTTPOnly cookies are used for session management.
- Password strength meter helps users create strong passwords.
- Regular password checkup alerts of potential security threats.
- Use HTTPS to ensure secure connections.

## 👥 योगदानकर्ता / Contributors

**हिंदी:**
- [आपका नाम] - प्रमुख डेवलपर और प्रोजेक्ट मालिक
- अन्य योगदानकर्ताओं के नाम जोड़ें, यदि कोई हों

**English:**
- [Your Name] - Lead Developer and Project Owner
- Add names of other contributors, if any

## 📄 लाइसेंस / License

**हिंदी:**
इस प्रोजेक्ट को ISC लाइसेंस के तहत लाइसेंस प्राप्त है। अधिक जानकारी के लिए [LICENSE](LICENSE) फ़ाइल देखें।

**English:**
This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for more information.

---

<div align="center">

**हिंदी:**
Pass-X बनाने का उद्देश्य एक सुरक्षित, उपयोगकर्ता-मित्र और भारतीय संवेदनाओं से प्रेरित पासवर्ड मैनेजर बनाना है। हम आशा करते हैं कि आप इसका उपयोग करके अपने डिजिटल जीवन को अधिक सुरक्षित बनाएंगे!

**English:**
Pass-X was created with the goal of building a secure, user-friendly password manager inspired by Indian sensibilities. We hope you'll use it to make your digital life more secure!

</div>

