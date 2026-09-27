import { useState } from "react";
import { Modal } from "./components/Modal";
import { Tabs, type TabItem } from "./components/Tabs";
import { Disclosure } from "./components/Disclosure";
import "./styles.css";

const tabItems: TabItem[] = [
  { id: "profile", label: "Profile", content: <p>Profile panel content.</p> },
  { id: "settings", label: "Settings", content: <p>Settings panel content.</p> },
  { id: "billing", label: "Billing", content: <p>Billing panel content.</p> },
];

export default function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <main>
      <h1>Accessible Component Playground</h1>

      <section>
        <h2>Modal</h2>
        <button type="button" onClick={() => setModalOpen(true)}>
          Open modal
        </button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          titleId="demo-modal-title"
          title="Demo Modal"
        >
          <p>Tab cycles only within this dialog. Escape closes it.</p>
          <input type="text" placeholder="Focusable field" />
        </Modal>
      </section>

      <section>
        <h2>Tabs</h2>
        <Tabs items={tabItems} />
      </section>

      <section>
        <h2>Disclosure</h2>
        <Disclosure summary="More details">
          <p>Hidden content revealed by the disclosure button.</p>
        </Disclosure>
      </section>
    </main>
  );
}