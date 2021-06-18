export interface IMenuSections {
  title: string,
  data: IMenu
}

export interface IMenu {
  id: string,
  icon: any,
  text: string,
  description: string,

  color: string
}
