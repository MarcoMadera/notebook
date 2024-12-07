import { ReactElement } from "react";

import { SidebarAllNotes } from "@/components/SidebarAllNotes";

export default function Home(): ReactElement {
  return (
    <div className="grid-container grid-container--no-sidebar">
      <SidebarAllNotes />
    </div>
  );
}
