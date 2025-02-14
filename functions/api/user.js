export async function onRequest(context) {
  const email = context.request.headers.get(
    "Cf-Access-Authenticated-User-Email",
  );

  if (!email) {
    return new Response(
      JSON.stringify({
        error: "ユーザーが認証されていません",
      }),
      {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  return new Response(
    JSON.stringify({
      email: email,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}
