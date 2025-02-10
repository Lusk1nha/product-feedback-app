"use client";

import { cn } from "@/lib/utils";

export type TabOption = {
  label: string;
  value: string;
  description?: string;
};

interface SystemTabsProps {
  tabs: TabOption[];
  currentTab: string;
  onChange: (value: string) => void;
}

export function SystemTabs(props: Readonly<SystemTabsProps>) {
  const { tabs, currentTab, onChange } = props;

  return (
    <div className="w-full h-[59px] flex items-center border-b border-[#8C92B3]/25">
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          tab={tab}
          isActive={tab.value === currentTab}
          onClick={(tab) => onChange(tab.value)}
        />
      ))}
    </div>
  );
}

interface TabProps {
  tab: TabOption;
  isActive: boolean;
  onClick: (tab: TabOption) => void;
}

function Tab(props: Readonly<TabProps>) {
  const { tab, isActive, onClick } = props;

  return (
    <div
      className={cn(
        "flex-1 h-full flex items-center justify-center relative",
        "cursor-pointer transition-colors"
      )}
      onClick={() => onClick(tab)}
      title={tab?.description ?? tab.label}
    >
      <span
        className={cn(
          "font-semibold text-[13px] select-none",
          isActive ? "text-[#3A4374] font-bold" : "text-[#3A4374]/40"
        )}
      >
        {tab.label}
      </span>

      {isActive && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-[#4661E6]" />
      )}
    </div>
  );
}
