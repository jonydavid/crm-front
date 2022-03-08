export const componentsHelpers = {
  mapHeader,
  mapValue

};

function mapHeader(headers: any) {
  let result: Record<string, any> = {};
  const results: Record<string, any>[] = [];
  headers.forEach((v: any) => {
    Object.keys(v).forEach((x) => {
      result[x] = v[x as keyof typeof v].title;
    });
    results.push({ ...result });
  });
  return results[0];
}

function mapValue(values: any) {
  let result: Record<string, any> = {};
  const results: Record<string, any>[] = [];
  values.forEach((v: any) => {
    Object.keys(v).forEach((x) => {
      result[x] = v[x as keyof typeof v].value;
    });
    results.push({ ...result });
  });
  return results;
}
