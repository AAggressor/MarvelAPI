// ErrorBoundary  це наш предохранитель!!

import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  // метод принимает в себя об'єкт ошибки и занимается только тем, что обновляет состояние
  static getDerivedStateFromError(error) {
    return { error: true };
  }

  // Сдесь используем хук по ловли ошибок
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    this.setState({
      error: true,
    });
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
