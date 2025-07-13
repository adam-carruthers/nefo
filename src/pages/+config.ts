import vikeReact from "vike-react/config";
import icon from "@/assets/icon.svg";

// https://vike.dev/config
export default {
  // https://vike.dev/head
  // favicon: "/vite.svg",
  extends: [vikeReact],
  prerender: true,
  favicon: icon,
  title: 'Nefo'
};
