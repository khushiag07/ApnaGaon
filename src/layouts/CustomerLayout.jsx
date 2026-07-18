import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Sidebar from "../components/customer/Sidebar";
import TopBar from "../components/customer/TopBar";
import BottomNav from "../components/customer/BottomNav";
import PageTransition from "../components/ui/PageTransition";
import { ToastStack } from "../components/ui/Primitives";

export default function CustomerLayout() {
  const location = useLocation();

  // Auth State
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex bg-surface dark:bg-surfaceDark">
      <Sidebar />

      <div className="flex-1 min-w-0 flex flex-col">

        <TopBar
          onLogin={() => {
            setIsLogin(true);
            setShowAuth(true);
          }}
          onSignup={() => {
            setIsLogin(false);
            setShowAuth(true);
          }}
        />

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

      {/* AUTH MODAL */}
      {showAuth && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowAuth(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-[95%] max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl grid md:grid-cols-2"
          >
            {/* Left */}
            <div className="p-10">
              <button
                className="float-right text-2xl"
                onClick={() => setShowAuth(false)}
              >
                ✕
              </button>

              <h1 className="mt-8 text-4xl font-bold">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>

              <p className="mt-2 mb-8 text-gray-500">
                {isLogin
                  ? "Login to continue shopping."
                  : "Join Apna Gaon today."}
              </p>

              {!isLogin && (
                <input
                  placeholder="Full Name"
                  className="mb-4 w-full rounded-xl border p-4"
                />
              )}

              <input
                placeholder="Email"
                className="mb-4 w-full rounded-xl border p-4"
              />

              <input
                type="password"
                placeholder="Password"
                className="mb-4 w-full rounded-xl border p-4"
              />

              {!isLogin && (
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="mb-4 w-full rounded-xl border p-4"
                />
              )}

              <button className="w-full rounded-xl bg-green-700 py-4 font-semibold text-white">
                {isLogin ? "Login" : "Create Account"}
              </button>

              <p className="mt-6 text-center">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}

                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-green-700 font-semibold"
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>
            </div>

            {/* Right */}
            <div className="hidden md:block">
              <img
                src={
                  isLogin
                    ? "/login.png"
                    : "/signup.png"
                }
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}