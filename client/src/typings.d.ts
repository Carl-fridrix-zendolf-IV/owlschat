/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare var user: User;
export interface User {
  name: string;
  user_id: number;
  anonymous: boolean;
  login: string;
  registered_at: string;
  _id: string;
}

declare var tabs: Tabs;
export interface Tabs {
  name: string;
  selected: boolean;
  link: string;
}
