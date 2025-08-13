/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import React from "react";
import { formatDateOrTime } from "@/app/lib/dateFormat";

interface InfoCardProps<T extends Record<string, unknown>> {
  title: string;
  data: T | null;
  fieldLabels: Record<keyof T, string>;
  extraData?: Record<string, string | number | null>;
}

const sanitizeHTML = (html: string) =>
  html.replace(/<script.*?>.*?<\/script>/gi, "");

const isISODate = (value: any): boolean =>
  typeof value === "string" && !isNaN(Date.parse(value));

const InfoCard = <T extends Record<string, unknown>>({
  title,
  data,
  fieldLabels,
  extraData = {},
}: InfoCardProps<T>) => {
  return (
    <div className="mx-auto flex flex-col max-w-5xl bg-white shadow-lg rounded-lg p-6 space-y-4">
      <div className="w-full bg-stone-500 text-white text-lg font-semibold uppercase py-3 px-4 rounded-md">
        {title}
      </div>
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(fieldLabels).map(([key, label]) => {
            const value = data[key as keyof T];
            const isImage =
              typeof value === "string" &&
              /\.(jpg|jpeg|png|gif|webp)$/i.test(value);
            const isRichText =
              typeof value === "string" && /<\/?[a-z][\s\S]*>/i.test(value);
            const isObject =
              value && typeof value === "object" && !Array.isArray(value);
            const isArrayOfObjects =
              Array.isArray(value) &&
              value.length > 0 &&
              typeof value[0] === "object";
            return (
              <div key={key} className="flex flex-col space-y-1">
                <p className="text-gray-700 font-medium uppercase">{label}</p>
                {isImage ? (
                  <Image
                    src={`/${value}`}
                    width={200}
                    height={200}
                    alt={label}
                    className="w-40 h-40 object-cover rounded-lg shadow-sm"
                  />
                ) : isRichText ? (
                  <div
                    className="text-gray-800 text-base"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHTML(value as string),
                    }}
                  />
                ) : isArrayOfObjects ? (
                  <div className="space-y-2">
                    {value.map((item: any, idx: number) => (
                      <div key={idx} className="border p-2 rounded">
                        {Object.entries(item).map(([subKey, subValue]) => (
                          <p key={subKey} className="text-sm">
                            <span className="font-bold">{subKey}: </span>
                            {String(subValue)}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                ) : isObject ? (
                  <div className="border p-2 rounded">
                    {Object.entries(value).map(([subKey, subValue]) => (
                      <p key={subKey} className="text-sm">
                        <span className="font-bold">{subKey}: </span>
                        {String(subValue)}
                      </p>
                    ))}
                  </div>
                ) : isISODate(value) ? (
                  <p className="text-gray-600 text-base">
                    {formatDateOrTime(value as string)}
                  </p>
                ) : (
                  <p className="text-gray-600 text-base">
                    {value !== undefined && value !== null
                      ? String(value)
                      : "N/A"}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
      {extraData && Object.keys(extraData).length > 0 && (
        <div className="border-t pt-4 mt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            {Object.entries(extraData).map(([key, value]) => (
              <div key={key} className="flex flex-col space-y-1">
                <p className="text-gray-700 font-medium uppercase">{key}</p>
                <p className="text-gray-600 text-base">
                  {value !== undefined && value !== null ? String(value) : "N/A"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoCard;
