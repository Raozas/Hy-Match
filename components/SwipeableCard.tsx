import { Check, X } from "phosphor-react-native";
import React, { useRef, useState } from "react";
import { Animated, Dimensions, PanResponder, Text, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import CardComponent, { JobData } from "./CardComponent";

const { width: screenWidth } = Dimensions.get("window");
const SWIPE_THRESHOLD = 100;

interface SwipeableCardProps {
  jobData: JobData;
  onSwipeLeft?: (jobData: JobData) => void;
  onSwipeRight?: (jobData: JobData) => void;
  onSwipeStateChange?: (direction: "left" | "right" | null) => void;
  className?: string;
}

const SwipeableCard = ({
  jobData,
  onSwipeLeft,
  onSwipeRight,
  onSwipeStateChange,
  className,
}: SwipeableCardProps) => {
  const { colors } = useTheme();
  const pan = useRef(new Animated.ValueXY()).current;
  const [showStamp, setShowStamp] = useState<"refuse" | "choose" | null>(null);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 10 || Math.abs(gestureState.dy) > 10;
      },
      onPanResponderGrant: () => {
        pan.setOffset({
          x: (pan.x as any)._value,
          y: (pan.y as any)._value,
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        // Show stamp when card moves beyond threshold
        if (Math.abs(gestureState.dx) > SWIPE_THRESHOLD) {
          if (gestureState.dx > 0 && showStamp !== "choose") {
            setShowStamp("choose");
            onSwipeStateChange?.("right");
          } else if (gestureState.dx < 0 && showStamp !== "refuse") {
            setShowStamp("refuse");
            onSwipeStateChange?.("left");
          }
        } else if (showStamp !== null) {
          setShowStamp(null);
          onSwipeStateChange?.(null);
        }

        Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        })(evt, gestureState);
      },
      onPanResponderRelease: (evt, gestureState) => {
        pan.flattenOffset();

        if (gestureState.dx > SWIPE_THRESHOLD) {
          // Swipe right - Choose
          Animated.timing(pan, {
            toValue: { x: screenWidth + 100, y: gestureState.dy },
            duration: 300,
            useNativeDriver: false,
          }).start(() => {
            onSwipeRight?.(jobData);
            resetCard();
          });
        } else if (gestureState.dx < -SWIPE_THRESHOLD) {
          // Swipe left - Refuse
          Animated.timing(pan, {
            toValue: { x: -screenWidth - 100, y: gestureState.dy },
            duration: 300,
            useNativeDriver: false,
          }).start(() => {
            onSwipeLeft?.(jobData);
            resetCard();
          });
        } else {
          // Return to center
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
          setShowStamp(null);
          onSwipeStateChange?.(null);
        }
      },
    })
  ).current;

  const resetCard = () => {
    pan.setValue({ x: 0, y: 0 });
    setShowStamp(null);
    onSwipeStateChange?.(null);
  };

  const rotate = pan.x.interpolate({
    inputRange: [-screenWidth / 2, 0, screenWidth / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp",
  });

  const opacity = pan.x.interpolate({
    inputRange: [-screenWidth / 2, 0, screenWidth / 2],
    outputRange: [0.5, 1, 0.5],
    extrapolate: "clamp",
  });

  const renderStamp = () => {
    if (!showStamp) return null;

    const isChoose = showStamp === "choose";
    const stampColor = isChoose ? "#4CAF50" : "#F44336";
    const StampIcon = isChoose ? Check : X;
    const stampText = isChoose ? "選択" : "拒否";

    return (
      <View
        style={{
          position: "absolute",
          top: 50,
          right: isChoose ? undefined : 20,
          left: isChoose ? 20 : undefined,
          zIndex: 10,
          backgroundColor: stampColor,
          borderRadius: 50,
          width: 100,
          height: 100,
          justifyContent: "center",
          alignItems: "center",
          transform: [{ rotate: isChoose ? "-15deg" : "15deg" }],
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <StampIcon size={40} color="white" weight="bold" />
        <Text
          style={{
            color: "white",
            fontSize: 12,
            fontWeight: "bold",
            marginTop: 4,
          }}
        >
          {stampText}
        </Text>
      </View>
    );
  };

  return (
    <Animated.View
      style={{
        transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate }],
        opacity,
      }}
      {...panResponder.panHandlers}
    >
      <View style={{ position: "relative" }}>
        {renderStamp()}
        <CardComponent jobData={jobData} className={className} />
      </View>
    </Animated.View>
  );
};

export default SwipeableCard;
