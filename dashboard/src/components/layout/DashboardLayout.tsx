import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface DashboardLayoutProps {
  children?: ReactNode;
  title?: string;
  searchValue?: string;
  onSearch?: (value: string) => void;
}

const DashboardLayout = ({
  children,
  title,
  searchValue = "",
  onSearch = () => {},
}: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen w-full bg-slate-950 text-white overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <Header title={title} searchValue={searchValue} onSearch={onSearch} />
        <main className="flex-1 overflow-auto p-4 pb-6">
          {children || <Outlet />}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
