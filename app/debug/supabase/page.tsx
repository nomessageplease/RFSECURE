import CheckSupabaseConnection from "@/scripts/check-supabase-connection"

export default function DebugSupabasePage() {
  return (
    <div className="container mx-auto py-10">
      <CheckSupabaseConnection />
    </div>
  )
}
