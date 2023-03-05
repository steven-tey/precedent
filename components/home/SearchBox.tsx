import { useState } from "react";
import { useDemoModal } from "@/components/home/RegisterSubdomainModal";
import { ChevronDown } from "lucide-react";

export default function SearchBox() {
  const { DemoModal, setShowDemoModal } = useDemoModal();
  const [openPopover, setOpenPopover] = useState(false);
  return (
    <>
      <DemoModal />
      <button
        onClick={() => setShowDemoModal(true)}
        className="flex items-center justify-center rounded-md border border-gray-300 px-3 py-2 transition-all duration-75 hover:border-gray-800 focus:outline-none active:bg-gray-100"
      >
        <p className="text-gray-600">Registrar Subdominio</p>
      </button>
    </>
  );
}
