"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { supabase } from "../../../utils/supabaseClient";

type AuthContextType = {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // 初回マウント時にセッションをチェック
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setLoggedIn(!!data.session); // セッションがある場合にログイン状態をtrueに設定
    };

    checkSession();

    // セッション変更を監視
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setLoggedIn(!!session); // セッションがある場合はtrue、ない場合はfalse
    });

    return () => {
      subscription?.unsubscribe(); // コンポーネントのアンマウント時にリスナーを解除
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
