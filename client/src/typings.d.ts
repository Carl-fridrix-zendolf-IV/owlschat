/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare var user: User;
export interface User {
  name: string;
  id: number;
}

declare var tabs: Tabs;
export interface Tabs {
  name: string;
  selected: boolean;
  link: string;
}
