/* Generate Test Data for anpm */

#include <stdio.h>
#include "erfa.h"
#include "config.h"
#include <string.h>

int main()
{
  double t0;
  printf("var anpm_results = [\n");
  for (t0 = - 195; t0 <= + 195; t0 += 180 / 24.0) {


    printf("  [");
    printf("%.28e", t0);
    printf(", ");
    printf("%.28e", eraAnpm(t0));
    printf("  ],\n");

  }

  printf("];\n");
}
