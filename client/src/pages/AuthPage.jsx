/*import React, { useState } from 'react';
import { register, login } from '../services/authService';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Leaf, ArrowRight } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  

  return (
    <div className="auth-container">
      
      <div className="auth-visual">
        <div className="visual-overlay">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Leaf className="visual-logo" size={48} />
            <h1>{isLogin ? "Welcome Back" : "Start Your Journey"}</h1>
            <p>Experience the whispers of the wild and the calm of the canopy.</p>
          </motion.div>
        </div>
      </div>

      
      <div className="auth-form-side">
        <div className="form-wrapper">
          <div className="form-header">
            <h2>{isLogin ? "Sign In" : "Create Account"}</h2>
            <p>{isLogin ? "Enter your details to access your bookings" : "Join our community of eco-travelers"}</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="input-group"
                >
                  <User className="input-icon" size={18} />
                  <input type="text" placeholder="Full Name" required />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="input-group">
              <Mail className="input-icon" size={18} />
              <input type="email" placeholder="Email Address" required />
            </div>

            <div className="input-group">
              <Lock className="input-icon" size={18} />
              <input type="password" placeholder="Password" required />
            </div>

            <button type="submit" className="btn-prm auth-submit">
              {isLogin ? "Sign In" : "Register"} <ArrowRight size={18} />
            </button>
          </form>

          <div className="form-footer">
            <span>
              {isLogin ? "Don't have an account?" : "Already a member?"}
            </span>
            <button onClick={() => setIsLogin(!isLogin)} className="toggle-auth">
              {isLogin ? "Create Account" : "Sign In Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;*/

import React, { useState } from 'react';
import { register, login } from '../services/authService'; //
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Leaf, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; //

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  // State hooks to capture input values
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const navigate = useNavigate(); //

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isLogin) {
        // Sends email and password to backend login route
        response = await login({ email, password });
      } else {
        // Sends name, email, and password to backend register route
        response = await register({ name, email, password });
      }
      
      // Displays the "Connection Successful" message from your backend
      alert(response.message || "Success!");
      navigate('/'); 
    } catch (err) {
      alert(err.response?.data?.message || "Backend connection failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-visual">
        <div className="visual-overlay">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Leaf className="visual-logo" size={48} />
            <h1>{isLogin ? "Welcome Back" : "Start Your Journey"}</h1>
            <p>Experience the whispers of the wild and the calm of the canopy.</p>
          </motion.div>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="form-wrapper">
          <div className="form-header">
            <h2>{isLogin ? "Sign In" : "Create Account"}</h2>
            <p>{isLogin ? "Enter your details" : "Join our community"}</p>
          </div>

          {/* Attach the handleAuth function to the form */}
          <form onSubmit={handleAuth}> 
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="input-group"
                >
                  <User className="input-icon" size={18} />
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="input-group">
              <Mail className="input-icon" size={18} />
              <input 
                type="email" 
                placeholder="Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="input-group">
              <Lock className="input-icon" size={18} />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>

            <button type="submit" className="btn-prm auth-submit">
              {isLogin ? "Sign In" : "Register"} <ArrowRight size={18} />
            </button>
          </form>

          <div className="form-footer">
            <span>{isLogin ? "Don't have an account?" : "Already a member?"}</span>
            <button onClick={() => setIsLogin(!isLogin)} className="toggle-auth">
              {isLogin ? "Create Account" : "Sign In Now"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;