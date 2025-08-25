// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import Layout from "@/app/components/Dashboard/Layout";
// import InfoCard from "@/app/components/InfoCard";
// import { fetchData } from "@/app/lib/fetchHelper";

// interface DetailsPageProps<T extends Record<string, unknown>> {
//   apiType: string;
//   title: string;
//   fieldLabels: Record<keyof T, any>;
//   additionalDataConfig?: Array<{
//     apiEndpoint: string;
//     label: string;
//     fieldName?: string;
//     subField?: string;
//     tableFieldName?: string;
//   }>;
// }

// const isValidObjectId = (id: string | null) => id && /^[a-fA-F0-9]{24}$/.test(id);

// export default function DetailsPage<T extends Record<string, unknown>>({
//   apiType,
//   title,
//   fieldLabels,
//   additionalDataConfig = [],
// }: DetailsPageProps<T>) {
//   const searchParams = useSearchParams();
//   const id = searchParams.get("id");
//   const [data, setData] = useState<T | null>(null);
//   const [extraData, setExtraData] = useState<Record<string, any>>({});

//   useEffect(() => {
//     if (!isValidObjectId(id)) return;
//     fetchData(`/api/api?type=${apiType}&id=${id}`, setData, apiType);
//   }, [id, apiType]);
  
//   useEffect(() => {
//     if (!id || additionalDataConfig.length === 0 || !data) return;
//     const fetchAdditionalData = async () => {
//       try {
//         const extraDataMap: Record<string, any> = {};
//         await Promise.all(
//           additionalDataConfig.map(async (config) => {
//             let fieldValues = data?.[config.fieldName ?? ""];
//             if (typeof config.subField === "string" && Array.isArray(fieldValues)) {
//               const subFieldKey: string = config.subField;
//               fieldValues = fieldValues.map((item: any) => item[subFieldKey]);
//             }
//             if (typeof fieldValues === "string" && fieldValues.startsWith("[")) {
//               try {
//                 fieldValues = JSON.parse(fieldValues);
//               } catch (error) {
//                 console.error("Error parsing field values:", error);
//                 fieldValues = [];
//               }
//             }
//             const valuesToProcess = Array.isArray(fieldValues) ? fieldValues : [fieldValues];
//             const individualRequests = valuesToProcess.map(async (item: any) => {
//               if (config.apiEndpoint && isValidObjectId(item)) {
//                 try {
//                   const response = await fetch(`/api/api?id=${item}&type=${config.apiEndpoint}`);
//                   const result = await response.json();
//                   return config.tableFieldName &&
//                     result?.[config.apiEndpoint]?.hasOwnProperty(config.tableFieldName)
//                     ? result[config.apiEndpoint][config.tableFieldName]
//                     : "N/A";
//                 } catch (error) {
//                   console.error(`Error fetching data for ID ${item}:`, error);
//                   return null;
//                 }
//               } else {
//                 return item;
//               }
//             });
//             const resolvedValues = (await Promise.all(individualRequests)).filter(Boolean);
//             extraDataMap[config.label] = resolvedValues.join(", ");
//           })
//         );
//         setExtraData(extraDataMap);
//       } catch (error) {
//         console.error("Error in fetchAdditionalData:", error);
//       }
//     };
  
//     fetchAdditionalData();
//   }, [id, additionalDataConfig, data]);
  
//   return (
//     <Layout>
//       <div className="py-20 px-2">
//         <InfoCard<T> title={title} data={data} fieldLabels={fieldLabels} extraData={extraData} />
//         {/* <InfoCard<T>
//           title={title}
//           data={
//             data
//               ? (Object.fromEntries(
//                   Object.entries(data).map(([key, value]) => [
//                     key,
//                     value ?? "Not Available", // fallback
//                   ])
//                 ) as T)
//               : null
//           }
//           fieldLabels={fieldLabels}
//           extraData={
//             Object.fromEntries(
//               Object.entries(extraData).map(([key, value]) => [
//                 key,
//                 value || "Not Available", // fallback
//               ])
//             )
//           }
//         /> */}
//       </div>
//     </Layout>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Layout from "@/app/components/Dashboard/Layout";
import InfoCard from "@/app/components/InfoCard";
import { fetchData } from "@/app/lib/fetchHelper";

