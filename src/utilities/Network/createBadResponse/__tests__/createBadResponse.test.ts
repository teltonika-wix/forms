import { describe, expect, it } from "vitest";
import { createBadResponse } from "../createBadResponse";

describe("createBadResponse", () => {
  it("should return a Response object with status 400", async () => {
    const errorMessage = "This is a bad request";

    const response = await createBadResponse({ errorMessage });

    expect(response).toBeInstanceOf(Response);

    expect(response.status).toBe(400);

    const body = await response.json();
    expect(body).toEqual({ error: errorMessage });
  });

  it("should return the correct error message in the response body", async () => {
    const errorMessage = "Another error message";

    const response = await createBadResponse({ errorMessage });

    const body = await response.json();
    expect(body.error).toBe(errorMessage);
  });
});
