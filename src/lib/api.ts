const BACKEND_URL = "http://127.0.0.1:51234";

interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

async function apiCall(endpoint: string, method: "GET" | "POST" = "POST"): Promise<ApiResponse> {
  const response = await fetch(`${BACKEND_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Backend error: ${response.status}`);
  }

  return response.json();
}

export async function startVRMode(): Promise<ApiResponse> {
  return apiCall("/start/vr", "POST");
}

export async function startMonitorMode(): Promise<ApiResponse> {
  return apiCall("/start/monitor", "POST");
}

export async function shutdownApp(): Promise<ApiResponse> {
  return apiCall("/app/shutdown", "POST");
}

export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${BACKEND_URL}/health`, {
      method: "GET",
    });
    return response.ok;
  } catch {
    return false;
  }
}