interface DetailsPageProps<T extends Record<string, unknown>> {
  apiType: string;
  title: string;
  fieldLabels: Record<keyof T, any>;
  additionalDataConfig?: Array<{
    apiEndpoint: string;
    label: string;
    fieldName?: string;
    subField?: string;
    tableFieldName?: string;
  }>;
}

const isValidObjectId = (id: string | null) => id && /^[a-fA-F0-9]{24}$/.test(id);

const PLACEHOLDER_IMAGE = "/placeholder.png";

export default function DetailsPage<T extends Record<string, unknown>>({
  apiType,
  title,
  fieldLabels,
  additionalDataConfig = [],
}: DetailsPageProps<T>) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [data, setData] = useState<T | null>(null);
  const [extraData, setExtraData] = useState<Record<string, any>>({});

  useEffect(() => {
    if (!isValidObjectId(id)) {
      return;
    }
    fetchData(`/api/api?type=${apiType}&id=${id}`, setData, apiType);
  }, [id, apiType]);

  useEffect(() => {
    if (!id || additionalDataConfig.length === 0 || !data) {
      return;
    }
    const fetchAdditionalData = async () => {
      try {
        const extraDataMap: Record<string, any> = {};
        await Promise.all(
          additionalDataConfig.map(async (config) => {
            let fieldValues = data?.[config.fieldName ?? ""];
            if (typeof config.subField === "string" && Array.isArray(fieldValues)) {
              const subFieldKey: string = config.subField;
              fieldValues = fieldValues.map((item: any) => item[subFieldKey]);
            }
            if (typeof fieldValues === "string" && fieldValues.startsWith("[")) {
              try {
                fieldValues = JSON.parse(fieldValues);
              } catch (error) {
                console.error("Error parsing field values:", error);
                fieldValues = [];
              }
            }
            const valuesToProcess = Array.isArray(fieldValues) ? fieldValues : [fieldValues];
            const individualRequests = valuesToProcess.map(async (item: any) => {
              if (config.apiEndpoint && isValidObjectId(item)) {
                try {
                  const response = await fetch(`/api/api?id=${item}&type=${config.apiEndpoint}`);
                  const result = await response.json();
                  return config.tableFieldName &&
                    result?.[config.apiEndpoint]?.hasOwnProperty(config.tableFieldName)
                    ? result[config.apiEndpoint][config.tableFieldName]
                    : "Not Available";
                } catch (error) {
                  console.error(`Error fetching data for ID ${item}:`, error);
                  return "Not Available";
                }
              } else {
                return item || "Not Available";
              }
            });
            const resolvedValues = (await Promise.all(individualRequests)).filter(Boolean);
            extraDataMap[config.label] = resolvedValues.length > 0 ? resolvedValues.join(", ") : "Not Available";
          })
        );
        setExtraData(extraDataMap);
      } catch (error) {
        console.error("Error in fetchAdditionalData:", error);
      }
    };

    fetchAdditionalData();
  }, [id, additionalDataConfig, data]);

  return (
    <Layout>
      <div className="py-20 px-2">
        <InfoCard<T>
          title={title}
          data={
            data
              ? (Object.fromEntries(
                  Object.entries(data).map(([key, value]) => {
                    // handle missing image field
                    const isImage =
                      typeof value === "string" &&
                      /\.(jpg|jpeg|png|gif|webp)$/i.test(value);

                    return [
                      key,
                      value || (isImage
                        ? PLACEHOLDER_IMAGE
                        : "Not Available"),
                    ];
                  })
                ) as T)
              : null
          }
          fieldLabels={fieldLabels}
          extraData={Object.fromEntries(
            Object.entries(extraData).map(([key, value]) => [
              key,
              value || "Not Available",
            ])
          )}
        />
      </div>
    </Layout>
  );
}
