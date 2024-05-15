import type { UUID } from "node:crypto";

let currentSessionFetch: Promise<UUID | null> | undefined;

export async function useSession() {
  const session = useCookie<UUID | null>("session", {
    sameSite: "lax",
    //1 day
    maxAge: 24 * 60 * 60,
  });

  if (!session.value) {
    if (!currentSessionFetch) {
      currentSessionFetch = fetchNewSession();
    }

    session.value = await currentSessionFetch;

    currentSessionFetch = undefined;
  } else {
    try {
      await fetchRefreshSession(session.value);
      console.log("Reuse session");
    } catch (err) {
      console.log("invalid session");

      session.value = null;
      return await useSession();
    }
  }

  return session;
}

async function fetchNewSession(): Promise<UUID | null> {
  console.log("new Session...");

  const { $nodeFetch } = useNuxtApp();

  try {
    const data = await $nodeFetch<{ uuid: UUID }>("/session/", {
      method: "GET",
    });

    return data.uuid;
  } catch (error) {
    console.log("Nuxt Error");
    console.log(error);
    return null;
  }
}

export async function fetchRefreshSession(sessionID: UUID): Promise<UUID> {
  console.log("refresh Session...");

  const { $nodeFetch } = useNuxtApp();

  return (
    await $nodeFetch<{ uuid: UUID }>(`/session/${sessionID}`, {
      method: "POST",
    })
  ).uuid;
}
