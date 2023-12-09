import {  createContext } from "react";
import { ContextType } from "@/types/context/main";

export const mainContext = createContext<ContextType | null>(null);