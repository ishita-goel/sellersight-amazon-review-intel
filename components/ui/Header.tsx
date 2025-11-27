// components/ui/Header.tsx
export default function Header() {
  return (
    <header className="flex items-center gap-3 bg-[#232F3E] px-6 py-3 shadow-md">
      <img
        src="/sellersight-logo.png"
        alt="SellerSight"
        className="h-9 w-auto"
      />
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-white tracking-wide">
          SellerSight
        </span>
        <span className="text-xs text-[#FF9900]">
          Amazon Review Intelligence for Sellers
        </span>
      </div>
    </header>
  );
}
