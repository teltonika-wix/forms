export type TabsScrollTab = {
  blockId: string;
  text: string;
};

export type TabsScrollProps = {
  tabs: TabsScrollTab[];
  offsetTop?: number;
};
