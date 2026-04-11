import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';

interface SuccessModalProps {
    onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose }) => {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-[#151519] border border-white/10 rounded-[20px] p-8 max-w-[400px] w-full shadow-2xl text-center"
            >
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="text-green-500" size={32} />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">Password Reset Successful</h3>
                <p className="text-white/60 mb-8">
                    Your password has been successfully reset. You can now log in with your new password.
                </p>
                
                <button 
                    onClick={() => navigate('/login')}
                    className="w-full bg-[#3457dc] hover:bg-[#2a46b1] text-white py-3 rounded-xl font-medium transition-all"
                >
                    Back to Login
                </button>
            </motion.div>
        </div>
    );
};

export default SuccessModal;
