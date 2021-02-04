const emptyObject = {}

interface ReactNoopUpdateQueue {
  isMounted: (publicInstance: Component) => boolean
  enqueueForceUpdate: (publicInstance: Component, callback?: Function, callerName?:string) => any
  enqueueReplaceUpdate:(publicInstance: Component,compeleteState: Object,callback?: Function,callerName?:string)=>any
  enqueueSetState:(publicInstance:Component,partialState:Object,callback?:Function,callerName?:string)=>any
}

export class Component {
  [x: string]: {};
  props: any;
  context: any;
  refs: {};
  updater: ReactNoopUpdateQueue;
  constructor(props: any, context: any, updater: any) {
    this.props = props
    this.context = context
    this.refs = emptyObject
    this.updater = updater
  }
  setState(partialState: any, callback: any) {
    this.updater.enqueueSetState(this, partialState, callback, 'setState')
  }
  forceUpdate(callback: any) {
    this.updater.enqueueForceUpdate(this, callback, 'forceUpdate')
  }
}
Component.prototype.isReactComponent={}

export class PureComponent extends Component {
  constructor(props: any, context: any, updater: any) {
    super(props,context,updater)
  }
}
PureComponent.prototype.isPureReactComponent=true
