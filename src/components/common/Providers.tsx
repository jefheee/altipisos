"use client";

import React from "react";
import { I18nProvider } from "@/lib/i18n";

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <I18nProvider>{children}</I18nProvider>;
};
