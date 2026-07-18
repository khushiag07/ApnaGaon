import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Sidebar from "../components/customer/Sidebar";
import TopBar from "../components/customer/TopBar";
import BottomNav from "../components/customer/BottomNav";
import PageTransition from "../components/ui/PageTransition";
import { ToastStack } from "../components/ui/Primitives";

export default function CustomerLayout() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex bg-surface dark:bg-surfaceDark">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar />
        <main className="flex-1 pb-24 md:pb-10">
          <AnimatePresence mode="wait">
            <PageTransition key={location.pathname}>
              <Outlet />
            </PageTransition>
          </AnimatePresence>
        </main>
      </div>
      <BottomNav />
      <ToastStack />
    </div>
  );
}
