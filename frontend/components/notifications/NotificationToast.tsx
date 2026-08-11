"use client";

import { useEffect, useState } from "react";
import { Sparkles, X, Radio } from "lucide-react";

interface NotificationToastProps {
  message: string;
  onClose: () => void;
}

export default function NotificationToast({ message, onClose }: NotificationToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-blue-500/40 p-4 rounded-2xl shadow-2xl flex items-center space-x-3 text-sm text-white animate-bounce">
      <div className="bg-blue-500/20 p-2 rounded-xl text-blue-400">
        <Radio className="w-5 h-5 animate-pulse" />
      </div>
      <div>
        <h5 className="font-bold text-blue-400 text-xs uppercase tracking-wider">Real-Time WebSockets Event</h5>
        <p className="text-xs text-slate-200 mt-0.5">{message}</p>
      </div>
      <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
