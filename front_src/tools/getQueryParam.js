

export default function(param,location) {
  const urlParams = new URLSearchParams(location.search);
  return urlParams.get(param);
}
