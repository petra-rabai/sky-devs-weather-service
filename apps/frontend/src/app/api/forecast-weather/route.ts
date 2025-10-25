import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang") ?? "en";
    const days = searchParams.get("days");
    const alerts = searchParams.get("alerts");
    const aqi = searchParams.get("aqi");

    const cityName = searchParams.get("cityName");
    const IATACode = searchParams.get("IATACode");
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    // Validate location presence
    if (!cityName && !IATACode && !(lat && lon)) {
      return NextResponse.json(
        { error: "No location provided" },
        { status: 400 }
      );
    }

    if (!days) {
      return NextResponse.json({ error: "No days provided" }, { status: 400 });
    }

    const backendBase = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (!backendBase) {
      return NextResponse.json(
        { error: "Backend URL not configured" },
        { status: 500 }
      );
    }

    const params = new URLSearchParams();
    params.set("lang", lang);
    params.set("days", days);

    if (alerts !== null) params.set("alerts", alerts);
    if (aqi !== null) params.set("aqi", aqi);

    if (cityName) {
      params.set("cityName", cityName);
    } else if (IATACode) {
      params.set("IATACode", IATACode);
    } else if (lat && lon) {
      params.set("lat", lat);
      params.set("lon", lon);
    }

    const backendUrl = `${backendBase.replace(
      /\/$/,
      ""
    )}/forecast-weather?${params.toString()}`;

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": lang,
      },
    });

    if (!response.ok) {
      let errorResponse;
      try {
        errorResponse = await response.json();
      } catch {
        errorResponse = { message: "Invalid error response from backend" };
      }
      console.error("Backend responded with error:", errorResponse);
      return NextResponse.json(
        { error: errorResponse.message || "Failed to fetch data from backend" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Unexpected error in forecast route:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
