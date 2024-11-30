import "@testing-library/jest-dom";
import { afterAll, beforeAll } from "@jest/globals";


beforeAll(() => {
  if (!(typeof window != "undefined" && window.document)) return;
});

afterAll(() => {
  if (!(typeof window != "undefined" && window.document)) return
});