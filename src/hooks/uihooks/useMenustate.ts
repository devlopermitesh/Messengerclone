import { create } from "zustand";

interface MenuState {
  featureMenuOpen: boolean;
  dashboardMenuOpen: boolean;
  GifMenuOpen: boolean;
  OtheruserProfileMenuOpen:boolean;
  toggleOtheruserProfileMenuOpen:()=>void;
  toggleGifMenu: () => void;
  toggleFeatureMenu: () => void;
  toggleDashboardMenu: () => void;
}

const useMenuStore = create<MenuState>((set) => ({
  featureMenuOpen: false,
  dashboardMenuOpen: false,
  GifMenuOpen: false,
  OtheruserProfileMenuOpen:false,
  toggleOtheruserProfileMenuOpen:()=>set((state)=>({OtheruserProfileMenuOpen:!state.OtheruserProfileMenuOpen})),
  toggleGifMenu: () => set((state) => ({ GifMenuOpen: !state.GifMenuOpen })),
  toggleFeatureMenu: () => set((state) => ({ featureMenuOpen: !state.featureMenuOpen })),
  toggleDashboardMenu: () => set((state) => ({ dashboardMenuOpen: !state.dashboardMenuOpen })),
}));

export default useMenuStore;
