import { AuthProvider } from "@/contexts/AuthContext";
import Topbar from "@/components/admin/Topbar";

export const metadata = {
  title: "SegMob Admin | Painel de Prestadores",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-[#0F0024]">
        <Topbar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
