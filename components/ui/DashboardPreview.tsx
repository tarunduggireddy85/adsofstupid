"use client";

import React from "react";
import { Coins, ArrowDownUp } from "lucide-react";

export interface TransactionItem {
  id: number | string;
  name: string;
  date: string;
  amount: string;
  isPositive: boolean;
}

interface DashboardPreviewProps {
  transactions: TransactionItem[];
  income?: string;
  expense?: string;
}

export function DashboardPreview({
  transactions,
  income = "$40,000",
  expense = "$1,369",
}: DashboardPreviewProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      
      <div className="grid grid-cols-3 gap-0.5 p-0.5 rounded-xl bg-zinc-100/80 text-center text-[0.62rem] font-bold text-zinc-400 mt-2 select-none">
        <span className="py-2">Daily</span>
        <span className="bg-white text-zinc-950 rounded-lg py-2 shadow-sm text-zinc-950">Weekly</span>
        <span className="py-2">Yearly</span>
      </div>

      
      <div className="flex gap-3">
        
        <div className="flex-1 p-3.5 rounded-xl border border-zinc-50 bg-white shadow-sm">
          <div className="flex items-center gap-1 text-[0.55rem] text-zinc-400 font-bold mb-1">
            <Coins className="w-3.5 h-3.5 text-[#5c43fd]" />
            <span>Income</span>
          </div>
          <span className="text-[1.1rem] font-extrabold text-zinc-950 block">{income}</span>
        </div>
        
        <div className="flex-1 p-3.5 rounded-xl border border-zinc-50 bg-white shadow-sm">
          <div className="flex items-center gap-1 text-[0.55rem] text-zinc-400 font-bold mb-1">
            <ArrowDownUp className="w-3.5 h-3.5 text-[#5c43fd]" />
            <span>Expense</span>
          </div>
          <span className="text-[1.1rem] font-extrabold text-zinc-950 block">{expense}</span>
        </div>
      </div>

      
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between text-[0.72rem] font-bold text-zinc-950">
          <span>History</span>
          <span className="text-[#5c43fd] font-semibold text-[0.68rem]">View All</span>
        </div>

        
        <div className="flex flex-col gap-2">
          {transactions.map((item, idx) => (
            <div 
              key={item.id + "-" + idx}
              className="flex items-center justify-between bg-white border border-zinc-50 p-2.5 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.01)]"
            >
              <div className="flex items-center gap-2.5">
                
                <div className="w-8 h-8 rounded-lg bg-[#5c43fd]/10 text-[#5c43fd] flex items-center justify-center text-[0.65rem] font-bold">
                  NF
                </div>
                <div>
                  <span className="block text-[0.7rem] font-bold text-zinc-950 leading-none">{item.name}</span>
                  <span className="block text-[0.52rem] text-zinc-400 font-medium leading-none mt-0.5">{item.date}</span>
                </div>
              </div>
              <span className={`text-[0.72rem] font-bold ${item.isPositive ? "text-emerald-600" : "text-rose-500"}`}>
                {item.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPreview;
