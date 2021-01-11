export const PsipATSC1Header = [
  { type: "add" },
  { size: "medium", data: "PSIP UNIT" },
  { size: "medium", data: "IP ADDRESS" },
  { size: "medium", data: "SUBNET" },
  { size: "medium", data: "GATEWAY" },
  { size: "medium", data: "PORT" },
  { size: "medium", data: "PROVIDER FTP" },
  { size: "medium", data: "USERNAME" },
  { size: "medium", data: "PASSWORD" },
];

export function PsipATSC1({
  psipName,
  psipIp,
  psipSubnet,
  psipGateway,
  psipPort,
  psipProvider,
  psipUsername,
  psipPassword,
}) {
  return [
    { type: "edit", keyRef: "edit" },
    {
      keyRef: "psipName",
      data: psipName,
      input: { type: "input" },
    },
    {
      keyRef: "psipIp",
      data: psipIp,
      input: { type: "input" },
    },
    {
      keyRef: "psipSubnet",
      data: psipSubnet,
      input: { type: "input" },
    },
    {
      keyRef: "psipGateway",
      data: psipGateway,
      input: { type: "input" },
    },
    {
      keyRef: "psipPort",
      data: psipPort,
      input: { type: "input" },
    },
    {
      keyRef: "psipProvider",
      data: psipProvider,
      input: { type: "input" },
    },
    {
      keyRef: "psipUsername",
      data: psipUsername,
      input: { type: "input" },
    },
    {
      keyRef: "psipPassword",
      data: psipPassword,
      input: { type: "input" },
    },
  ];
}
