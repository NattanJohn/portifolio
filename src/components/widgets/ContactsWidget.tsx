"use client";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin, Phone } from "lucide-react";

export default function ContactWidget() {
  const contacts = [
    {
      label: "EMAIL_SERVER",
      value: "nattanjhon123@gmail.com",
      link: "mailto:nattanjhon123@gmail.com",
      icon: <Mail size={16} />,
      color: "text-pink-500",
    },
    {
      label: "LINKEDIN_STATION",
      value: "linkedin.com/in/nattan-john",
      link: "https://www.linkedin.com/in/nattan-john",
      icon: <Linkedin size={16} />,
      color: "text-cyan-400",
    },
    {
      label: "GITHUB_NODE",
      value: "github.com/NattanJohn",
      link: "https://github.com/NattanJohn",
      icon: <Github size={16} />,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="space-y-6 font-mono italic">
      <div className="text-center space-y-2">
        <h3 className="text-pink-500 font-bold uppercase tracking-[0.3em] text-lg">
          {" > "} ESTABLISHING_CONNECTION
        </h3>
        <p className="text-[10px] text-cyan-500/60 animate-pulse">
          ENCRYPTING_CHANNEL_AES_256... READY.
        </p>
      </div>

      <div className="grid gap-4">
        {contacts.map((contact, idx) => (
          <motion.a
            key={idx}
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`flex items-center gap-4 p-3 border border-pink-500/20 bg-black/40 hover:bg-pink-500/5 hover:border-pink-500/60 transition-all group`}
          >
            <div className={`${contact.color} group-hover:scale-110 transition-transform`}>
              {contact.icon}
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] text-pink-500/50 uppercase font-bold">
                {contact.label}
              </span>
              <span className="text-xs text-cyan-100 group-hover:text-cyan-400 transition-colors">
                {contact.value}
              </span>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="mt-6 p-4 border-t border-pink-500/10 grid grid-cols-2 gap-2 text-[10px]">
        <div className="flex items-center gap-2 text-pink-500/70">
          <MapPin size={12} />
          <span>LOC: MATINHOS_PR</span>
        </div>
        <div className="flex items-center gap-2 text-pink-500/70">
          <Phone size={12} />
          <span>COMMS: +55 (41) 99771-8248</span>
        </div>
      </div>

      <div className="bg-cyan-500/5 p-3 border border-cyan-500/10 rounded-sm">
        <p className="text-[9px] text-cyan-400/80 leading-tight">
          NOTA: O sistema está operando em baixa latência. 
          Sinta-se à vontade para enviar um ping via e-mail para discussões de projeto ou colaboração.
        </p>
      </div>
    </div>
  );
}