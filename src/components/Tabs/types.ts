export type TabData = {
  name: string;
};

export type UpsertTab = (tabIndex: number, tab: TabData) => void;
export type RemoveTab = (tabName: string) => void;

export type TabsProps = {
  isHorizontalArrowScrollEnabled?: boolean;
  isHorizontalLineHidden?: boolean;
  alignLeft?: boolean;
};
