import { each } from '@antv/util';
import Element from '../../../geometry/element/';
import { getIntersectElements, getElements, isMask, getMaskedElements } from '../util';
import StateBase from './state-base';

/**
 * 区域设置状态的基础 Action
 */
class ElementRangeState extends StateBase {
  private startPoint = null;
  private endPoint = null;
  private isStarted: boolean = false;
  // 获取当前的位置
  private getCurrentPoint() {
    const event = this.context.event;
    return {
      x: event.x,
      y: event.y,
    };
  }

  /**
   * 开始，记录开始选中的位置
   */
  public start() {
    this.clear(); // 开始的时候清理之前的状态
    this.startPoint = this.getCurrentPoint();
    this.isStarted = true;
  }

  private getIntersectElements() {
    let elements = null;
    if (isMask(this.context)) {
      elements = getMaskedElements(this.context, 10);
    } else {
      const startPoint = this.startPoint;
      const endPoint = this.isStarted ? this.getCurrentPoint() : this.endPoint;
      // 计算框选区域
      const box = {
        minX: Math.min(startPoint.x, endPoint.x),
        minY: Math.min(startPoint.y, endPoint.y),
        maxX: Math.max(startPoint.x, endPoint.x),
        maxY: Math.max(startPoint.y, endPoint.y),
      };
      // this.clear(); // 不全部清理，会导致闪烁
      const view = this.context.view;
      elements = getIntersectElements(view, box);
    }
    return elements;
  }
  /**
   * 选中
   */
  public setStateEnable(enable: boolean) {
    const allElements = getElements(this.context.view);
    const elements = this.getIntersectElements();
    if (elements.length) {
      this.setElementsState(elements, enable, allElements);
    } else {
      this.clear();
    }
  }

  protected setElementsState(elements: Element[], enable, allElements: Element[]) {
    each(allElements, (el) => {
      if (!elements.includes(el)) {
        this.setElementState(el, false);
      } else {
        this.setElementState(el, enable);
      }
    });
  }

  /**
   * 结束
   */
  public end() {
    this.isStarted = false;
    this.endPoint = this.getCurrentPoint();
  }
}

export default ElementRangeState;