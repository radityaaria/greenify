import SidebarAdmin from "@/components/main/SidebarAdmin";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SidebarAdmin />
      <main className="flex-grow p-4">{children}</main>
    </div>
  );
}
