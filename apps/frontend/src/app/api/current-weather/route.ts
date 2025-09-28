import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang");
  const location = getSearchLocation(searchParams);
  if (!location) {
    return NextResponse.json(
      { error: "No location provided" },
      { status: 400 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get("lang");
    const location = getSearchLocation(searchParams);

    if (!location) {
      return NextResponse.json(
        { error: "No location provided" },
        { status: 400 }
      );
    }

    const backendUrl = `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/current-weather?cityName=${encodeURIComponent(
      location
    )}&lang=${encodeURIComponent(lang ? lang : "en")}`;

    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": lang ? lang : "en",
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
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

function getSearchLocation(searchParams: URLSearchParams): string | undefined {
  const cityName = searchParams.get("cityName");
  const IATACode = searchParams.get("IATACode");
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lon");

  if (cityName) {
    return cityName;
  } else if (IATACode) {
    return IATACode;
  } else if (latitude && longitude) {
    return `${latitude},${longitude}`;
  } else {
    return undefined;
  }
}
