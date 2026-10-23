"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Branch, SalonContent } from "@/lib/api";
import { branches, salonContents } from "@/data/catalog";

type BranchContextValue = {
    branches: Branch[];
    selectedBranchId: number | null;
    selectedBranch: Branch | null;
    loading: boolean;
    error: string;
    salonContent: SalonContent | null;
    contentLoading: boolean;
    contentError: string;
    setSelectedBranchId: (id: number) => void;
};
const BranchContext = createContext<BranchContextValue | null>(null);

export function BranchProvider({ children }: { children: ReactNode }) {
    const [selectedBranchId, setSelectedBranch] = useState<number | null>(branches[0]?.id ?? null);
    const selectedBranch = useMemo(() => branches.find(x => x.id === selectedBranchId) ?? null, [selectedBranchId]);
    const setSelectedBranchId = (id: number) => {
        if (branches.some(x => x.id === id)) setSelectedBranch(id);
    };
    return (
        <BranchContext.Provider value={{
            branches,
            selectedBranchId,
            selectedBranch,
            loading: false,
            error: "",
            salonContent: selectedBranchId === null ? null : salonContents[selectedBranchId] ?? null,
            contentLoading: false,
            contentError: "",
            setSelectedBranchId,
        }}>
            {children}
        </BranchContext.Provider>
    );
}

export function useBranch() {
    const context = useContext(BranchContext);
    if (!context) throw new Error("useBranch must be used within BranchProvider");
    return context;
}
