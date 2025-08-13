import Link from "next/link";

interface BreadcrumbProps {
  items: { text: string; href: string }[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <div className="breadcrumbs text-black sm:text-sm md:text-lg">
      <ul>
        <li>
          <Link href="#">Dashboard</Link>
        </li>
        {items.map((item, index) => (
          <li key={index}>
            <Link href={item.href}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumb;
