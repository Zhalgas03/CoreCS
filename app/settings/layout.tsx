import SettingsSidebar from "./components/SettingsSidebar"
import { SettingsUserProvider } from "./components/SettingsUserContext"
import "@/app/lib/fontawesome"
export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <SettingsUserProvider>
      <div
        style={{
          minHeight: "100vh",
          background: "#f5f7fa",
          paddingTop: 80,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "260px 1fr",
            gap: 24,
            padding: 24,
          }}
        >
          <SettingsSidebar />

          <main
            style={{
              background: "#fff",
              borderRadius: 6,
          
              padding: 32,
              border: "1px solid #d1d7dc",
            }}
          >
            {children}
          </main>
        </div>
      </div>
    </SettingsUserProvider>
  )
}