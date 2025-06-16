"use client";

import Link from "next/link";

type Props = {
  title: string;
  returnLink?: string;
  returnTitle?: string;
};

const PageTitle = ({ title, returnLink, returnTitle }: Props) => {
  return (
    <div className="bg-gray-200 text-gray-800">
      <div className="flex items-center justify-between px-4 py-2">
        {returnLink && (
          <Link href={returnLink}>
            <div className="text-sm text-sky-600 hover:underline hover:underline-offset-4">
              {returnTitle ? returnTitle : `برگشت به صفحه قبل`}
            </div>
          </Link>
        )}
        <div className="text-teal-700">{title}</div>
      </div>
    </div>
  );
};

export default PageTitle;
