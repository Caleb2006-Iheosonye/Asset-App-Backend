import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function POST(request: NextRequest) {
  const { newPassword, accessToken, refreshToken } = await request.json();

  if (
    typeof newPassword !== "string" ||
    !newPassword ||
    !accessToken ||
    !refreshToken
  ) {
    return NextResponse.json(
      { data: null, error: "Missing password or session" },
      { status: 400, headers: corsHeaders },
    );
  }

  if (newPassword.length < 8 || !/[0-9]/.test(newPassword)) {
    return NextResponse.json(
      {
        data: null,
        error: "Password must be at least 8 characters and include a number",
      },
      { status: 400, headers: corsHeaders },
    );
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error: sessionError } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (sessionError) {
    console.error("Set session error:", sessionError.message);
    return NextResponse.json(
      { data: null, error: "Invalid or expired session" },
      { status: 401, headers: corsHeaders },
    );
  }

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    console.error("Update password error:", error.message);
    return NextResponse.json(
      { data: null, error: error.message },
      { status: error.status || 400, headers: corsHeaders },
    );
  }

  return NextResponse.json(
    { data: null, error: null },
    { headers: corsHeaders },
  );
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}