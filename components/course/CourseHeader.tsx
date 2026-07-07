// import { StyleSheet, Text, View } from "react-native";
// import { Image } from "expo-image";
// import { LinearGradient } from "expo-linear-gradient";

// interface Props {
//   title: string;
//   thumbnailUrl: string;
//   category: string;
//   level: string;
// }

// export default function CourseHeader({
//   title,
//   thumbnailUrl,
//   category,
//   level,
// }: Props) {
//   return (
//     <View style={styles.container}>
//       <Image
//         source={{ uri: thumbnailUrl }}
//         style={styles.image}
//         contentFit="cover"
//       />

//       <LinearGradient
//         colors={["transparent", "rgba(0,0,0,0.85)"]}
//         style={styles.overlay}
//       >
//         <View style={styles.badge}>
//           <Text style={styles.badgeText}>
//             {level}
//           </Text>
//         </View>

//         <Text style={styles.title}>
//           {title}
//         </Text>

//         <Text style={styles.category}>
//           {category}
//         </Text>
//       </LinearGradient>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     height: 260,
//     borderRadius: 20,
//     overflow: "hidden",
//     marginBottom: 20,
//   },

//   image: {
//     width: "100%",
//     height: "100%",
//   },

//   overlay: {
//     position: "absolute",
//     bottom: 0,
//     width: "100%",
//     padding: 20,
//   },

//   badge: {
//     alignSelf: "flex-start",
//     backgroundColor: "#2563EB",
//     borderRadius: 20,
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     marginBottom: 10,
//   },

//   badgeText: {
//     color: "#fff",
//     fontWeight: "700",
//     fontSize: 12,
//   },

//   title: {
//     color: "#fff",
//     fontSize: 24,
//     fontWeight: "700",
//   },

//   category: {
//     color: "#E5E7EB",
//     marginTop: 6,
//     fontSize: 15,
//   },
// });






//gemini Ui


import { StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  title: string;
  thumbnailUrl: string;
  category: string;
  level: string;
}

export default function CourseHeader({
  title,
  thumbnailUrl,
  category,
  level,
}: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: thumbnailUrl }}
        style={styles.image}
        contentFit="cover"
      />

      <LinearGradient
        // Using three stops creates a much smoother, "buttery" fade than two stops
        colors={["transparent", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.95)"]}
        style={styles.overlay}
      >
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {level}
          </Text>
        </View>

        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.category}>
          {category}
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 280, // Slightly taller for a more heroic, dramatic feel
    borderRadius: 24, // Smoother, more modern corner radius
    overflow: "hidden",
    marginBottom: 24,
    backgroundColor: "#E2E8F0", // Gives a nice placeholder color while the image loads
  },

  image: {
    width: "100%",
    height: "100%",
  },

  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "75%", // Giving the gradient more room to fade smoothly
    justifyContent: "flex-end", // Aligns content to the bottom naturally
    paddingHorizontal: 24,
    paddingBottom: 28, // Extra breathing room at the bottom
  },

  badge: {
    alignSelf: "flex-start",
    // An elegant, semi-transparent frosted look instead of a heavy solid color
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 30, // Fully rounded pill shape
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 12,
  },

  badgeText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 11,
    letterSpacing: 1.2, // Wide spacing on small caps screams "premium editorial"
    textTransform: "uppercase",
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: -0.5, // Tighter spacing for large, bold text
    lineHeight: 34, // Prevents multi-line titles from looking cramped
    marginBottom: 6,
  },

  category: {
    color: "rgba(255, 255, 255, 0.7)", // Softer contrast than flat gray
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: 0.3,
  },
});

