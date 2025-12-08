
import React, { useState } from 'react';
import { ChevronDown, LogOut, User, Shield, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { SmartButton } from './ui/button/SmartButton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AccountSwitcherProps {
  currentAccount: 'citizen' | 'police';
}

const AccountSwitcher: React.FC<AccountSwitcherProps> = ({ currentAccount }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleAccountSwitch = (accountType: 'citizen' | 'police') => {
    if (accountType !== currentAccount) {
      toast.info(`Switching to ${accountType} account...`);
      navigate(`/${accountType}`);
    }
    setIsOpen(false);
  };

  const handleLogout = () => {
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <SmartButton 
          variant="glass" 
          size="sm" 
          className="flex items-center gap-2 bg-white/70 backdrop-blur-sm text-sm"
        >
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            {currentAccount === 'citizen' ? (
              <User className="w-3 h-3 text-white" />
            ) : (
              <Shield className="w-3 h-3 text-white" />
            )}
          </div>
          <span className="hidden sm:inline capitalize">{currentAccount} Account</span>
          <ChevronDown className="w-4 h-4" />
        </SmartButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 animate-in slide-in-from-top-1">
        <DropdownMenuLabel>Your Accounts</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className={`flex items-center gap-2 cursor-pointer ${currentAccount === 'citizen' ? 'bg-accent' : ''}`}
          onClick={() => handleAccountSwitch('citizen')}
        >
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm">Citizen Account</span>
            <span className="text-xs text-muted-foreground">Traffic updates & alerts</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={`flex items-center gap-2 cursor-pointer ${currentAccount === 'police' ? 'bg-accent' : ''}`}
          onClick={() => handleAccountSwitch('police')}
        >
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm">Police Account</span>
            <span className="text-xs text-muted-foreground">Traffic management</span>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            toast.info('Create new account feature coming soon');
            setIsOpen(false);
          }}
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Account</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          className="flex items-center gap-2 cursor-pointer text-destructive"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountSwitcher;
