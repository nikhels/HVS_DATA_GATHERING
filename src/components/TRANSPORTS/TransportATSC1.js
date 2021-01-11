export const TransportATSC1Header =
  [
    { type: "add" },
    { data: "MAIN TRANSPORT" },
    { data: "SECONDARY TRANSPORT" },
    { data: "OUTPUT IP ADDRESS" },
    { data: "PORT" },
    { data: "BITRATE" },
    { data: "TSID" },
  ];



export function TransportATSC1({
  TStype1,
  TStype2,
  TSoutputIpAddress,
  TSoutputIpPort,
  TSbitrate,
  tsid,
}) {
  return [
    { type: "edit", keyRef:"edit" },
    {

      keyRef: "TStype1",
      data: TStype1,
      input: {
        type: "select",
        options: [
          { label: "IP OUT", value: "IP OUT" },
          { label: "ASI OUT", value: "ASI OUT" },
        ],
      },
    },
    {
      keyRef: "TStype2",
      data: TStype2,
      input: {
        type: "select",
        options: [
          { label: "IP OUT", value: "IP OUT" },
          { label: "ASI OUT", value: "ASI OUT" },
        ],
      },
    },
    {
      keyRef: "TSoutputIpAddress",
      data: TSoutputIpAddress,
      input: { type: "input" },
    },
    {
      keyRef: "TSoutputIpPort",
      data: TSoutputIpPort,
      input: { type: "input" },
    },
    {
      keyRef: "TSbitrate",
      data: TSbitrate,
      input: { type: "input" },
    },
    {
      keyRef: "tsid",
      data: tsid,
      input: { type: "input" },
    },
  ]
  
}
