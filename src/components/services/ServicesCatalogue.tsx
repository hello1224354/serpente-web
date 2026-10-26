"use client";

import { useMemo, useState } from "react";
import type { Service } from "@/lib/api";
import { formatServicePrice } from "@/lib/studio-data";
import { useBranch } from "@/components/branch/BranchProvider";

const collator = new Intl.Collator("vi", { sensitivity: "base", numeric: true });
const validOrder = (value: number | null | undefined) =>
    typeof value === "number" && Number.isFinite(value) && value > 0 ? value : null;

function compareServices(a: Service, b: Service) {
    const aOrder = validOrder(a.sort_order);
    const bOrder = validOrder(b.sort_order);
    if (aOrder !== null && bOrder !== null && aOrder !== bOrder) return aOrder - bOrder;
    if (aOrder !== null && bOrder === null) return -1;
    if (aOrder === null && bOrder !== null) return 1;
    return collator.compare(a.name, b.name) || collator.compare(a.id, b.id);
}

export function ServicesCatalogue({ catalog }: { catalog: Service[] }) {
    const { selectedBranchId } = useBranch();
    const [activeCategory, setActiveCategory] = useState("Tất cả");

    const groups = useMemo(() => {
        const byCategory = new Map<string, Service[]>();
        catalog.filter(service => service.branch_id === selectedBranchId).forEach(service => {
            const category = service.category?.trim() || "Chưa phân nhóm";
            const items = byCategory.get(category) || [];
            items.push(service);
            byCategory.set(category, items);
        });
        return Array.from(byCategory, ([category, items]) => ({
            category,
            items: items.sort(compareServices),
        })).sort((a, b) => collator.compare(a.category, b.category));
    }, [catalog, selectedBranchId]);

    const categories = ["Tất cả", ...groups.map(group => group.category)];
    const visibleGroups = activeCategory === "Tất cả"
        ? groups
        : groups.filter(group => group.category === activeCategory);

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

            {visibleGroups.length ? (
                <div className="mt-7 min-w-0 overflow-hidden rounded-[22px] border border-line bg-surface">
                    {visibleGroups.map((group, groupIndex) => (
                        <section key={group.category} aria-label={group.category} className={groupIndex ? "border-t border-line" : ""}>
                            <div className="flex min-w-0 items-center justify-between gap-4 bg-tint px-[clamp(1.25rem,2.5vw,1.75rem)] py-5">
                                <div className="flex min-w-0 items-center gap-3">
                                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5 shrink-0 text-accent">
                                        <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10H3V7Z" />
                                        <path d="M3 11h18" />
                                    </svg>
                                    <h2 className="min-w-0 font-serif text-[clamp(1.45rem,2.7vw,1.9rem)] leading-[1.25]">{group.category}</h2>
                                </div>
                                <p className="shrink-0 text-xs text-muted">{group.items.length} dịch vụ</p>
                            </div>
                            <div>
                                {group.items.map((service, index) => (
                                    <article key={service.id} className={`flex min-w-0 flex-wrap items-center gap-4 px-[clamp(1.25rem,2.5vw,1.75rem)] py-5 ${index ? "border-t border-line" : ""}`}>
                                        <div className="min-w-0 flex-[1_1_16rem]">
                                            <h3 className="min-w-0 break-words font-serif text-[clamp(1.3rem,2.3vw,1.75rem)] leading-[1.3]">{service.name}</h3>
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
                        </section>
                    ))}
                </div>
            ) : <div className="mt-7 rounded-[18px] border border-line bg-surface px-6 py-10 text-center text-sm text-muted">Chưa có dịch vụ trong mục này.</div>}
        </div>
    );
}
