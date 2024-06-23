async function getParts(
  documentId: string,
  workspaceId: string,
  elementId: string,
): Promise<any> {
  const params = new URLSearchParams({
    elementId: elementId,
    withThumbnails: "false",
    includePropertyDefaults: "false",
  });

  const headers = {
    "Content-Type": "application/json",
    "Authorization": 'Bearer ${password}'
  }

  const apiUrl =
    "https://cad.onshape.com/api/v6/d/$%7BdocumentId%7D/w/$%7BworkspaceId%7D?${params.toString()}";

  fetch('${apiUrl}', { method: "GET", headers: headers })
    .then((response) => response.json())
    .then((data) => {
      // Convert the response to formatted JSON and print the name property
      console.log("Fetched data:", data);
      console.log(JSON.stringify(data, null, 4));
    })
    .catch((error) => console.error("Error:", error));
}

console.log(getParts('62a7ab458b99e34ed83845be', '9408e6b202b14fd153ac2526','98493d8e9cbe8aa35cec494b'));



// interface GetPartsResponse {
//   d: "62a7ab458b99e34ed83845be";
//   w: "9408e6b202b14fd153ac2526";
// }

// const baseUrl = "https://cad.onshape.com/api/v6/parts";
// const documentId = "62a7ab458b99e34ed83845be";
// const workspaceId = "9408e6b202b14fd153ac2526";
// const path = `d/${documentId}/w/${workspaceId}`;
// const apiKeys = "Q0R1amZjMTdtZjhNT3R6ZTh2Y3A1b2h5OjZnN3FGT2VPRThScDJJc003bVlYRjBBSWdoVGg5b1VYZW05VjZRb1hkYk53MlRzSw==";

// // Query parameters
// const params = new URLSearchParams({
//   elementId: "98493d8e9cbe8aa35cec494b",
//   withThumbnails: "false",
//   includePropertyDefaults: "false",
// });

// // Construct the full URL
// // const apiUrl = `${baseUrl}/${path}?${params.toString()}`;
// // console.log(apiUrl);
// // const apiUrl = 'https://cad.onshape.com/api/documents/'+{documentId};
// const apiUrl = "https://cad.onshape.com/api/v6/documents/62a7ab458b99e34ed83845be";
// // const apiUrl2 = 'https://cad.onshape.com/api/v6/parts/d/62a7ab458b99e34ed83845be/w/9408e6b202b14fd153ac2526/e/98493d8e9cbe8aa35cec494b?withThumbnails=false&includePropertyDefaults=false';
// const apiUrl2 = 'https://cad.onshape.com/api/v6/parts/d/62a7ab458b99e34ed83845be/w/9408e6b202b14fd153ac2526/e/98493d8e9cbe8aa35cec494b?withThumbnails=false&includePropertyDefaults=false';
// const headers = {
  
//   'Accept': 'application/json;charset=UTF-8; qs=0.09',
//   'Content-Type': 'application/json;charset=utf-8 ',
//   'Authorization': `Basic ${apiKeys}`
//     };

// // async function getData(url: string): Promise<any> {
// //   try {
// //     const response = await fetch(url, {
// //       method: "GET",
     
// //   });

// //     // Check if the response is OK (status code 200-299)
// //     if (!response.ok) {
// //       throw new Error(`Error: ${response.statusText}`);
// //     }

// //     // Parse the JSON response
// //     const data = await response.json();
// //     return data;
// //   } catch (error) {
// //     console.error("Failed to fetch data:", error);
// //     return null;
// //   }
// // }

// // getData(apiUrl).then((data) => {
// //   if (data) {
// //     console.log("Fetched data:", data);
// //   } else {
// //     console.log("No data fetched.");
// //   }
// // });

// // fetch(`${apiUrl}`, { method: 'GET', headers: headers })
// //   .then(response => response.json())
// //   .then(data => {
// //     // Convert the response to formatted JSON and print the `name` property
// //     console.log("Fetched data:", data);
// //     console.log(JSON.stringify(data, null, 4));
// //   })
// //   .catch(error => console.error('Error:', error));

// fetch(`${apiUrl2}`, { method: 'GET', headers: headers })
//   .then(response => response.json())
//   .then(data => {
//     // Convert the response to formatted JSON and print the `name` property
//     console.log("Fetched data:", data);
//     console.log(JSON.stringify(data, null, 4));
//   })
//   .catch(error => console.error('Error:', error));