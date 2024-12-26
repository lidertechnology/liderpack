import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from "@angular/router";

/**
 * Proporciona una forma de personalizar cuándo se reutilizan las rutas activadas.
 */
export class IonicRouteStrategy implements RouteReuseStrategy {
  /**
   * Determina si la ruta dada debe desacoplarse para su reutilización posterior.
   * En esta estrategia, siempre devuelve `false`, lo que significa que ninguna ruta se desacopla.
   */
  shouldDetach(_route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  /**
   * Devuelve `false`, lo que significa que la ruta (y su subárbol) nunca se vuelve a adjuntar.
   */
  shouldAttach(_route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  /**
   * Una operación sin efecto; la ruta nunca se almacena ya que esta estrategia nunca desacopla rutas para su reutilización posterior.
   */
  store(
    _route: ActivatedRouteSnapshot,
    _detachedTree: DetachedRouteHandle,
  ): void {
    // No se implementa, ya que no se desacoplan rutas
  }

  /**
   * Devuelve `null` porque esta estrategia no almacena rutas para su reutilización posterior.
   */
  retrieve(_route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return null;
  }

  /**
   * Determina si una ruta debe reutilizarse.
   * Esta estrategia devuelve `true` cuando:
   *   - La configuración de la ruta futura y la configuración de la ruta actual son idénticas.
   *   - Todos los parámetros de ruta son idénticos.
   */
  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot,
  ): boolean {
    return (
      future.routeConfig === curr.routeConfig &&
      this.areRouteParamsEqual(future.params, curr.params)
    );
  }

  /**
   * Compara si dos objetos de parámetros de ruta son iguales.
   */
  private areRouteParamsEqual(futureParams: any, currParams: any): boolean {
    return JSON.stringify(futureParams) === JSON.stringify(currParams);
  }
}
