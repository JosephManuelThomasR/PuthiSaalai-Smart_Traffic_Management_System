import React from "react";
import { cn } from "@/lib/utils";

interface FooterProps {
  copyrightText?: string;
  developerText?: string;
  contactInfo?: string;
  className?: string;
}

const Footer = ({
  copyrightText = "Tuticorin Traffic Control © 2025",
  developerText = "Developed for Cyber Hackathon",
  contactInfo = "Contact: support@tuticorinpolice.gov.in",
  className,
}: FooterProps) => {
  return (
    <footer
      className={cn(
        "h-[50px] bg-slate-900 text-slate-200 flex items-center justify-between px-6 text-sm border-t border-slate-800 z-10",
        className,
      )}
    >
      <div className="text-slate-400">{developerText}</div>
      <div className="font-medium">{copyrightText}</div>
      <div className="text-slate-400">{contactInfo}</div>
    </footer>
  );
};

export default Footer;
