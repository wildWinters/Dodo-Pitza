"use client";
import { MainComponentFilteredPanel } from "@/modules/layout/aside-filtered-panel/main-component-filtered-panel";
import { MainPaginationBlock } from "@/modules/layout/pagination/main-pagination-block-v1";
import { MainPizzaListWrapper } from "@/modules/layout/pizza-info-block/main-pizza-list-wrappe";
import { MainComponentsOfTabList } from "@/modules/layout/tab-list/main-components-of-tab-lists";
import { mockPizzas } from "@/modules/main-page/mock/mock-data-pitza";
import { useModalStore } from "@/modules/main-page/store/use-active-modal-store";
export default function Home() {
  const gridContainerClass = "relative order-2 grid h-[900px] grid-cols-3 auto-rows-auto gap-x-[50px] gap-y-[30px] w-full overflow-auto p-4";
  const isModalOpen = useModalStore(state => state.isModalOpen);
  const closeModal = useModalStore(state => state.closeModal);
  
  return (
    <>
      <div className={`${isModalOpen ? "relative z-[-5]" : ""} w-full`}>
        <MainComponentsOfTabList />
        <div className="w-full flex mt-[36px] gap-[48px]">
          <div id="scrollContainer" className={gridContainerClass}>
            <MainPizzaListWrapper mockRenderPitza={mockPizzas} />
          </div>
          <aside className="w-[244px] flex-shrink-0">
            <MainComponentFilteredPanel />
          </aside>
        </div>
        <MainPaginationBlock />
      </div>
      <div
        onClick={closeModal}
        className={`${
        isModalOpen ? "fixed inset-0 bg-[rgba(150,150,150,0.49)] z-[999]" : "hidden"
        }`}
      />
    </>
  );
}
