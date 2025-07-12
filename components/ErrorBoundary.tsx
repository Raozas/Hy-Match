import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View className="flex-1 justify-center items-center p-4 bg-white">
          <Text className="text-lg font-bold text-red-600 mb-4">Something went wrong</Text>
          <Text className="text-gray-600 mb-4 text-center">
            {this.state.error?.message || 'An unexpected error occurred'}
          </Text>
          <TouchableOpacity
            onPress={() => this.setState({ hasError: false })}
            className="bg-blue-500 px-4 py-2 rounded"
          >
            <Text className="text-white">Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}
