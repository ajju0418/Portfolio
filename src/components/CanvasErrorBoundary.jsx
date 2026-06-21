import { Component } from 'react';

/**
 * Catches any error thrown while loading or rendering the WebGL scene (lost
 * context, shader compile failure, unsupported GPU, etc.) and renders the 2D
 * fallback instead of crashing the whole page.
 */
export default class CanvasErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { failed: false };
    }

    static getDerivedStateFromError() {
        return { failed: true };
    }

    componentDidCatch(error) {
        // eslint-disable-next-line no-console
        console.warn('3D background disabled — falling back to 2D:', error?.message || error);
    }

    render() {
        if (this.state.failed) return this.props.fallback ?? null;
        return this.props.children;
    }
}
