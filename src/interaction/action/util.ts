import { each, isArray, map } from '@antv/util';
import { View } from '../../chart';
import { ComponentOption } from '../../chart/interface';
import { BBox, PathCommand, Point } from '../../dependents';
import Geometry from '../../geometry/base';
import Element from '../../geometry/element/';
import { catmullRom2bezier, getLinePath } from '../../geometry/shape/util/path';
import { IInteractionContext, LooseObject } from '../../interface';
/**
 * 获取当前事件相关的图表元素
 * @param context 交互的上下文
 */
export function getCurrentElement(context: IInteractionContext): Element {
  const event = context.event;
  let element;
  const target = event.target;
  if (target) {
    element = target.get('element');
  }
  return element;
}

/**
 * 获取委托对象
 * @param context 上下文
 */
export function getDelegationObject(context: IInteractionContext): LooseObject {
  const event = context.event;
  const target = event.target;
  let delegateObject;
  if (target) {
    delegateObject = target.get('delegateObject');
  }
  return delegateObject;
}

/**
 * 是否是列表组件
 * @param delegateObject 委托对象
 */
export function isList(delegateObject: LooseObject): boolean {
  return delegateObject && delegateObject.component && delegateObject.component.isList();
}

/**
 * 是否是滑块组件
 * @param delegateObject 委托对象
 */
export function isSlider(delegateObject: LooseObject): boolean {
  return delegateObject && delegateObject.component && delegateObject.component.isSlider();
}
/**
 * 是否由 mask 触发
 * @param context 上下文
 */
export function isMask(context: IInteractionContext): boolean {
  const event = context.event;
  const target = event.target;
  return target && target.get('name') === 'mask';
}

/**
 * 获取被遮挡的 elements
 * @param context 上下文
 */
export function getMaskedElements(context: IInteractionContext, tolerance: number): Element[]{
  const event = context.event;
  const maskShape = event.target;
  const maskBBox = maskShape.getCanvasBBox();
  // 如果 bbox 过小则不返回
  if (!(maskBBox.width >= tolerance || maskBBox.height >= tolerance)) {
    return [];
  }
  const view = context.view;
  const elements = getElements(view);
  return elements.filter(el => {
    const elBBox = el.getBBox(); // 临时以 bbox 相交进行判定，后面可以改成 path 判定
    return intersectRect(maskBBox, elBBox);
  });
}

/**
 * 获取所有的图表元素
 * @param view View/Chart
 */
export function getElements(view: View): Element[] {
  const geometries = view.geometries;
  let rst: Element[] = [];
  each(geometries, (geom: Geometry) => {
    const elements = geom.elements;
    rst = rst.concat(elements);
  });
  return rst;
}
/**
 * 根据状态名获取图表元素
 * @param view View/Chart
 * @param stateName 状态名
 */
export function getElementsByState(view: View, stateName: string): Element[] {
  const geometries = view.geometries;
  let rst: Element[] = [];
  each(geometries, (geom: Geometry) => {
    const elements = geom.getElementsBy((el) => el.hasState(stateName));
    rst = rst.concat(elements);
  });
  return rst;
}

/**
 * 获取图表元素对应字段的值
 * @param element 图表元素
 * @param field 字段名
 */
export function getElementValue(element: Element, field) {
  const model = element.getModel();
  const record = model.data;
  let value;
  if (isArray(record)) {
    value = record[0][field];
  } else {
    value = record[field];
  }
  return value;
}

/**
 * 两个包围盒是否相交
 * @param box1 包围盒1
 * @param box2 包围盒2
 */
export function intersectRect(box1, box2) {
  return !(box2.minX > box1.maxX || box2.maxX < box1.minX || box2.minY > box1.maxY || box2.maxY < box1.minY);
}

/**
 * 获取包围盒内的图表元素
 * @param view View/Chart
 * @param box 包围盒
 */
export function getIntersectElements(view: View, box) {
  const elements = getElements(view);
  const rst = [];
  each(elements, (el) => {
    const shape = el.shape;
    const shapeBBox = shape.getCanvasBBox();
    if (intersectRect(box, shapeBBox)) {
      rst.push(el);
    }
  });
  return rst;
}

/**
 * 获取当前 View 的所有组件
 * @param view View/Chart
 */
export function getComponents(view) {
  return map(view.getComponents(), (co: ComponentOption) => co.component);
}

export function distance(p1: Point, p2: Point) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function getSpline(points: Point[], z: boolean): PathCommand[] {
  if (points.length <= 2) {
    return getLinePath(points, false);
  }
  const first = points[0];
  const arr = [];
  each(points, (point) => {
    arr.push(point.x);
    arr.push(point.y);
  });
  const path = catmullRom2bezier(arr, z, null);
  path.unshift(['M', first.x, first.y]);
  return path;
}

/**
 * 检测点是否在包围盒内
 * @param box 包围盒
 * @param point 点
 */
export function isInBox(box: BBox, point: Point) {
  return box.x <= point.x && box.maxX >= point.x && box.y <= point.y && box.maxY > point.y;
}