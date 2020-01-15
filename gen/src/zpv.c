/* Generate Test Data for zpv */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{

  printf("var zpv_results = [\n");

  double res0[2][3] = {0};
  printf("  [");
  eraZpv(res0);
  exportPV3(res0);
  printf("  ],\n");


  printf("];\n");
}
