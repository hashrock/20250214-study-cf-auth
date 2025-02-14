export async function onRequest(context) {
  // 開発環境の場合はテストメールアドレスを使用
  const isDev = context.env.NODE_ENV === "development" ||
    !context.env.ENVIRONMENT;
  const email = isDev
    ? "test@example.com"
    : context.request.headers.get("Cf-Access-Authenticated-User-Email");

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
