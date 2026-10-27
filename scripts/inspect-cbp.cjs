(async () => {
  const res = await fetch("https://bwt.cbp.gov/api/waittimes");
  console.log("HTTP", res.status);
  const data = await res.json();
  console.log("Es arreglo:", Array.isArray(data), "Total:", data.length);
  const rows = data.filter((e) => ["250401", "250601"].includes(String(e.port_number)));
  console.log(JSON.stringify(rows, null, 2));
})();
