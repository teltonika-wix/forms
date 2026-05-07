export const createBadResponse = async ({
  errorMessage,
}: {
  errorMessage: string;
}): Promise<Response> => {
  return new Response(JSON.stringify({ error: errorMessage }), {
    status: 400,
  });
};
