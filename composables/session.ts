import type { UUID } from "node:crypto";

let currentSessionFetch: Promise<UUID | null> | undefined;

export async function useSession() {
  const session = useCookie<UUID | null>("session", {
    sameSite: "lax",
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

  const runtimeConfig = useRuntimeConfig();

  try {
    const data = await $fetch<{ uuid: UUID }>(
      `${runtimeConfig.public.baseURL}/api/session/`,
      {
        method: "GET",
      },
    );

    return data.uuid;
  } catch (error) {
    console.log("Nuxt Error");
    console.log(error);
    return null;
  }
}

export async function fetchRefreshSession(sessionID: UUID): Promise<UUID> {
  console.log("refresh Session...");

  const runtimeConfig = useRuntimeConfig();

  return (
    await $fetch<{ uuid: UUID }>(
      `${runtimeConfig.public.baseURL}/api/session/${sessionID}`,
      {
        method: "POST",
      },
    )
  ).uuid;
}
