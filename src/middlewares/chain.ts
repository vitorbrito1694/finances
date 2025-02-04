import { NextRequest, NextResponse } from "next/server";

export function chain(middlewares: any) {
  return async (req: NextRequest) => {
    let response = NextResponse.next();

    for (const middleware of middlewares) {
      response = await middleware(req);
      if (response.status !== 200) {
        break; // Se a middleware retornar um status diferente de 200, interrompa
      }
    }

    return response;
  };
}
