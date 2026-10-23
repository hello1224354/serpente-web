"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useBranch } from "@/components/branch/BranchProvider";
import { shortBranchName } from "@/lib/studio-data";

const navigation = [
    { href: "/", label: "Trang chủ" },
    { href: "/services", label: "Bảng giá" },
    { href: "https://booksalon.kiotviet.vn/serpentenailroom", label: "Đặt lịch" },
];

export function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { branches, selectedBranchId, setSelectedBranchId } = useBranch();
    return (
        <header className="sticky top-0 z-50 border-b border-line bg-cream/95 shadow-[0_1px_0_rgba(48,40,35,0.02)] backdrop-blur-md">
            <div className="site-shell flex h-[76px] items-center justify-between gap-4">
                <Link href="/" className="focus-ring flex items-center gap-3 rounded-md" onClick={() => setMobileOpen(false)}>
                    <Image src="/brand/serpente-logo.svg" alt="" width={36} height={36} className="size-9 shrink-0 object-contain" />
                    <span className="font-serif text-[22px] tracking-[-0.025em] sm:text-[25px]">Serpente Nail Room</span>
                </Link>
                <nav className="hidden items-center gap-9 text-[13px] xl:flex" aria-label="Điều hướng chính">
                    {navigation.map(item => (
                        <Link key={item.href} href={item.href} className="focus-ring font-medium transition-colors hover:text-accent">
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="hidden items-center gap-2 xl:flex">
                    {branches.length > 1 ? (
                        <select value={selectedBranchId ?? ""} aria-label="Chọn chi nhánh" onChange={e => setSelectedBranchId(Number(e.target.value))} className="h-9 rounded-full border border-line bg-surface px-3 text-xs">
                            {branches.map(b => <option key={b.id} value={b.id}>{shortBranchName(b.name)}</option>)}
                        </select>
                    ) : null}
                    <Link href="https://booksalon.kiotviet.vn/serpentenailroom" className="focus-ring flex h-9 min-w-[126px] items-center justify-center rounded-full bg-ink px-4 text-xs font-semibold text-white shadow-[0_6px_18px_rgba(45,39,35,0.12)] transition-transform hover:-translate-y-0.5">Đặt lịch ngay</Link>
                </div>
                <button type="button" aria-label={mobileOpen ? "Đóng menu" : "Mở menu"} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} className="focus-ring flex size-11 shrink-0 items-center justify-center rounded-full border border-line xl:hidden">
                    <span aria-hidden="true" className="text-xl">{mobileOpen ? "×" : "☰"}</span>
                </button>
            </div>
            {mobileOpen ? (
                <nav aria-label="Điều hướng di động" className="site-shell flex flex-col gap-2 border-t border-line pb-5 pt-4 xl:hidden">
                    {navigation.map(item => <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="focus-ring rounded-xl px-4 py-3 text-sm font-semibold hover:bg-tint">{item.label}</Link>)}
                    {branches.length > 1 ? (
                        <select value={selectedBranchId ?? ""} aria-label="Chọn chi nhánh" onChange={e => setSelectedBranchId(Number(e.target.value))} className="h-11 rounded-xl border border-line bg-surface px-4 text-sm">
                            {branches.map(b => <option key={b.id} value={b.id}>{shortBranchName(b.name)}</option>)}
                        </select>
                    ) : null}
                </nav>
            ) : null}
        </header>
    );
}
