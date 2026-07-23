// import React from "react";
// import {
//   ActivityIndicator,
//   StyleSheet,
//   View,
// } from "react-native";

// import {
//   VideoView,
//   useVideoPlayer,
// } from "expo-video";

// import {
//   useEvent,
//   useEventListener,
// } from "expo";

// interface VideoPlayerProps {
//   streamUrl: string;

//   watchedSeconds: number;

//   onTimeUpdate: (
//     seconds: number
//   ) => void;

//   onEnded: () => void;
// }

// export default function VideoPlayer({
//   streamUrl,
//   watchedSeconds,
//   onTimeUpdate,
//   onEnded,
// }: VideoPlayerProps) {
//   /**
//    * Bunny HLS Player
//    */
//   const player = useVideoPlayer(
//     {
//       uri: streamUrl,

//       contentType: "hls",
//     },
//     (player) => {
//       /**
//        * Emit time update every second.
//        */
//       player.timeUpdateEventInterval = 1;

//       /**
//        * Resume playback.
//        */
//       player.currentTime =
//         watchedSeconds;

//       /**
//        * Better UX
//        */
//       player.play();
//     }
//   );

//   /**
//    * Player status
//    */
//   const { status } = useEvent(
//     player,
//     "statusChange",
//     {
//       status: player.status,
//     }
//   );

//   /**
//    * Current playback position
//    */
//   useEventListener(
//     player,
//     "timeUpdate",
//     ({ currentTime }) => {
//       onTimeUpdate(currentTime);
//     }
//   );

//   /**
//    * Lesson completed
//    */
//   useEventListener(
//     player,
//     "playToEnd",
//     () => {
//       onEnded();
//     }
//   );

//   /**
//    * Playback errors
//    */
//   useEventListener(
//     player,
//     "statusChange",
//     ({ status, error }) => {
//       if (status === "error") {
//         console.log(
//           "Video Error",
//           error
//         );
//       }
//     }
//   );

//   return (
//     <View style={styles.container}>
//       <View
//         style={styles.videoContainer}
//       >
//         <VideoView
//           player={player}
//           style={styles.video}
//           nativeControls
//           allowsFullscreen
//           allowsPictureInPicture
//           contentFit="contain"
//         />

//         {status !==
//           "readyToPlay" && (
//           <View
//             style={styles.loader}
//           >
//             <ActivityIndicator
//               size="large"
//               color="#FFFFFF"
//             />
//           </View>
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     width: "100%",
//     marginTop: 16,

//     borderRadius: 16,

//     overflow: "hidden",

//     backgroundColor: "#000",
//   },

//   videoContainer: {
//     width: "100%",

//     aspectRatio: 16 / 9,

//     backgroundColor: "#000",

//     justifyContent: "center",

//     alignItems: "center",
//   },

//   video: {
//     width: "100%",

//     height: "100%",
//   },

//   loader: {
//     ...StyleSheet.absoluteFillObject,

//     justifyContent: "center",

//     alignItems: "center",

//     backgroundColor:
//       "rgba(0,0,0,0.35)",
//   },
// });






//ckaide


import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import { useEvent, useEventListener } from "expo";

interface VideoPlayerProps {
  streamUrl: string;
  watchedSeconds: number;
  onTimeUpdate: (seconds: number) => void;
  onEnded: () => void;
}

export default function VideoPlayer({
  streamUrl,
  watchedSeconds,
  onTimeUpdate,
  onEnded,
}: VideoPlayerProps) {
  /**
   * Bunny HLS Player
   */
  const player = useVideoPlayer(
    {
      uri: streamUrl,
      contentType: "hls",
    },
    (player) => {
      /**
       * Emit time update every second.
       */
      player.timeUpdateEventInterval = 1;

      /**
       * Resume playback.
       */
      player.currentTime = watchedSeconds;

      /**
       * Better UX
       */
      player.play();
    }
  );

  /**
   * Player status
   */
  const { status } = useEvent(player, "statusChange", {
    status: player.status,
  });

  /**
   * Current playback position
   */
  useEventListener(player, "timeUpdate", ({ currentTime }) => {
    onTimeUpdate(currentTime);
  });

  /**
   * Lesson completed
   */
  useEventListener(player, "playToEnd", () => {
    onEnded();
  });

  /**
   * Playback errors
   */
  useEventListener(player, "statusChange", ({ status, error }) => {
    if (status === "error") {
      console.log("Video Error", error);
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <VideoView
          player={player}
          style={styles.video}
          nativeControls
          allowsFullscreen
          allowsPictureInPicture
          contentFit="contain"
        />

        {status !== "readyToPlay" && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  videoContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#100D18",
    justifyContent: "center",
    alignItems: "center",
    // Only the bottom is rounded — it's a full-bleed hero, not a floating card
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: "hidden",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(16,13,24,0.5)",
  },
});