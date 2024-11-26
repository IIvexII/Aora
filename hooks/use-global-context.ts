import { useContext } from "react";
import { GlobalContext } from "@/context/global-provider";

export const useGlobalContext = () => useContext(GlobalContext);
