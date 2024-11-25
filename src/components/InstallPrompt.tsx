import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowPrompt(false);
    }
  };

  if (!showPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 netflix-card p-4 z-50"
      >
        <button
          onClick={() => setShowPrompt(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>
        
        <div className="flex items-start space-x-4">
          <img
            src="/icon-192.png"
            alt="App Icon"
            className="w-12 h-12 rounded-xl"
          />
          <div className="flex-1">
            <h3 className="text-white font-medium">Install House Fellowship App</h3>
            <p className="text-sm text-gray-300 mt-1">
              Add to your home screen for quick access
            </p>
            <button
              onClick={handleInstall}
              className="netflix-button mt-3 text-sm py-1.5"
            >
              Install Now
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}