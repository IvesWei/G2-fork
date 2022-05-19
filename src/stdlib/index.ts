import { G2Library } from '../runtime';
import { Canvas } from '../renderer';
import { Cartesian, Polar, Transpose, Parallel, Fisheye } from '../coordinate';
import { Constant, Field, Transform } from '../encode';
import {
  Grid,
  Interval,
  Line,
  Point as PointGeometry,
  Text as TextGeometry,
  Area as AreaGeometry,
  Edge as EdgeGeometry,
  Image as ImageGeometry,
  Polygon as PolygonGeometry,
} from '../mark/geometry';
import {
  AnnotationText,
  AnnotationLineX,
  AnnotationLineY,
  AnnotationConnector,
} from '../mark/annotation';
import {
  MaybeTuple,
  MaybeZeroX1,
  MaybeZeroY2,
  MaybeSeries,
  MaybeStackY,
  MaybeSplitPosition,
  MaybeKey,
  MaybeSize,
  MaybeZeroY1,
  MaybeTooltip,
  MaybeTitle,
} from '../infer';
import { Category10, Category20 } from '../palette';
import {
  Linear,
  Ordinal,
  Band,
  Identity,
  Point,
  Time,
  Log,
  Pow,
  Threshold,
  Quantile,
  Quantize,
} from '../scale';
import {
  Rect as RectShape,
  HollowRect,
  Line as LineShape,
  Smooth,
  Point as PointShape,
  HollowPoint,
  Text,
  AnnotationText as AnnotationTextShape,
  AnnotationBadge,
  AnnotationLine as AnnotationLineShape,
  AnnotationConnector as AnnotationConnectorShape,
  Area,
  SmoothArea,
  Edge,
  Arc as ArcEdge,
  Image,
  Polygon,
} from '../shape';
import { DodgeX, StackY, StackEnter, SplitPosition, Key } from '../statistic';
import { Light } from '../theme';
import {
  Fetch,
  FilterBy,
  SortBy,
  Pick,
  WordCloud,
  Rename,
  Subset,
  Voronoi,
} from '../transform';
import { AxisX, AxisY, LegendCategory, LegendContinuous } from '../component';
import { ScaleInY, FadeIn } from '../animation';
import {
  ElementActive,
  Tooltip,
  Fisheye as FisheyeInteraction,
} from '../interaction';
import {
  SurfacePointSelection,
  HighlightSelection,
  Tooltip as TooltipAction,
  FisheyeFocus,
  Plot,
} from '../action';
import { MousePosition, TouchPosition } from '../interactor';
import { Layer, Flex, Mark, View, Rect } from '../composition';
import { Pack } from '../adjust';

export function createLibrary(): G2Library {
  return {
    'renderer.canvas': Canvas,
    'coordinate.cartesian': Cartesian,
    'coordinate.polar': Polar,
    'coordinate.transpose': Transpose,
    'coordinate.parallel': Parallel,
    'coordinate.fisheye': Fisheye,
    'encode.constant': Constant,
    'encode.field': Field,
    'encode.transform': Transform,
    'mark.interval': Interval,
    'mark.line': Line,
    'mark.point': PointGeometry,
    'mark.text': TextGeometry,
    'mark.grid': Grid,
    'mark.area': AreaGeometry,
    'mark.edge': EdgeGeometry,
    'mark.image': ImageGeometry,
    'mark.polygon': PolygonGeometry,
    'mark.annotation.text': AnnotationText,
    'mark.annotation.lineX': AnnotationLineX,
    'mark.annotation.lineY': AnnotationLineY,
    'mark.annotation.connector': AnnotationConnector,
    'infer.maybeTuple': MaybeTuple,
    'infer.maybeZeroX1': MaybeZeroX1,
    'infer.maybeZeroY2': MaybeZeroY2,
    'infer.maybeSeries': MaybeSeries,
    'infer.maybeStackY': MaybeStackY,
    'infer.maybeSplitPosition': MaybeSplitPosition,
    'infer.maybeKey': MaybeKey,
    'infer.maybeSize': MaybeSize,
    'infer.maybeZeroY1': MaybeZeroY1,
    'infer.maybeTooltip': MaybeTooltip,
    'infer.maybeTitle': MaybeTitle,
    'palette.category10': Category10,
    'palette.category20': Category20,
    'scale.linear': Linear,
    'scale.ordinal': Ordinal,
    'scale.band': Band,
    'scale.identity': Identity,
    'scale.point': Point,
    'scale.time': Time,
    'scale.log': Log,
    'scale.pow': Pow,
    'scale.threshold': Threshold,
    'scale.quantile': Quantile,
    'scale.quantize': Quantize,
    'shape.rect': RectShape,
    'shape.hollowRect': HollowRect,
    'shape.line': LineShape,
    'shape.smooth': Smooth,
    'shape.point': PointShape,
    'shape.hollowPoint': HollowPoint,
    'shape.text': Text,
    'shape.area': Area,
    'shape.smoothArea': SmoothArea,
    'shape.edge': Edge,
    'shape.arc': ArcEdge,
    'shape.image': Image,
    'shape.polygon': Polygon,
    'shape.annotation.text': AnnotationTextShape,
    'shape.annotation.badge': AnnotationBadge,
    'shape.annotation.line': AnnotationLineShape,
    'shape.annotation.connector': AnnotationConnectorShape,
    'statistic.stackY': StackY,
    'statistic.dodgeX': DodgeX,
    'statistic.stackEnter': StackEnter,
    'statistic.splitPosition': SplitPosition,
    'statistic.key': Key,
    'theme.light': Light,
    'transform.fetch': Fetch,
    'transform.sortBy': SortBy,
    'transform.filterBy': FilterBy,
    'transform.pick': Pick,
    'transform.rename': Rename,
    'transform.subset': Subset,
    'transform.wordCloud': WordCloud,
    'transform.voronoi': Voronoi,
    'component.axisX': AxisX,
    'component.axisY': AxisY,
    'component.legendCategory': LegendCategory,
    'component.legendContinuous': LegendContinuous,
    'animation.scaleInY': ScaleInY,
    'animation.fadeIn': FadeIn,
    'interaction.elementActive': ElementActive,
    'interaction.tooltip': Tooltip,
    'interaction.fisheye': FisheyeInteraction,
    'action.surfacePointSelection': SurfacePointSelection,
    'action.highlightSelection': HighlightSelection,
    'action.tooltip': TooltipAction,
    'action.fisheyeFocus': FisheyeFocus,
    'action.plot': Plot,
    'interactor.mousePosition': MousePosition,
    'interactor.touchPosition': TouchPosition,
    'composition.layer': Layer,
    'composition.flex': Flex,
    'composition.mark': Mark,
    'composition.view': View,
    'composition.rect': Rect,
    'adjust.pack': Pack,
  };
}