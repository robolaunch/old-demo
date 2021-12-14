import { Button } from "@chakra-ui/button";
import { background, position } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
// @ts-ignore
import GuacamoleKeyboard from "../../utils/guacamole-keyboard.ts";
interface Props {
  port: number;
  ip: string;
}

const Stream: React.FC<Props> = ({ port, ip }) => {
  const video = useRef<HTMLVideoElement>(null);
  const peer = useRef<any>(null);
  const candidate = useRef<any>(null);
  const channel = useRef<any>(null);
  const controlReq = useRef<any>(false);
  const client = useRef<any>(null);
  const overlay = useRef<any>();

  const keyboard = useRef<any>(null);
  const [muteState, setMuteState] = useState(true);
  const onTrack = (event: RTCTrackEvent) => {
    console.log(
      "debug",
      `received ${event.track.kind} track from peer: ${event.track.id}`,
      event
    );
    // console.log(event.streams[0]);
    // @ts-ignore: Unreachable code error
    if (event.track.kind === "video") {
      video.current!.srcObject = event.streams[0];
      video.current?.play();
      console.log("stream assigned!");
    }
  };
  const onConnection = (event: any) => {
    const connectionState = peer.current.iceConnectionState;
    console.log(
      "debug",
      `peer.current ice connection state changed: ${
        peer.current!.iceConnectionState
      }`
    );

    switch (connectionState) {
      case "checking":
        console.log("checking");
        break;
      case "connected":
        console.log("connected");
        break;
      case "failed":
        console.log("failed");
        break;
      case "disconnected":
        console.log("disconnected");
        break;
    }
    // console.log(event.streams[0]);
    // @ts-ignore: Unreachable code error
    video.current.srcObject = event.streams[0];
  };
  const handleKeyboard = () => {
    if (!controlReq.current) {
      overlay.current?.focus();
      client.current.send(JSON.stringify({ event: "control/request" }));
      controlReq.current = true;
    }
  };
  const disableKeyboard = () => {
    if (controlReq.current) {
      console.log("heey");
      client.current.send(JSON.stringify({ event: "control/release" }));
      controlReq.current = false;
    }
  };
  let buffer: ArrayBuffer;
  let payload: DataView;
  useEffect(() => {
    client.current = new WebSocket(`ws://${ip}:${port}/ws?password=admin`);
    video.current?.focus();
    keyboard.current = GuacamoleKeyboard();
    keyboard.current.onkeydown = (key: number) => {
      console.log(key);
      buffer = new ArrayBuffer(11);
      payload = new DataView(buffer);
      payload.setUint8(0, 0x03);
      payload.setUint16(1, 8, true);
      payload.setBigUint64(3, BigInt(key), true);
      console.log(typeof buffer);
      if (
        typeof buffer !== "undefined" &&
        channel.current!.readyState === "open"
      ) {
        console.log(channel.current.readyState, "READY STATE");
        channel.current!.send(buffer);
      }
    };

    keyboard.current.onkeyup = (key: number) => {
      buffer = new ArrayBuffer(11);
      payload = new DataView(buffer);
      payload.setUint8(0, 0x04);
      payload.setUint16(1, 8, true);
      payload.setBigUint64(3, BigInt(key), true);
      if (typeof buffer !== "undefined") {
        channel.current!.send(buffer);
        console.log("cancelled with gua!");
      }
    };
    keyboard.current.listenTo(overlay.current);
    overlay.current.liste;
    video.current?.addEventListener("mousemove", (key) => {
      // 0x01;
      if (typeof video.current === "undefined") return;
      const rect = video.current?.getBoundingClientRect();
      if (rect) {
        buffer = new ArrayBuffer(7);
        payload = new DataView(buffer);
        payload.setUint8(0, 0x01);
        payload.setUint16(1, 4, true);
        payload.setUint16(
          3,
          Math.round((1920 / rect.width) * (key.clientX - rect.left)),
          true
        );
        payload.setUint16(
          5,
          Math.round((1080 / rect.height) * (key.clientY - rect.top)),
          true
        );
        if (
          typeof buffer !== "undefined" &&
          channel.current.readyState === "open"
        ) {
          channel.current!.send(buffer);
        }
      }
    });
    video.current?.addEventListener("mouseenter", () => {
      overlay.current!.focus();
    });
    video.current?.addEventListener("mousedown", (key) => {
      // 0x01;
      // overlay.current!.focus();
      // console.log;
      key.preventDefault();
      overlay.current!.focus();
      if (controlReq) {
        buffer = new ArrayBuffer(11);
        payload = new DataView(buffer);
        payload.setUint8(0, 0x03);
        payload.setUint16(1, 8, true);
        payload.setBigUint64(3, BigInt(key.button + 1), true);
        if (
          typeof buffer !== "undefined" &&
          channel.current.readyState === "open"
        ) {
          channel.current!.send(buffer);
          console.log("cancelled!");
        }
      }
    });
    video.current?.addEventListener("wheel", (key) => {
      // 0x01;
      if (controlReq) {
        buffer = new ArrayBuffer(7);
        payload = new DataView(buffer);
        payload.setUint8(0, 0x02);
        payload.setUint16(1, 4, true);
        payload.setInt16(3, key.deltaX / -100, true);
        payload.setInt16(5, key.deltaY / -100, true);
        if (
          typeof buffer !== "undefined" &&
          channel.current.readyState === "open"
        ) {
          channel.current!.send(buffer);
          console.log("cancelled!");
        }
      }
    });
    video.current?.addEventListener("mouseup", (key) => {
      // 0x01;
      if (controlReq) {
        console.log(key.button + 1);
        buffer = new ArrayBuffer(11);
        payload = new DataView(buffer);
        payload.setUint8(0, 0x04);
        payload.setUint16(1, 8, true);
        payload.setBigUint64(3, BigInt(key.button + 1), true);
        if (
          typeof buffer !== "undefined" &&
          channel.current.readyState === "open"
        ) {
          channel.current!.send(buffer);
          console.log("cancelled!");
        }
      }
    });

    const onData = () => {
      console.log("data coming");
    };
    const onError = (e: any) => {
      console.log("error:", e.error);
    };
    client.current.onopen = () => {
      console.log("websocket connected");
    };
    client.current.onmessage = (e: any) => {
      const { event, ...payload } = JSON.parse(e.data);
      //   console.log(event);
      if (event === "control/locked") {
        client.current.send(
          JSON.stringify({ event: "control/keyboard", layout: "us" })
        );
        client.current.send(
          JSON.stringify({
            event: "control/keyboard",
            capsLock: false,
            numLock: true,
            scrollLock: false,
          })
        );
      }
      if (event === "signal/candidate") {
        const newPayload = JSON.parse(payload.data);
        if (peer.current) {
          peer.current.addIceCandidate(newPayload);
        } else {
          candidate.current = newPayload;
        }
        console.log(newPayload);
      }
      if (event === "signal/provide") {
        console.log("RTC here!");
        console.log(payload);
        const { sdp, lite, ice, id } = payload;
        peer.current = new RTCPeerConnection();
        // const test = new RTCPeerConnection();
        // test.co;
        peer.current.ontrack = onTrack.bind(this);
        peer.current.addTransceiver("video", { direction: "recvonly" });
        peer.current.addTransceiver("audio", { direction: "recvonly" });

        channel.current = peer.current.createDataChannel("data");
        channel.current.onerror = onError.bind(this);
        channel.current.onmessage = onData.bind(this);
        // channel.onclose = onDisconnected.bind(
        //   this,
        //   new Error("peer data channel closed")
        // );
        peer.current.addIceCandidate(candidate.current);

        peer.current.setRemoteDescription({ type: "offer", sdp });

        peer.current.onconnectionstatechange = (event: any) => {
          console.log("Connection State: ", peer.current.connectionState);
          if (peer.current.connectionState === "connected") {
            video.current?.focus();
            video.current?.play();
          }
        };

        peer.current.onsignalingstatechange = (event: any) => {
          console.log(peer.current.signalingState, "signaling");
        };

        peer.current.oniceconnectionstatechange = (event: any) => {
          console.log(peer.current.iceConnectionState);
        };

        peer.current.createAnswer().then((d: any) => {
          peer.current!.setLocalDescription(d);
          client.current!.send(
            JSON.stringify({
              event: "signal/answer",
              sdp: d.sdp,
              displayname: "neko",
            })
          );
        });
      }
    };
    return () => {
      client.current.close();
      keyboard.current.reset();
      // document.removeEventListener()
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        margin: "auto",
        padding: "10px 30px",
      }}
    >
      <div
        style={{
          margin: "auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <video
          playsInline
          ref={video}
          autoPlay
          muted={muteState}
          controls={false}
          style={{
            cursor: "none",
            maxWidth: "90%",
            backgroundColor: "#000",
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={disableKeyboard}>Disable keyboard</Button>

        <Button onClick={handleKeyboard}>Connect keyboard</Button>
        <Button onClick={() => video.current?.play()}>Play Mate</Button>
        <Button
          onClick={() => {
            video.current?.requestFullscreen();
          }}
        >
          Fullscreen
        </Button>
        <Button
          onClick={() => {
            overlay.current!.focus();
          }}
        >
          focus
        </Button>
        <Button onClick={() => setMuteState(!muteState)}>Mute/Unmute</Button>
        <div
          style={{
            height: "100%",
            width: "100%",
            top: 0,

            position: "absolute",
            zIndex: "-1",
          }}
          ref={overlay}
          tabIndex={1}
        ></div>
      </div>
    </div>
  );
};

export default Stream;
