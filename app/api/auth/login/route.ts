import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // TODO: call supabase.auth.signInWithPassword() with email and password
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  // TODO: return the result as JSON

      return NextResponse.json({ data, error });
}

