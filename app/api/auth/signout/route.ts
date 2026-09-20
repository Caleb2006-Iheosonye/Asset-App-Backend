import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function POST() {
  const cookieStore = await cookies();
  const supabaseClient = createClient(cookieStore);

  const { error } = await supabaseClient.auth.signOut({ scope: "local" });

  return NextResponse.json({ error });
}