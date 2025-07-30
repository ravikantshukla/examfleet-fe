// src/app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      {/* You can add sidebar here if needed */}
      <main className="flex-1">{children}</main>
    </div>
  )
}
