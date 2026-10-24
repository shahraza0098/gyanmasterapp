import { useEffect, useRef } from "react";
import { useAuth, useUser } from "@clerk/expo";

import { logLogin } from "@/lib/meta-events";

/**
 * Accounts created this recently are treated as a sign-up, not a login.
 * Clerk creates the User only when sign-up finishes, so a fresh account's
 * createdAt is within seconds of the session becoming active.
 * (CompleteRegistration is logged separately when onboarding succeeds.)
 */
const NEW_ACCOUNT_WINDOW_MS = 5 * 60 * 1000;

/**
 * Logs the Meta "Login" event once per interactive sign-in.
 *
 * Clerk's native <AuthView /> exposes no success callback, so we watch
 * the auth state for a signed-out → signed-in transition. A session that
 * is already present at app launch (restored from the token cache) is not
 * a login and is ignored.
 */
export function useMetaLoginTracking(): void {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  /** null until Clerk has loaded, so a restored session is not a login. */
  const wasSignedIn = useRef<boolean | null>(null);
  const pendingLogin = useRef(false);
  const loggedForUserId = useRef<string | null>(null);

  const userId = user?.id ?? null;
  const createdAtMs = user?.createdAt?.getTime() ?? null;

  useEffect(() => {
    if (!isLoaded) return;

    const signedIn = Boolean(isSignedIn);

    if (wasSignedIn.current === false && signedIn) {
      pendingLogin.current = true;
    }

    if (!signedIn) {
      pendingLogin.current = false;
      loggedForUserId.current = null;
    }

    wasSignedIn.current = signedIn;

    // The user object can arrive a render after isSignedIn flips.
    if (!pendingLogin.current || !userId) return;

    pendingLogin.current = false;

    if (loggedForUserId.current === userId) return;
    loggedForUserId.current = userId;

    const isNewAccount =
      createdAtMs !== null &&
      Date.now() - createdAtMs < NEW_ACCOUNT_WINDOW_MS;

    if (!isNewAccount) {
      logLogin();
    }
  }, [isLoaded, isSignedIn, userId, createdAtMs]);
}
