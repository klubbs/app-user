export interface IMenuSections {
  title: string;
  data: IMenu;
}

export type IMenu = {
  key: string;
  icon: any;
  text: string;
  description: string;
  logged?: boolean;
  cb: () => void;
};
