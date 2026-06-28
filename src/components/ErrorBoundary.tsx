import { Component, type ErrorInfo, type ReactNode } from 'react'

/**
 * Contains failures from enhancement layers (e.g. the Mol* viewer mutating its
 * own DOM) so a single broken widget can never blank the discovery loop. This is
 * the school-network-resilience principle in code: the loop must always run.
 */
export default class ErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false }

  static getDerivedStateFromError(): { failed: boolean } {
    return { failed: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn('[ErrorBoundary] contained a failure:', error.message, info.componentStack)
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
