export const IpAddressHeader = [
  { type: "edit" },
  { data: "IP INTERFACE", size: "" },
  { data: "IP ADDRESS", size: "" },
];
export const IpAuxiliaryHeader = [
  { type: "edit" },
  { data: "SUBNET", size: "small" },
  { data: "GATEWAY", size: "small" },
  { data: "DNS 1", size: "small" },
  { data: "DNS 2", size: "small" },
  { data: "NTP SERVER", size: "small" },
];

export function IpAddresses({ name, ip }) {
  return [
    { type: "edit", keyRef: "edit" },
    {
      keyRef: "name",
      data: name,
      input: { type: "input" },
    },
    {
      keyRef: "ip",
      data: ip,
      input: { type: "input" },
    },
  ];
}
export function IpAuxiliary({ subnet, gateway, dns1, dns2, ntp }) {
  return [
    { type: "edit", keyRef: "edit" },
    {
      keyRef: "subnet",
      data: subnet,
      input: { type: "input" },
    },
    {
      keyRef: "gateway",
      data: gateway,
      input: { type: "input" },
    },
    {
      keyRef: "dns1",
      data: dns1,
      input: { type: "input" },
    },
    {
      keyRef: "dns2",
      data: dns2,
      input: { type: "input" },
    },
    {
      keyRef: "ntp",
      data: ntp,
      input: { type: "input" },
    },
  ];
}
