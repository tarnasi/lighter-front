import Link from "next/link";

type Props = {
  title: string;
  returnLink?: string;
};

const PageTitle = ({ title, returnLink }: Props) => {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-gray-200">
      {returnLink && (
        <Link href={returnLink}>
          <div className="text-sm text-sky-600">
            برگشت به صفحه قبل &larr;
          </div>
        </Link>
      )}
      <div className="text-teal-700 text-sm">{title}</div>
    </div>
  );
};

export default PageTitle;
