"use client";

import { useMemo, useState } from "react";
import type { Service } from "@/lib/api";
import { formatServicePrice } from "@/lib/studio-data";
import { useBranch } from "@/components/branch/BranchProvider";

export function ServicesCatalogue({ catalog }: { catalog: Service[] }) {
    const { selectedBranchId } = useBranch();
    const [activeCategory, setActiveCategory] = useState("Tất cả");
    const services = useMemo(() => catalog.filter(s => s.branch_id === selectedBranchId), [catalog, selectedBranchId]);
    const categories = useMemo(() => ["Tất cả", ...new Set(services.map(s => s.category?.trim()).filter((s): s is string => Boolean(s)))], [services]);
    const visibleServices = activeCategory === "Tất cả" ? services : services.filter(s => s.category === activeCategory);
    return (
        <div>
            <div role="note" className="rounded-[22px] border-2 border-[#a47560] bg-[#f9ede4] px-5 py-5 text-[#623f33] sm:px-7 sm:py-6">
                <strong className="block text-base font-semibold leading-6 sm:text-lg">Giá chỉ mang tính chất tham khảo</strong>
                <p className="mt-1.5 text-sm leading-6 sm:text-[15px] sm:leading-7">Giá thực tế có thể cao hơn tùy theo tình trạng móng, độ phức tạp của mẫu, vật liệu và yêu cầu của khách.</p>
            </div>
            {categories.length > 1 ? (
                <div className="hide-scrollbar mt-7 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Nhóm dịch vụ">
                    {categories.map(category => (
                        <button key={category} type="button" onClick={() => setActiveCategory(category)} aria-pressed={activeCategory === category}
                            className={`focus-ring shrink-0 rounded-full px-4 py-2.5 text-xs transition-colors ${activeCategory === category ? "bg-ink font-semibold text-white" : "border border-line bg-surface text-ink hover:border-accent/50"}`}>
                            {category}
                        </button>
                    ))}
                </div>
            ) : null}
            {visibleServices.length ? (
                <div className="mt-7 min-w-0 rounded-[22px] border border-line bg-surface">
                    {visibleServices.map((service, index) => (
                        <article key={service.id} className={`flex min-w-0 flex-wrap items-center gap-4 px-[clamp(1.25rem,2.5vw,1.75rem)] py-5 ${index ? "border-t border-line" : ""}`}>
                            <div className="min-w-0 flex-[1_1_16rem]">
                                <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-accent">{service.category || "Dịch vụ"}</span>
                                <h2 className="mt-2 min-w-0 break-words font-serif text-[clamp(1.35rem,2.5vw,1.9rem)] leading-[1.3]">{service.name}</h2>
                                {service.description ? <p className="mt-2 whitespace-pre-line text-xs leading-5 text-muted">{service.description}</p> : null}
                            </div>
                            <div className="min-w-0 flex-[0_1_12rem] text-left sm:ml-auto sm:text-right">
                                <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">Giá tham khảo</p>
                                <p className="text-lg font-semibold tabular-nums">{formatServicePrice(service)}</p>
                                {service.price_max && service.price_min && service.price_max > service.price_min ? <p className="mt-1 text-[10px] text-muted">Giá tùy mẫu hoặc số lượng chi tiết</p> : null}
                            </div>
                        </article>
                    ))}
                </div>
            ) : <div className="mt-7 rounded-[18px] border border-line bg-surface px-6 py-10 text-center text-sm text-muted">Chưa có dịch vụ trong mục này.</div>}
        </div>
    );
}
