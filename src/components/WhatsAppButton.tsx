import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function WhatsAppButton() {
  const waLink = "https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20dengan%20Collector%20Recall";

  return (
    <motion.div
      id="whatsapp-floating-container"
      initial={{ scale: 0, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 20 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <a
        id="whatsapp-floating-link"
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer focus:outline-none focus:ring-4 focus:ring-emerald-200"
      >
        {/* Pulsating Ring */}
        <span className="absolute -inset-0.5 rounded-full bg-emerald-400 opacity-20 group-hover:opacity-30 animate-ping" />
        
        <MessageCircle className="h-6 w-6 fill-current relative" />
        <span className="text-sm font-bold tracking-wide relative">Konsultasi WA</span>
      </a>
    </motion.div>
  );
}
