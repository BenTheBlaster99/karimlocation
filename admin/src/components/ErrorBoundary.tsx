import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  // Update state so the next render shows the fallback UI.
  public static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can log the error to an external service here (like Sentry)
    console.error('Uncaught error:', error, errorInfo)

    // After a redeploy, an open tab still points to the old JS chunks, which no longer exist.
    // Reload once to pick up the new build instead of showing the fallback.
    const chunkError = /dynamically imported module|Importing a module script failed|Failed to fetch|Loading chunk/i.test(error?.message || '')
    const lastReload = Number(sessionStorage.getItem('bc-chunk-reload') || 0)
    if (chunkError && Date.now() - lastReload > 10000) {
      sessionStorage.setItem('bc-chunk-reload', String(Date.now()))
      window.location.reload()
    }
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || <h2>Something went wrong.</h2>
    }

    return this.props.children
  }
}

export default ErrorBoundary
