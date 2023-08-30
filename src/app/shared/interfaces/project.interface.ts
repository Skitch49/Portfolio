export interface Project {
  id: number;
  name: string;
  type: string;
  techno: Array<String>;
  img: string;
  description: string;
  siteweb?: string;
  github?: string;
  dateRealisation: string;
}
