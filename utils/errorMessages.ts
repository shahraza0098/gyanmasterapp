import { AxiosError } from "axios";

/**
 * User-friendly error messages keyed by HTTP status code.
 */
const STATUS_MESSAGES: Record<number, string> = {
  401: "Your session has expired. Please sign in again.",
  403: "You don't have access to this content.",
  404: "The content you're looking for wasn't found.",
  408: "The request timed out. Please try again.",
  409: "A record with this information already exists.",
  429: "Too many requests. Please wait a moment and try again.",
  500: "Something went wrong on our end. Please try again later.",
  502: "Our servers are temporarily unavailable. Please try again later.",
  503: "Service is temporarily unavailable. Please try again later.",
};

const GENERIC_FALLBACK = "Something went wrong. Please try again.";

/**
 * Sanitizes technical error messages (such as database or Prisma errors)
 * into friendly user-facing messages.
 */
export function sanitizeErrorMessage(rawMessage: string): string {
  if (!rawMessage || typeof rawMessage !== "string") return GENERIC_FALLBACK;

  const lower = rawMessage.toLowerCase();

  // Handle Prisma / Database Unique constraint errors (P2002)
  if (lower.includes("unique constraint") || lower.includes("p2002")) {
    if (lower.includes("email")) {
      return "An account with this email address already exists.";
    }
    if (lower.includes("phone")) {
      return "An account with this phone number already exists.";
    }
    if (lower.includes("username")) {
      return "This username is already taken.";
    }
    return "This information is already registered. Please try again with different details.";
  }

  // Handle technical leak error strings (Prisma, SQL, Stack traces, Internal Code)
  if (
    lower.includes("prisma") ||
    lower.includes("invocation:") ||
    lower.includes("database") ||
    lower.includes("foreign key") ||
    lower.includes("sql") ||
    lower.includes("syntaxerror") ||
    lower.includes("typeerror") ||
    lower.includes("evalerror")
  ) {
    return "Something went wrong while saving your details. Please try again later.";
  }

  return rawMessage;
}

/**
 * Parse any error into a user-friendly message string.
 */
export function getErrorMessage(error: unknown): string {
  if (!error) return GENERIC_FALLBACK;

  // Handle Axios errors
  if (isAxiosError(error)) {
    // Network errors (no response received — offline, DNS failure, etc.)
    if (error.code === "ERR_NETWORK" || !error.response) {
      return "No internet connection. Please check your Wi-Fi or mobile data.";
    }

    // Timeout
    if (
      error.code === "ECONNABORTED" ||
      error.code === "ERR_CANCELED"
    ) {
      return "The server took too long to respond. Please try again.";
    }

    const status = error.response.status;

    // Try to extract a human-readable message from the response body
    const serverMessage = extractServerMessage(error.response.data);
    if (serverMessage) {
      return sanitizeErrorMessage(serverMessage);
    }

    // Fall back to status-code mapping
    if (status && STATUS_MESSAGES[status]) {
      return STATUS_MESSAGES[status];
    }

    // 5xx catch-all
    if (status >= 500) {
      return "Something went wrong on our end. Please try again later.";
    }
  }

  // Plain Error instances
  if (error instanceof Error) {
    if (error.message === "Network Error") {
      return "No internet connection. Please check your Wi-Fi or mobile data.";
    }

    return sanitizeErrorMessage(error.message || GENERIC_FALLBACK);
  }

  // String errors
  if (typeof error === "string") {
    return sanitizeErrorMessage(error);
  }

  return GENERIC_FALLBACK;
}

/**
 * Type guard for AxiosError.
 */
function isAxiosError(error: unknown): error is AxiosError {
  return (
    typeof error === "object" &&
    error !== null &&
    "isAxiosError" in error &&
    (error as AxiosError).isAxiosError === true
  );
}

/**
 * Attempt to extract a message string from an API response body.
 */
function extractServerMessage(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;

  const d = data as Record<string, unknown>;

  if (typeof d.message === "string" && d.message.length > 0) {
    return d.message;
  }

  if (typeof d.error === "string" && d.error.length > 0) {
    return d.error;
  }

  if (
    d.data &&
    typeof d.data === "object" &&
    typeof (d.data as Record<string, unknown>).message === "string"
  ) {
    return (d.data as Record<string, unknown>).message as string;
  }

  return null;
}
