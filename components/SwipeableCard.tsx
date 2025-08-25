import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Animated, Dimensions, PanResponder, Text, View } from "react-native";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import CardComponent, { JobData } from "./CardComponent";

const { width: screenWidth } = Dimensions.get("window");
const SWIPE_THRESHOLD = 100;
const SWIPE_VELOCITY_THRESHOLD = 0.3;

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

  // Reset local state when jobData changes (new card appears)
  useEffect(() => {
    setShowStamp(null);
    setCurrentSwipeDistance(0);
    pan.setValue({ x: 0, y: 0 });
  }, [jobData.id, pan]);

  // Memoize animated values to improve performance
  const rotate = useMemo(
    () =>
      pan.x.interpolate({
        inputRange: [-screenWidth / 2, 0, screenWidth / 2],
        outputRange: ["-15deg", "0deg", "15deg"],
        extrapolate: "clamp",
      }),
    [pan.x]
  );

  const opacity = useMemo(
    () =>
      pan.x.interpolate({
        inputRange: [-screenWidth / 2, 0, screenWidth / 2],
        outputRange: [0.6, 1, 0.6],
        extrapolate: "clamp",
      }),
    [pan.x]
  );

  const scale = useMemo(
    () =>
      pan.x.interpolate({
        inputRange: [-screenWidth / 2, 0, screenWidth / 2],
        outputRange: [0.95, 1, 0.95],
        extrapolate: "clamp",
      }),
    [pan.x]
  );

  // Optimized animation completion handler
  const handleAnimationComplete = useCallback(
    (direction: "left" | "right") => {
      // Clear state immediately before calling handlers to prevent flicker
      setShowStamp(null);
      setCurrentSwipeDistance(0);
      onSwipeStateChange?.(null);
      pan.setValue({ x: 0, y: 0 });

      // Call the swipe handlers after state cleanup
      if (direction === "left") {
        onSwipeLeft?.(jobData);
      } else {
        onSwipeRight?.(jobData);
      }
    },
    [jobData, onSwipeLeft, onSwipeRight, onSwipeStateChange, pan]
  );

  // Optimized swipe state change handler
  const updateSwipeState = useCallback(
    (gestureState: any) => {
      const swipePercentage = Math.abs(gestureState.dx) / screenWidth;
      setCurrentSwipeDistance(Math.abs(gestureState.dx));

      if (swipePercentage >= 0.15) {
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
    },
    [showStamp, onSwipeStateChange]
  );

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // More sensitive gesture detection
        return Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {
        // Use native driver compatible approach
        pan.setOffset({
          x: (pan.x as any)._value,
          y: (pan.y as any)._value,
        });
      },
      onPanResponderMove: (evt, gestureState) => {
        updateSwipeState(gestureState);

        // Use native driver for better performance
        Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        })(evt, gestureState);
      },
      onPanResponderRelease: (evt, gestureState) => {
        pan.flattenOffset();

        const swipeVelocity = Math.abs(gestureState.vx);
        const swipeDistance = Math.abs(gestureState.dx);

        // Improved swipe detection with velocity consideration
        const shouldSwipe =
          swipeDistance > SWIPE_THRESHOLD ||
          (swipeDistance > 50 && swipeVelocity > SWIPE_VELOCITY_THRESHOLD);

        if (shouldSwipe) {
          const direction = gestureState.dx > 0 ? "right" : "left";
          const targetX =
            direction === "right" ? screenWidth + 100 : -screenWidth - 100;

          // Faster, more responsive animation
          Animated.timing(pan, {
            toValue: { x: targetX, y: gestureState.dy },
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            handleAnimationComplete(direction);
          });
        } else {
          // Smoother return to center with spring animation
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            tension: 120,
            friction: 8,
            useNativeDriver: false,
          }).start(() => {
            setShowStamp(null);
            setCurrentSwipeDistance(0);
            onSwipeStateChange?.(null);
          });
        }
      },
    })
  ).current;

  // Memoized stamp component for better performance
  const renderStamp = useCallback(() => {
    if (!showStamp || currentSwipeDistance === 0) return null;

    const isChoose = showStamp === "choose";
    const stampColor = isChoose ? "#4CAF50" : "#F44336";
    const stampText = isChoose ? t("swipe.choose") : t("swipe.refuse");

    const swipePercentage = currentSwipeDistance / screenWidth;
    let stampOpacity = 0;

    if (swipePercentage >= 0.15) {
      if (swipePercentage >= 0.5) {
        stampOpacity = 1;
      } else {
        stampOpacity = 0.2 + ((swipePercentage - 0.15) / (0.5 - 0.15)) * 0.8;
      }
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
          borderWidth: 8,
          borderRadius: 50,
          width: 100,
          height: 100,
          justifyContent: "center",
          alignItems: "center",
          transform: [{ rotate: isChoose ? "-15deg" : "15deg" }],
          opacity: stampOpacity,
        }}
      >
        <Text
          style={{
            color: stampColor,
            fontSize: 18,
            fontWeight: "bold",
            marginTop: 4,
          }}
        >
          {stampText}
        </Text>
      </View>
    );
  }, [showStamp, currentSwipeDistance, t]);

  // Memoized background cards for better performance
  const backgroundCards = useMemo(() => {
    return nextCards.slice(0, maxVisibleCards - 1).map((card, index) => (
      <View
        key={`bg-${card.id}`}
        style={{
          position: "absolute",
          top: (index + 1) * 20,
          left: 0,
          right: 0,
          transform: [{ scale: 1 - (index + 1) * 0.04 }],
          zIndex: maxVisibleCards - index - 2,
          opacity: 0.8 - index * 0.2,
        }}
      >
        <CardComponent jobData={card} className={className} />
      </View>
    ));
  }, [nextCards, maxVisibleCards, className]);

  return (
    <View style={{ position: "relative" }}>
      {backgroundCards}

      <Animated.View
        style={{
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
            { rotate },
            { scale },
          ],
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
