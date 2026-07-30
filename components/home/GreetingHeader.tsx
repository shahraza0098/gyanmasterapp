// import { View, Text, StyleSheet } from "react-native";
// import { Image } from "expo-image";

// interface GreetingHeaderProps {
//   name?: string;
//   image?: string | null;
// }

// export default function GreetingHeader({
//   name,
//   image,
// }: GreetingHeaderProps) {
//   const hour = new Date().getHours();

//   let greeting = "Good Evening";

//   if (hour < 12) {
//     greeting = "Good Morning";
//   } else if (hour < 17) {
//     greeting = "Good Afternoon";
//   }

//   return (
//     <View style={styles.container}>
//       <View style={{ flex: 1 }}>
//         <Text style={styles.greeting}>
//           {greeting} 👋
//         </Text>

//         <Text style={styles.name}>
//           {name ?? "Student"}
//         </Text>
//       </View>

//       <Image
//         source={
//           image
//             ? { uri: image }
//             : require("@/assets/images/icon.png")
//         }
//         style={styles.avatar}
//         contentFit="cover"
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 20,
//     marginBottom: 24,
//   },

//   greeting: {
//     fontSize: 18,
//     color: "#777",
//   },

//   name: {
//     marginTop: 4,
//     fontSize: 28,
//     fontWeight: "700",
//     color: "#111",
//   },

//   avatar: {
//     width: 55,
//     height: 55,
//     borderRadius: 28,
//   },
// });



//gemini UI

import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { useAppTheme } from "@/providers/ThemeProvider";

interface GreetingHeaderProps {
  name?: string;
  image?: string | null;
}

export default function GreetingHeader({
  name,
  image,
}: GreetingHeaderProps) {
  const theme = useAppTheme();
  // --- Logic remains completely unchanged ---
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  }
  // ------------------------------------------

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={[styles.greeting, { color: theme.textMuted }]}>
          {greeting} 👋
        </Text>

        <Text style={[styles.name, { color: theme.text }]}>
          {name ?? "Student"}
        </Text>
      </View>

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Ensures the avatar is pushed to the far right
  },
  
  textContainer: {
    flex: 1,
    paddingRight: 16, // Prevents long names from overlapping the avatar
  },

  greeting: {
    fontSize: 15,
    fontWeight: "500",
    color: "#64748B", // A sophisticated slate gray instead of harsh #777
    letterSpacing: 0.2, // Gives the greeting a bit of breathing room
    marginBottom: 4,
  },

  name: {
    fontSize: 26,
    fontWeight: "800", // Extra bold looks very modern for headers
    color: "#0F172A", // Deep slate/navy (almost black) for premium contrast
    letterSpacing: -0.5, // Tightening large text is a modern UI trick
  },

  // Added a wrapper for the avatar to create a beautiful bordered shadow effect
  avatarRing: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3, // For Android shadow support
  },

  avatar: {
    width: 54, // Slightly smaller than the ring to create a border effect
    height: 54,
    borderRadius: 27,
  },
});
