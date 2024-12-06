import { ReactElement } from "react";

import { TestButton } from "./testButton";

export default function Home(): ReactElement {
  return (
    <div>
      <p>Settings</p>
      <TestButton />
    </div>
  );
}
