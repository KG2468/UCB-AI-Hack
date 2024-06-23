interface GetPartsResponse {
  d: "62a7ab458b99e34ed83845be";
  w: "9408e6b202b14fd153ac2526";
}

const baseUrl = "https://cad.onshape.com/api/v6/parts";
const documentId = "62a7ab458b99e34ed83845be";
const workspaceId = "9408e6b202b14fd153ac2526";
const path = `d/${documentId}/w/${workspaceId}`;

// Query parameters
const params = new URLSearchParams({
  elementId: "98493d8e9cbe8aa35cec494b",
  withThumbnails: "false",
  includePropertyDefaults: "false",
});

// Construct the full URL
const apiUrl = `${baseUrl}/${path}?${params.toString()}`;
console.log(apiUrl);

async function getData(url: string): Promise<any> {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json;charset=UTF-8;qs=0.09",
        Authorization: `Basic ${btoa("OUppbmd2eGRhSjVPdWR2SkpVVmU2WXF2OmJOSzBBY3I4dTVKUlpYaEhXRGJGcWJ3eXd1NE9HaXpYVldZQjdVdDdpRUJuMlNKSQ==")}`,
      },
    });

    // Check if the response is OK (status code 200-299)
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    // Parse the JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null;
  }
}

getData(apiUrl).then((data) => {
  if (data) {
    console.log("Fetched data:", data);
  } else {
    console.log("No data fetched.");
  }
});
