export default class Component {
    $target: Element;
    props?: any;
    state: any;

    constructor ($target: Element, props?: any) {
      this.$target = $target;
      this.props = props;
      this.setup();
      this.setEvent();
      this.render();
    }
    setup () {};
    mounted () {}
    template (): any { return ''; }
    render () {
      console.log('렌더한다.');
      console.log('target:');
      console.log(this.$target);
      console.log('기존의 innerHTML');
      console.log(this.$target);
      const template = this.template();
      console.log('바뀔 innerHTML');
      console.log(this.$target.innerHTML);
      if (template) {
        this.$target.innerHTML = template;
        console.log("업데이트후 ");
        console.log(this.$target.innerHTML);
        this.mounted();
      }
    }
    setEvent () {}
    setState (newState?: any) {
      this.state = { ...this.state, ...newState };
      this.render();
    }

    /*
    update() {
      // notify 시, 해당 함수가 실행된다. 
    }
    */

    addEvent (eventType: string, selector: string, callback: Function) {
      const children : Element[] = [...Array.from(this.$target.querySelectorAll(selector))];
      const isTarget = ($target) => children.includes($target) || $target.closest(selector);
      this.$target.addEventListener(eventType, event => {
        if (!isTarget(event.target)) return false;
        callback(event);
      })
    }
  }