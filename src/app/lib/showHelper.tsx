/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { FaRegEye } from "react-icons/fa";
import { entityMapping } from "@/app/types/EntityType";

/**
 * Generates a dynamic link component with an icon and an optional click handler.
 * @param entity - The type of the entity (e.g., "testimonial").
 * @param id - The unique ID of the entity.
 * @param onClick - An optional function to execute when clicked.
 * @returns A Next.js Link component wrapping the `FaRegEye` icon.
 */
export const generateShowLink = (
  entity: string,
  id: number,
  onClick?: () => void,
  path?: string | undefined,
) => {
  // Modify only the `generateShowLink` URL, not sidebar links
  const urlEntity = entityMapping[entity] || entity;

  // Construct the URL with the modified entity for this function only
  // const url = `/${urlEntity}/info?id=${id}&type=${entity}`;

  const basePath = path ? path : `/${urlEntity}`;
  const url = `${basePath}/info?id=${id}&type=${entity}`;

  return (
    <Link href={url} passHref>
      <FaRegEye
        onClick={(e) => {
          e.stopPropagation();
          if (onClick) onClick();
        }}
        style={{ cursor: "pointer" }}
        className="text-blue-500 pr-4"
        size={30}
      />
    </Link>
  );
};

export type ShowItemFunction<T> = (
  itemId: number,
  itemList: T[],
  setItem: React.Dispatch<React.SetStateAction<T | null>>
) => void;

export const handleShowClick: ShowItemFunction<any> = (itemId, itemList, setItem) => {
  const itemToShow = itemList.find((e) => e._id === itemId);
  if (itemToShow) {
    setItem(itemToShow);
  }
};
