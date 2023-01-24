import type { RequestHandler } from './$types';

export const PATCH = (({ url }) => {

 const random = console.log(url.searchParams)


 
  return new Response(String(random));
}) satisfies RequestHandler;