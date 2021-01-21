export const ChannelATSC1Header = [
  { type: "edit" },
  { data: "INPUT TYPE", size: "small" },
  { data: "DISPLAY NAME & AFFILIATION", size: "large" },
  { data: "VIRTUAL CHANNEL", size: "small" },
  { data: "PHYSICAL CHANNEL", size: "small" },
  { data: "INPUT VIDEO FORMAT", size: "small" },
  { data: "OUTPUT VIDEO FORMAT", size: "small" },
  { data: "AFD", size: "small" },
  { data: "OUTPUT ASPECT RATIO", size: "small" },
  { data: "PMT PID", size: "small" },
  { data: "PCR/VIDEO PID", size: "small" },
  { data: "AUDIO 1 PID", size: "small" },
  { data: "AUDIO 1 TYPE", size: "large" },
  { data: "AUDIO 1 BITRATE", size: "small" },
  { data: "AUDIO 2 PID", size: "small" },
  { data: "AUDIO 2 TYPE", size: "small" },
  { data: "AUDIO 2 BITRATE", size: "small" },
];

export function ChannelATSC1({
  inputType,
  name,
  virtual,
  physical,
  videoTypeIn,
  videoTypeOut,
  aspectRatio,
  afd,
  pmtPid,
  pcrPid,
  audio1Type,
  audio1Bitrate,
  audio1Pid,
  audio2Type,
  audio2Bitrate,
  audio2Pid,
}) {
  return [
    { type: "edit", keyRef: "edit" },
    {
      keyRef: "inputType",
      data: inputType,
      size: "small",
      input: {
        type: "select",
        options: [
          { label: "SDI", value: "SDI" },
          { label: "IP", value: "IP" },
        ],
      },
    },
    {
      keyRef: "name",
      data: name,
      input: { type: "input" },
    },
    {
      keyRef: "virtual",
      data: virtual,
      size: "small",
      input: { type: "input" },
    },
    {
      keyRef: "physical",
      data: physical,
      size: "small",
      input: { type: "input" },
    },
    {
      keyRef: "videoTypeIn",
      data: videoTypeIn,
      size: "small",
      input: {
        type: "select",
        options: [
          { label: "1080i", value: "1080i" },
          { label: "720p", value: "720p" },
          { label: "480i", value: "480i" },
        ],
      },
    },
    {
      keyRef: "videoTypeOut",
      data: videoTypeOut,
      size: "small",
      input: {
        type: "select",
        options: [
          { label: "1080i", value: "1080i" },
          { label: "720p", value: "720p" },
          { label: "480i", value: "480i" },
        ],
      },
    },
    {
      keyRef: "afd",
      data: afd,
      size: "small",
      input: {
        type: "select",
        options: [
          { label: "", value: "" },
          { label: "Yes", value: "Yes" },
          { label: "No", value: "No" },
        ],
      },
    },
    {
      keyRef: "aspectRatio",
      data: aspectRatio,
      size: "small",
      input: {
        type: "select",
        options: [
          { label: "", value: "" },
          { label: "4x3", value: "4x3" },
          { label: "16x9", value: "16x9" },
        ],
      },
    },
    {
      keyRef: "pmtPid",
      data: pmtPid,
      size: "small",
      input: { type: "input" },
    },
    {
      keyRef: "pcrPid",
      data: pcrPid,
      size: "small",
      input: { type: "input" },
    },
    {
      keyRef: "audio1Pid",
      data: audio1Pid,
      size: "small",
      input: { type: "input" },
    },
    {
      keyRef: "audio1Type",
      data: audio1Type,
      size: "large",
      input: {
        type: "select",
        options: [
          { label: "", value: "" },
          { label: "PCM 2.0", value: "PCM 2.0" },
          { label: "PCM 5.1", value: "PCM 5.1" },
          { label: "AC-3", value: "AC-3" },
          { label: "AC-3 Passthrough", value: "AC-3 Passthrough" },
          { label: "AC-4", value: "AC-4" },
        ],
      },
    },
    {
      keyRef: "audio1Bitrate",
      data: audio1Bitrate,
      size: "small",
      input: {
        type: "select",
        options: [
          { label: "", value: "" },
          { label: "448kbs", value: "448kbs" },
          { label: "384kbs", value: "384kbs" },
          { label: "192kbs", value: "192kbs" },
          { label: "128kbs", value: "128kbs" },
          { label: "96kbs", value: "96kbs" },
        ],
      },
    },
    {
      keyRef: "audio2Pid",
      data: audio2Pid,
      size: "small",
      input: { type: "input" },
    },
    {
      keyRef: "audio2Type",
      data: audio2Type,
      size: "large",
      input: {
        type: "select",
        options: [
          { label: "", value: "" },
          { label: "PCM 2.0", value: "PCM 2.0" },
          { label: "PCM 5.1", value: "PCM 5.1" },
          { label: "AC-3", value: "AC-3" },
          { label: "AC-3 Passthrough", value: "AC-3 Passthrough" },
          { label: "AC-4", value: "AC-4" },
        ],
      },
    },
    {
      keyRef: "audio2Bitrate",
      data: audio2Bitrate,
      size: "small",
      input: {
        type: "select",
        options: [
          { label: "", value: "" },
          { label: "448kbs", value: "448kbs" },
          { label: "384kbs", value: "384kbs" },
          { label: "192kbs", value: "192kbs" },
          { label: "128kbs", value: "128kbs" },
          { label: "96kbs", value: "96kbs" },
        ],
      },
    },
  ];
}
