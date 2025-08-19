import { Check, X } from "phosphor-react-native";
import React, { useRef, useState } from "react";
import { Animated, Dimensions, PanResponder, Text, View } from "react-native";
import { useLanguage } from "../contexts/LanguageContext";
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
  nextCards?: JobData[]; 
  maxVisibleCards?: number; 
}

const SwipeableCard = ({
  jobData,
  onSwipeLeft,
  onSwipeRight,
  onSwipeStateChange,
  className,
  nextCards = [],
  maxVisibleCards = 3,
}: SwipeableCardProps) => {
  const { colors } = useTheme();
  const { t } = useLanguage();
  const pan = useRef(new Animated.ValueXY()).current;
  const [showStamp, setShowStamp] = useState<"refuse" | "choose" | null>(null);
  const [currentSwipeDistance, setCurrentSwipeDistance] = useState(0);

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
        setCurrentSwipeDistance(Math.abs(gestureState.dx));

        const swipePercentage = Math.abs(gestureState.dx) / screenWidth;

        if (swipePercentage >= 0.1) {
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
          setCurrentSwipeDistance(0);
          onSwipeStateChange?.(null);
        }
      },
    })
  ).current;

  const resetCard = () => {
    pan.setValue({ x: 0, y: 0 });
    setShowStamp(null);
    setCurrentSwipeDistance(0);
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
    const stampText = isChoose ? t("swipe.choose") : t("swipe.refuse");

    const swipePercentage = currentSwipeDistance / screenWidth;
    let stampOpacity = 0.15;
    if (swipePercentage < 0.15) {
      stampOpacity = 0;
    }

    if (swipePercentage >= 0.5) {
      stampOpacity = 1;
    } else if (swipePercentage >= 0.1) {
      stampOpacity =
        0.15 + ((swipePercentage - 0.1) / (0.5 - 0.1)) * (1 - 0.15);
    }

    return (
      <View
        style={{
          position: "absolute",
          top: 50,
          right: isChoose ? undefined : 20,
          left: isChoose ? 20 : undefined,
          zIndex: 10,
          backgroundColor: "transparent",
          borderColor: stampColor,
          borderWidth: 10,
          borderRadius: 50,
          width: 100,
          height: 100,
          justifyContent: "center",
          alignItems: "center",
          transform: [{ rotate: isChoose ? "-15deg" : "15deg" }],
          opacity: stampOpacity,
        }}
      >
        {/* <StampIcon size={40} color={stampColor} weight="bold" /> */}
        <Text
          style={{
            color: stampColor,
            fontSize: 20,
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
    <View style={{ position: "relative" }}>
      {/* Render background cards first (they'll be behind) */}
      {nextCards.slice(0, maxVisibleCards - 1).map((card, index) => (
        <View
          key={`bg-${card.id}`}
          style={{
            position: "absolute",
            top: (index + 1) * 25,
            left: 0,
            right: 0,
            transform: [
              { scale: 1 - (index + 1) * 0.05 }, 
            ],
            zIndex: maxVisibleCards - index - 2,
            opacity: 0.7,
          }}
        >
          <CardComponent jobData={card} className={className} />
        </View>
      ))}

      {/* Main swipeable card */}
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate }],
          opacity,
          zIndex: maxVisibleCards,
        }}
        {...panResponder.panHandlers}
      >
        <View style={{ position: "relative" }}>
          {renderStamp()}
          <CardComponent jobData={jobData} className={className} />
        </View>
      </Animated.View>
    </View>
  );
};

export default SwipeableCard;
