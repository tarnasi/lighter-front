import { PluginFunc } from "dayjs";

declare module "dayjs-jalali" {
  const plugin: PluginFunc<any>;
  export = plugin;
}
