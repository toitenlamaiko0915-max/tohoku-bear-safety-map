import Link from "next/link";
import { MapPinned, ShieldAlert, ExternalLink, Home } from "lucide-react";

const navItems = [
  { href: "/", label: "トップ", icon: Home },
  { href: "/map", label: "地図", icon: MapPinned },
  { href: "/official-links", label: "公式情報", icon: ExternalLink },
  { href: "/safety", label: "遭遇時の行動", icon: ShieldAlert }
];

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-forest-800">
          <span className="flex h-10 w-10 items-center justify-center rounded bg-forest-700 text-sm font-extrabold text-white">
            東北
          </span>
          <span>
            <span className="block text-base font-extrabold sm:text-lg">東北クマ出没・安全確認マップ</span>
            <span className="block text-xs font-medium text-slate-500">公式情報を確認しやすくする参考サイト</span>
          </span>
        </Link>
        <nav aria-label="主要ページ">
          <ul className="grid grid-cols-2 gap-2 sm:flex">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-11 items-center justify-center gap-2 rounded border border-slate-200 px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-forest-600 hover:text-forest-800 focus:outline-none focus:ring-2 focus:ring-forest-600"
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
