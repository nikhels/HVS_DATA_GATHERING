import { v4 as uuidv4 } from 'uuid';

export function ChannelConstructor(x,virtual,physical){
  
  
  this.id = parseFloat("1." + x)
  this.inputType = "SDI"
  this.name = 'Channel ' + x
  this.virtual = parseFloat(virtual + "." + x) || 10
  this.physical= parseFloat(physical + "." + (x + 2)) || 10
  this.pmtPid = (x + 2) * 10
  this.pcrPid = ((x + 2) * 10) + 1
  this.audio1Pid = ((x + 2) * 10) + 4
  this.aspectRatio = "16x9"
  this.selected = false
  this.afd = "No"
  if(x===1) {
    this.videoTypeIn = "1080i"
    this.videoTypeOut = "1080i"
    this.audio1Bitrate = "384kbs"
    this.audio1Type = "PCM 5.1"
  }
  if(x!==1) {
    this.videoTypeIn = "480i"
    this.videoTypeOut = "480i"
    this.audio1Bitrate = "192kbs"
    this.audio1Type = "PCM 2.0"
    
  }   
}

export function IpAddressConstructor(x,ipAddressesCount){
  // this.key = uuidv4()
  this.id = uuidv4()
  this.name = "IP 1"
  if (ipAddressesCount > 1){
    if (x === 1) this.name = "IP 1 - NMX"
    if (x === 2) this.name = "IP 2 - ESXI"
    if (x === 3) this.name = "IP 3 - PSIP"
  }
  this.ip = ("192.168.1.1" + x)
  this.subnet = "255.255.255.0"
  this.gateway="192.168.1.1"
}