// /* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from "axios";
// import { useEffect, useState } from "react";

// type FetchDataFunction<T> = (
//   url: string,
//   setState: React.Dispatch<React.SetStateAction<T>>,
//   dataKey: string,
//   additionalAction?: (data: any) => void
// ) => void;

// export const fetchData: FetchDataFunction<any> = (
//   url: string,
//   setState: React.Dispatch<React.SetStateAction<any>>,
//   dataKey: string,
//   additionalAction?: (data: any) => void
// ) => {
//   axios
//     .get(url)
//     .then((response) => {
//       const data = response.data[dataKey];
//       setState(data);
//       if (additionalAction) {
//         additionalAction(response.data);
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// type FetchDataSelectFunction<T> = (
//   url: string,
//   setState: React.Dispatch<React.SetStateAction<T>>,
//   dataKey: string,
//   formatter: (data: any[]) => any[],
//   additionalAction?: (data: any) => void
// ) => void;

// export const fetchDataSelect: FetchDataSelectFunction<any> = (
//   url: string,
//   setState: React.Dispatch<React.SetStateAction<any>>,
//   dataKey: string,
//   formatter: (data: any[]) => any[],
//   additionalAction?: (data: any) => void
// ) => {
//   axios
//     .get(url)
//     .then((response) => {
//       const data = response.data[dataKey];
//       const formattedData = formatter(data);
//       setState(formattedData);
//       if (additionalAction) {
//         additionalAction(response.data);
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

// export function useFetchData<T>(apiType: string, endpoint = "/api/api") {
//   const [data, setData] = useState<T[]>([]);
//   const [formattedData, setFormattedData] = useState<{ label: string; value: string }[]>([]);

//   useEffect(() => {
//     fetchData(`${endpoint}?type=${apiType}`, (fetchedData: T[]) => {
//       if (fetchedData && fetchedData.length > 0) {
//         setData(fetchedData);
//         setFormattedData(
//           fetchedData.map((item: any) => ({
//             label: item.tag || item.name || "N/A",
//             value: item._id?.toString() || "",
//           }))
//         );
//       }
//     }, apiType);
//   }, [apiType, endpoint]);
//   return { data, formattedData };
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";

type FetchDataFunction<T> = (
  url: string,
  setState: React.Dispatch<React.SetStateAction<T>>,
  dataKey: string,
  additionalAction?: (data: any) => void
) => void;

export const fetchData: FetchDataFunction<any> = (
  url: string,
  setState: React.Dispatch<React.SetStateAction<any>>,
  dataKey: string,
  additionalAction?: (data: any) => void
) => {
  axios
    .get(url)
    .then((response) => {
      const data = response.data[dataKey];
      setState(data);
      if (additionalAction) {
        additionalAction(response.data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

type FetchDataSelectFunction<T> = (
  url: string,
  setState: React.Dispatch<React.SetStateAction<T>>,
  dataKey: string,
  formatter: (data: any[]) => any[],
  additionalAction?: (data: any) => void
) => void;

export const fetchDataSelect: FetchDataSelectFunction<any> = (
  url: string,
  setState: React.Dispatch<React.SetStateAction<any>>,
  dataKey: string,
  formatter: (data: any[]) => any[],
  additionalAction?: (data: any) => void
) => {
  axios
    .get(url)
    .then((response) => {
      const data = response.data[dataKey];
      const formattedData = formatter(data);
      setState(formattedData);
      if (additionalAction) {
        additionalAction(response.data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

/**
 * Custom hook to fetch data from the API.
 *
 * It sets two pieces of state:
 * - data: the raw data array from the API.
 * - formattedData: the same data with a guaranteed label and value,
 *   while preserving all extra properties from the original object.
 *
 * The API endpoint should return data as an object with a key equal to apiType.
 * For example: { categories: [ { _id, name, ... } ] }
 */
export function useFetchData<T>(apiType: string, endpoint = "/api/api") {
  const [data, setData] = useState<T[]>([]);
  const [formattedData, setFormattedData] = useState<(T & { label: string; value: string })[]>([]);

  useEffect(() => {
    fetchData(`${endpoint}?type=${apiType}`, (fetchedData: T[]) => {
      if (fetchedData && fetchedData.length > 0) {
        setData(fetchedData);
        setFormattedData(
          fetchedData.map((item: any) => ({
            ...item, // preserve extra properties from the API response
            label: item.tag || item.name || "N/A",
            value: item._id ? item._id.toString() : "",
          }))
        );
      }
    }, apiType);
  }, [apiType, endpoint]);
  return { data, formattedData };
}
