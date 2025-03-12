export interface Project {
  name: string;
  type: string;
  techno: { name: string; color: string ,img:boolean}[];
  img: string;
  description: string;
  siteweb?: string;
  github?: string;
  dateRealisation: string;
}
