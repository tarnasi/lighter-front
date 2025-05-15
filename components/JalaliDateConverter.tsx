"use client";

import moment from "moment-jalaali";
import "moment/locale/fa";

moment.locale("fa");
moment.loadPersian({ dialect: "persian-modern" });

type Props = {
  datetime: any;
};

export default function JalaliDateConverter({ datetime }: Props) {
  return (
    <span className="text-xs">
      {datetime ? moment(Number(datetime)).format("dddd jD jMMMM jYYYY") : "-"}
    </span>
  );
}
