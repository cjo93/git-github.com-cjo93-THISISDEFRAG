
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-24 px-6 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="space-y-6">
          <div className="text-2xl font-black font-mono">DEFRAG.</div>
          <p className="text-zinc-500 text-xs font-mono max-w-xs leading-relaxed uppercase tracking-tighter">
            Operating manuals for difficult humans. <br/>
            Engineered for clarity. Built for peace.
          </p>
          <div className="flex gap-4">
            <div className="w-8 h-8 border border-white/10 rounded-full flex items-center justify-center hover:border-orange-600 transition-colors cursor-pointer">
              <span className="text-[10px] font-mono">X</span>
            </div>
            <div className="w-8 h-8 border border-white/10 rounded-full flex items-center justify-center hover:border-orange-600 transition-colors cursor-pointer">
              <span className="text-[10px] font-mono">IG</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono uppercase text-white/40">Product</h4>
            <ul className="space-y-2 text-xs font-mono text-zinc-400 uppercase">
              <li className="hover:text-orange-600 cursor-pointer">Generate Manual</li>
              <li className="hover:text-orange-600 cursor-pointer">Pricing</li>
              <li className="hover:text-orange-600 cursor-pointer">Corporate Licensing</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono uppercase text-white/40">Legal</h4>
            <ul className="space-y-2 text-xs font-mono text-zinc-400 uppercase">
              <li className="hover:text-orange-600 cursor-pointer">Privacy Protocol</li>
              <li className="hover:text-orange-600 cursor-pointer">Terms of Service</li>
              <li className="hover:text-orange-600 cursor-pointer">Encryption Standards</li>
            </ul>
          </div>
          <div className="space-y-4 col-span-2 md:col-span-1">
            <h4 className="text-[10px] font-mono uppercase text-white/40">Newsletter</h4>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="EMAIL@DOMAIN" 
                className="bg-zinc-900 border border-white/10 px-4 py-2 text-xs font-mono w-full focus:outline-none focus:border-orange-600"
              />
              <button className="bg-orange-600 px-4 py-2 text-[10px] font-black uppercase">JOIN</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex justify-between items-center text-[8px] font-mono text-zinc-700 uppercase tracking-[0.2em]">
        <div>© 2024 DEFRAG HUMAN SYSTEMS LLC.</div>
        <div>ALL TRANSMISSIONS ENCRYPTED.</div>
      </div>
    </footer>
  );
};
