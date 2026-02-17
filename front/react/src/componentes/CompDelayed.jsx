import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * @constant types
 * @type {{mount: string, unmounted: string}}
 */
const types = {
    MOUNT: 'mount',
    UNMOUNT: 'unmount'
};

/**
 * @class CompDelayed
 * @extends {Component}
 */
export default class CompDelayed extends Component {
    /**
     * @constant state
     * @type {{mounted: boolean}}
     */
    state = { mounted: typeof window === 'undefined' ? this.props.mounted : false, deferred: null };

    /**
     * @constant propTypes
     * @type {{mountAfter: function, unmountAfter: function}}
     */
    static propTypes = {
        mounted: PropTypes.bool.isRequired,
        mountAfter: PropTypes.number.isRequired,
        unmountAfter: PropTypes.number.isRequired,
        children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
        nodeName: PropTypes.string.isRequired
    };

    /**
     * @constant defaultProps
     * @type {{mountAfter: number, unmountAfter: number}}
     */
    static defaultProps = {
        mounted: false,
        mountAfter: 0,
        unmountAfter: 0,
        children: <span />,
        nodeName: 'span'
    };

    /**
     * @method componentDidMount
     * @return {void}
     */
    componentDidMount() {
        this.isComponentMounted = true;
        this.props.mounted === true && this.handleVisibility(types.MOUNT);
    }

    /**
     * @method componentWillUnmount
     * @return {void}
     */
    componentWillUnmount() {
        this.isComponentMounted = false;
    }

    /**
     * @method componentDidUpdate
     * @param {Object} prevProps
     * @return {void}
     */
    componentDidUpdate(prevProps) {
        prevProps.mounted === false && this.props.mounted === true && this.handleVisibility(types.MOUNT);
        prevProps.mounted === true && this.props.mounted === false && this.handleVisibility(types.UNMOUNT);
    }

    /**
     * @method handleVisibility
     * @param {String} type
     * @return {void}
     */
    handleVisibility(type) {
        const mounted = type === types.MOUNT;
        const timeout = this.props[`${type}After`];
        const invoker = timeout === 0 ? fn => fn() : setTimeout;

        clearTimeout(this.state.deferred);
        const deferred = invoker(() => this.isComponentMounted && this.setState({ mounted }), timeout);
        this.setState({ deferred });
    }

    /**
     * @method render
     * @return {XML}
     */
    render() {
        const isFunction = typeof this.props.children === 'function';
        return this.state.mounted ? isFunction ? this.props.children() : this.props.children : <this.props.nodeName />;
    }
}
